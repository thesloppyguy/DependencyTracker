import * as core from "@actions/core";
import * as model from "./model.js";

const main = async () => {
  try {
    core.info("Handling Dependencies...");
    await model.update();
  } catch (error) {
    core.setFailed(error.message);
  }
};

main();
