const mongoose = require("mongoose");

async function connect(url) {
    return new Promise((res, rej) => {
        mongoose.connect(url, { useNewUrlParser: true });

        const db = mongoose.connection;
        db.on("error", rej);
        db.once("open", function () {
            res();
        });
    });
}

module.exports = {
    connect
};
