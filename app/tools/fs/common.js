const fs = require('fs');
const path = require('path');
const readdirp = require('readdirp');

async function getFilePathList(folder) {
    await new Promise((res,rej) => {
        fs.exists(folder, (exists) => {      
            return exists ? res() : rej(new Error(`Folder "${folder}" doesn't exists`))
        })
    });
    return readdirp.promise(folder).then(files => files.map(file => path.resolve(folder, file.path)));
}

function createFilesListStream(folder) {
    return readdirp(folder);
}

function readFile(filepath) {
    return fs.promises.readFile(filepath);
}

module.exports = {
    getFilePathList,
    createFilesListStream,
    readFile
}