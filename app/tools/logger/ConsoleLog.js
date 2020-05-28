const BaseLog = require('./BaseLog');

class ConsoleLog extends BaseLog {
    log(msg) {
        console.error(super.log(msg))
    }
    error(msg) {
        console.error(super.error(msg))
    }
}

module.exports = ConsoleLog;
