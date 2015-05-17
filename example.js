var WriteStream     = require("fs").WriteStream;
var FilesStream     = require("."); // our module
    stream          = new FilesStream("./ofMyFiles.js");
    stream.addFiles([
                        "./example.js",
                        "./readme.md",
                        "./errorFile"
                    ])
    stream.on("error", function (err) {
        if (err) console.log(" Ooops! File /errorFile don't exists:\r\n",err.message);
    });
    stream.pipe(new WriteStream(stream.name));