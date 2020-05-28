class BaseLog {
    log(msg) {
        return `${new Date()} log: ${msg instanceof Error ? msg.stack : msg}`;
    }

    error(msg) {
        return `${new Date()} error: ${msg instanceof Error ? msg.stack : msg}`;
    }
}

module.exports = BaseLog;