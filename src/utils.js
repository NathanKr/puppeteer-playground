const path = require('path');
const fs = require('fs')

function timeStamp() {
  return (new Date()).getTime()
}

function getOperationUrl(operation) {
  return `./operations/${operation}`;
}

function getOutputDirPath() {
  return path.join(__dirname, "..", "output");
}

function pauseMs(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function deleteDirectoryContents(directoryPath) {
  try {
    const files = fs.readdirSync(directoryPath);
    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      if (fs.lstatSync(filePath).isDirectory()) {
        fs.rmdirSync(filePath, { recursive: true });
      } else {
        fs.unlinkSync(filePath);
      }
    }
    console.log(`Contents of ${directoryPath} have been deleted.`);
  } catch (error) {
    console.error(
      `Failed to delete contents of ${directoryPath}. Reason: ${error}`
    );
  }
}

module.exports = {
  getOperationUrl,
  getOutputDirPath,
  pauseMs,
  deleteDirectoryContents,
  timeStamp
};
