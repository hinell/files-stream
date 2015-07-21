var WS            = require("fs").WriteStream;
var FSS           = require("./");
new FSS({delimiter : '\r\nI\'m between each file!\r\n', encoding  : 'ASCII'},
        './test/file.4.txt',
        './test/file.2.txt',
        './test/file.3.txt',
        './test/file.1.txt') // file does not exists
    .on("error", function (err) {
            if (err) console.log(" Ooops! \r\n",err.message);
        })
    .on('end' ,console.log.bind(console,'If there is no errors you will able to see me only once!'))
    .pipe(new WS("./my.three.files.txt"))
