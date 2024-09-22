"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeStamp = timeStamp;
exports.getOperationUrl = getOperationUrl;
exports.getOutputDirPath = getOutputDirPath;
exports.pauseMs = pauseMs;
exports.deleteDirectoryContents = deleteDirectoryContents;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function timeStamp() {
    return (new Date()).getTime();
}
function getOperationUrl(operation) {
    return `./operations/${operation}`;
}
function getOutputDirPath() {
    return path_1.default.join(__dirname, "..", "output");
}
function pauseMs(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function deleteDirectoryContents(directoryPath) {
    try {
        const files = fs_1.default.readdirSync(directoryPath);
        for (const file of files) {
            const filePath = path_1.default.join(directoryPath, file);
            if (fs_1.default.lstatSync(filePath).isDirectory()) {
                fs_1.default.rmdirSync(filePath, { recursive: true });
            }
            else {
                fs_1.default.unlinkSync(filePath);
            }
        }
        console.log(`Contents of ${directoryPath} have been deleted.`);
    }
    catch (error) {
        console.error(`Failed to delete contents of ${directoryPath}. Reason: ${error}`);
    }
}
//# sourceMappingURL=utils.js.map