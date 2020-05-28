require("dotenv").config();
const { getFilePathsList } = require("../lib/base");
const logger = require('../logger');
const Queue = require("bee-queue");

const beeQueueOptions = {
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
    isWorker: false,
};

const queue = new Queue(process.env.QNAME, beeQueueOptions);

const folder = process.env.FOLDER || process.argv[2];

async function run() {
    try {
        await queue.destroy();
        logger.log(`Query is cleaned`);
        logger.log(`Folder is: ${folder}`);
        const filesList = await getFilePathsList(folder);
        logger.log(`Amount of files: ${filesList.length}`);
        for (const filepath of filesList) {
            // logger.log(filepath);
            const job = queue.createJob({ filepath });
            job.save();
        }
    } catch (e) {
        logger.error(e);
        process.exit(1);
    }
}

run();
