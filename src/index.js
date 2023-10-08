const core = require("@actions/core");
import * as model from "./model.js";

const main = async () => {
  try {
    core.info("Getting current issue...");
    const issue = await model.getCurrentIssue();
    core.debug(issue);
    // if (issue.state === "close") {
    //   const isBlocked = await model.update(issue);

    //   if (isBlocked === undefined) core.info("No blocking issues found.");
    //   else if (isBlocked === true) core.setFailed("Issue/PR is blocked.");
    //   else if (isBlocked === false) core.info("Issue/PR is not blocked.");
    // } else {
    //   core.info("Issue is closed. Unblocking other issues...");
    //   await model.unblockPRs(issue.number);
    // }
  } catch (error) {
    core.setFailed(error.message);
  }
};

// Call the main function to run the action
main();
