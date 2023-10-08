const regex = /Dependent on:? ([#\d, ]+)/gi;

export function findDependencies(body) {
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
