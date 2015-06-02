var WriteStream     = require("fs").WriteStream;
var FilesStream     = require(".");
    stream          = new FilesStream("./ofMyFiles.js");
    stream.addFiles([
                        './test/file.1.txt',
                        './test/file.2.txt',
                        './test/file.3.txt',
                        './test/file.not.exists.txt'
                    ])
    stream.on("error", function (err) {
        if (err) console.log(" Ooops! File /errorFile don't exists:\r\n",err.message);
    });
    stream.pipe(new WriteStream(stream.name));