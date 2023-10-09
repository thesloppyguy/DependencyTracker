import * as core from "@actions/core";
import * as github from "@actions/github";

const regex = /Dependent on:? ([#\d, ]+)/gi;
const token = core.getInput("token");
const octokit = github.getOctokit("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");

function findDependencies(body) {
  const issues = [];
  if (body === null) return issues;
  for (const match of body.matchAll(regex)) {
    for (const issue of match[1].split(", ")) {
      const issueNumber = parseInt(issue.substring(1));
      issues.push(issueNumber);
    }
  }
  return issues;
}

async function getIssuesWithLabel(label) {
  const json = await octokit.rest.issues.listForRepo({
    state: "open",
    labels: [label],
  });
  return json.data;
}

async function getIssue(number) {
  try {
    var json = await octokit.rest.issues.get({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      issue_number: number,
    });
    return json.data;
  } catch (error) {
    // RequestError
    if (error.status === 404 || error.status === 410) {
      core.setFailed(`Issue not found: #${number}`);
      return null; // the invalid reference will be in the comment
    } else {
      throw Error(
        `Got an HTTP ${error.status} error while retrieving issue #${number}`
      );
    }
  }
}

async function removeLabel(issueNumber, label) {
  return await octokit.rest.issues.removeLabel({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number: issueNumber,
    name: label,
  });
}

async function update() {
  core.info(`Retriving issues on hold`);
  const onHoldIssues = await getIssuesWithLabel("on hold");
  for (let i = 0; i < onHoldIssues.length; i++) {
    core.info(`Retriving dependencies for #${onHoldIssues[i].number}`);
    const dependencies = findDependencies(onHoldIssues[i].body);
    if (dependencies) {
      core.info(`Dependencies found: ${dependencies}`);
      for (let j = 0; j < dependencies.length; j++) {
        core.info(`Checking Status for #${dependencies[j]}`);
        core.info(`Retriving issues ${getIssue(dependencies[j])}`);
        if (getIssue(dependencies[j]).state === "open") {
          core.info(`Dependencies unresolved for #${onHoldIssues[i].number}`);
          return;
        }
      }
    }
    core.info(`Removing on hold for issue #${onHoldIssues[i].number}`);
    await removeLabel(onHoldIssues[i].number, "on hold");
  }
}

const main = async () => {
  try {
    core.info("Handling Dependencies...");
    await update();
  } catch (error) {
    core.setFailed(error.message);
  }
};

main();
