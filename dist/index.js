"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("app has started ...");
const utils_1 = require("./utils");
const operation = process.argv[2]; // e.g. page-to-image
switch (operation) {
    case operation:
        require((0, utils_1.getOperationUrl)(operation)).run();
        break;
    default:
        console.error(`unknown operation : ${operation}`);
}
//# sourceMappingURL=index.js.map