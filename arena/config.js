const queueNames = [
  process.env.QNAME
];

module.exports = {
  queues: queueNames.map(queue => {
    return {
      name: queue,
      hostId: "Jobs",
      type: "bee",
      prefix: "bq",

      // Redis
      redis: {
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
      },
    }
  })
};
