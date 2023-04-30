console.log("app has started ...");
const {getOperationUrl} = require('./utils')

const operation = process.argv[2]; // e.g. page-to-image

switch(operation){
  case operation:
    require(getOperationUrl(operation)).run();
    break

  default:
    console.error(`unknown operation : ${operation}`);
}

