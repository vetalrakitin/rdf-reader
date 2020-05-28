const tap = require("tap");
const path = require('path');
const { getFilePathList, createFilesListStream } = require("./common");

const folder = tap.testdir({
    dir1: {
        "somefile.ext1": "contents",
    },
    dir2: {
        "somefile.ext2": "contents",
    },
});

const expectedFilePaths = [path.resolve(folder,`dir1${path.sep}somefile.ext1`), path.resolve(folder, `dir2${path.sep}somefile.ext2`)];

tap.test("getFilePathList correct way", async (t) => {
    const files = await getFilePathList(folder);
    t.ok(Array.isArray(files), "Result should be an array");
    t.equal(files.length, 2, "Wrong files count");
    for(const expectedFilepath of expectedFilePaths) {
        t.ok(files.filter(filepath => filepath == expectedFilepath).length == 1, `Cannot find ${expectedFilepath} file`);
    }
    t.end();
});

tap.test("getFilePathList wrong way", async t => {
    const wrongFolderName = "wrong-folder-name";
    t.rejects(getFilePathList(wrongFolderName), `Folder "${wrongFolderName}" doesn't exists`, "Should be a throw");
    t.end();
});

tap.test("createFilesListStream", t => {
    let count = 0;
    
    const stream = createFilesListStream(folder);
    stream.on('error', (err) => {
        t.throw(err);
    });
    stream.on('end', ()=> {
        t.equal(count, 2, "Wrong files count");
        t.end();
    });
    stream.on('data', (file) => {
        count++;
        const filepath = file.path;
        t.ok(file.path == filepath, `Cannot find ${filepath} file`);
    });
})
