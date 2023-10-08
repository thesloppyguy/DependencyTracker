import * as core from "@actions/core";
import * as github from "./github.js";
import * as utils from "./utils.js";

export async function getCurrentIssue() {
  return await github.getIssue(await github.getCurrentIssueNumber());
}

export async function update() {
  core.info(`Retriving issues on hold`);
  const onHoldIssues = await getIssuesWithLabel("on hold");

  for (let i = 0; i < onHoldIssues.length; i++) {
    core.info(`Retriving dependencies for #${onHoldIssues[i].number}`);
    const dependencies = utils.findDependencies(onHoldIssues[i].body);

    for (let j = 0; j < len(dependencies); j++) {
      core.info(`Checking Status for #${dependencies[j]}`);
      if (github.getIssue(dependencies[j]).status === "open") {
        return;
      }
    }
    core.info(`Removing on hold for issue #${onHoldIssues[i].number}`);
    await github.removeLabel(onHoldIssues[i].number, "on hold");
  }
}
