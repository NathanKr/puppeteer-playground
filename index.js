console.log("app has started ...");
const operation = process.argv[2];

switch(operation){
  case "page-with-iframe" :
    require('./operations/page-with-iframe').run();
    break

  case "page-to-image" :
  require('./operations/page-to-image').run();
  break

  case "page-click-and-eval" :
  require('./operations/page-click-and-eval').run();
  break

  case "page-eval" :
    require('./operations/page-eval').run();
  break

  default:
    console.error(`unknown operation : ${operation}`);
}

