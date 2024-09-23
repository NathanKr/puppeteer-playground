import path from "path";
import fs from "fs";
import { README_WITH_IMG_PROBLEM } from "./constants";

export function timeStamp() : number{
  return (new Date()).getTime()
}

export const mdFilePath = path.join(getDataDirPath(),`${README_WITH_IMG_PROBLEM}.md`)

export function getOperationUrl(operation : string) : string {
  return `./operations/${operation}`;
}

export function getDataDirPath() : string{
  return path.resolve( ".", "data");
}

export function getOutputDirPath() : string{
  return path.resolve( ".", "output");
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


const operationsDir = path.resolve('.', 'src', 'operations');

export async function getOperations(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(operationsDir, (err, files) => {
      if (err) {
        reject(`Failed to read directory: ${err}`);
      } else {
        const operations = files
          .filter(file => file.endsWith('.ts'))
          .map(file => path.basename(file, '.ts'));
        resolve(operations);
      }
    });
  });
}

export async function runOperation(operation: string) {
  try {
    const url = getOperationUrl(operation)
    const module = await import(url);
    module.run();
  } catch (err) {
    console.error(`Failed to load module: ${err}`);
  }
}