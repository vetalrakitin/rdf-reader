const logger = require('../logger');
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
    logger.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    require("./master");

    cluster.on("exit", (worker, code, signal) => {
        logger.log(`worker ${worker.process.pid} died`);
    });
} else {
    logger.log(`Worker ${process.pid} started`);
    require("./worker");
}
