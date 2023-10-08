const core = require("@actions/core");
import * as model from "./model.js";

const main = async () => {
  try {
    core.info("Handling Dependencies...");
    await model.update();
  } catch (error) {
    core.setFailed(error.message);
  }
};

// Call the main function to run the action
main();
