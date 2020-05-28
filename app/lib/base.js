const fs = require('../tools/fs/common');
const rdfreader = require('../tools/xml2js/rdfreader');

async function readRDFFile(filepath) {
    const content = await fs.readFile(filepath);
    const data = await rdfreader.parse(content.toString());
    return data;
}

async function getFilePathsList(folder) {
    return fs.getFilePathList(folder);
}

module.exports = {
    readRDFFile,
    getFilePathsList,
};
