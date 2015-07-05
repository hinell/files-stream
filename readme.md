# Files stream

[![npm package](https://nodei.co/npm/files-stream.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/files-stream/)

The Io.js and Node.js module that uses several files as sources for streaming them like a single joined (gathered, bundled) data flow into any other WritableStream.

## Table of contents

- [Installation](#installation)
- [Example Usage](#example-usage)
- [API](#api)

## Installation

Module can be installed via `git` or `npm`.
Before, you need to have installed io.js or node.js.
Then:

```
$ npm install files-stream
```

## Example Usage

```
$ node example.js
```

```javascript
//  example.js

var WriteStream     = require("fs").WriteStream;
var FilesStream     = require("files-stream");
new FilesStream()
        .addFiles([ './test/file.1.txt',
                    './test/file.2.txt',
                    './test/file.3.txt',
                    './test/file.not.exists.txt'])
        .on("error", function (err) {
            if (err) console.log(" Ooops! File  ./file.not.exists.txt don't exists:\r\n",err.message);
        })
        .pipe(new WriteStream("./my.three.files.txt"))

```

## API
All module's interfaces (it's includes options parameter and events) are inherited
of the [Readable stream](https://iojs.org/api/stream.html#stream_class_stream_readable)
and [Events emitter](https://iojs.org/api/events.html) classes:

```javascript

var FilesStream  = require("../path to module/");
new FilesStream('stream name',options)
        .addFiles(['./file/path'[,'./file/path']])
        .setEncoding('utf8')
        .on("readable" ,handler)
        .on("error"    ,handler)
        .on("close"    ,handler)
        .on("data"     ,handler)
        .on("end"      ,handler)

```

Where *`'stream name'`* and *`options`* are optional.

*`options`* *`.delimiter`* (by default contains "r\n\") - string for separating each sources' file. Will have placed only between each of two files.

*`options`* *`.encoding`* - like .setEncoding() method - allows to set default encoding for reading.

```javascript
	new FilesStream("stream",{
	delimiter:"\r\n<NEXT FILE HERE>\r\n"
	encoding :"ASCII"
	})
	.addFiles(['./file/path'[,'./file/path']]) // files for reading, returns itself

```


## Testing
`$ mocha`

## License
MIT.

## To do
1) Express integration
2) More examples
3) Data conversion method.
4) Facilities allowing specifying encoding parameter for each file

