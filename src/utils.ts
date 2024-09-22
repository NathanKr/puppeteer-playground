import path from "path";
import fs from "fs";

export function timeStamp() : number{
  return (new Date()).getTime()
}

export function getOperationUrl(operation : string) : string {
  return `./operations/${operation}`;
}

export function getOutputDirPath() : string{
  return path.join(__dirname, "..", "output");
}

export function pauseMs(ms : number) : Promise<unknown>{
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function deleteDirectoryContents(directoryPath : string) : void {
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


