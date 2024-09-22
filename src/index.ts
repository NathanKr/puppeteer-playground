// console.log("app has started ...");
import { getOperationUrl } from './utils';

const operation = process.argv[2]; // e.g. page-to-image

switch(operation) {
  case operation:
    import(getOperationUrl(operation)).then(module => {
      module.run();
    }).catch(err => {
      console.error(`Failed to load module: ${err}`);
    });
    break;

  default:
    console.error(`unknown operation : ${operation}`);
}
