var WriteStream     = require("fs").WriteStream;
var FilesStream     = require("./");
new FilesStream()
        .addFiles([ './test/file.1.txt',
                    './test/file.2.txt',
                    './test/file.3.txt',
                    './test/file.not.exists.txt'])
        .on("error", function (err) {
            if (err) console.log(" Ooops! File  ./file.not.exists.txt don't exists:\r\n",err.message);
        })
        .pipe(new WriteStream("./my.three.files.txt"))