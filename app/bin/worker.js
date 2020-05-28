require("dotenv").config();
const { readRDFFile } = require("../lib/base");
const logger = require('../logger');
const rdfModel = require('../db/models/rdf');
const db = require('../db/connect');

db.connect(process.env.MONGODB).catch(logger.error);

const Queue = require('bee-queue');

const beeQueueOptions = {
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    },
    isWorker: true
}

const queue = new Queue(process.env.QNAME, beeQueueOptions);

queue.process(async function(job, done) {
    try {
        logger.log(`Start job id: ${job.id}`);
        const filepath = job.data.filepath;
        const data = await readRDFFile(filepath);
        await rdfModel.create(data);
        done(null, data);
    } catch (e) {
        logger.log(`Job id: ${job.id} got an error`);
        logger.error(e);
        done(e);
    }
});
