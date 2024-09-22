console.log("app has started ...");
import { getOperationUrl } from "./utils";

const operation = process.argv[2]; // e.g. page-to-image

import(getOperationUrl(operation))
  .then((module) => {
    module.run();
  })
  .catch((err) => {
    console.error(`Failed to load module: ${err}`);
  });
