/******/ var __webpack_modules__ = {
  /***/ 340: /***/ (module) => {
    module.exports = eval("require")("./model.js");

    /***/
  },

  /******/
};
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/
/******/ // The require function
/******/ function __nccwpck_require__(moduleId) {
  /******/ // Check if module is in cache
  /******/ var cachedModule = __webpack_module_cache__[moduleId];
  /******/ if (cachedModule !== undefined) {
    /******/ return cachedModule.exports;
    /******/
  }
  /******/ // Create a new module (and put it into the cache)
  /******/ var module = (__webpack_module_cache__[moduleId] = {
    /******/ // no module.id needed
    /******/ // no module.loaded needed
    /******/ exports: {},
    /******/
  });
  /******/
  /******/ // Execute the module function
  /******/ var threw = true;
  /******/ try {
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __nccwpck_require__
    );
    /******/ threw = false;
    /******/
  } finally {
    /******/ if (threw) delete __webpack_module_cache__[moduleId];
    /******/
  }
  /******/
  /******/ // Return the exports of the module
  /******/ return module.exports;
  /******/
}
/******/
/************************************************************************/
/******/ /* webpack/runtime/compat */
/******/
/******/ if (typeof __nccwpck_require__ !== "undefined")
  __nccwpck_require__.ab =
    new URL(".", import.meta.url).pathname.slice(
      import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0,
      -1
    ) + "/";
/******/
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
  /* harmony import */ var _model_js__WEBPACK_IMPORTED_MODULE_0__ =
    __nccwpck_require__(340);
  const core = require("@actions/core");

  const main = async () => {
    try {
      core.info("Handling Dependencies...");
      await _model_js__WEBPACK_IMPORTED_MODULE_0__.update();
    } catch (error) {
      core.setFailed(error.message);
    }
  };

  // Call the main function to run the action
  main();
})();
