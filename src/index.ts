
import { getOperations, runOperation } from "./utils";
import readline from "readline";
     

console.log("app has started ...");

async function main() {
  const operations = await getOperations();

  console.log("Available operations:");
  operations.forEach((operation, index) => {
    console.log(`${index}: ${operation}`);
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Choose an operation by index: ", async (index) => {
    const operationIndex = parseInt(index, 10);

    if (
      isNaN(operationIndex) ||
      operationIndex < 0 ||
      operationIndex >= operations.length
    ) {
      console.error("Invalid index");
      rl.close();
      process.exit(1);
    }

    const operation = operations[operationIndex];
    await runOperation(operation);
    rl.close();
  });
}

main();
