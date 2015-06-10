# Files stream
This module uses several files sources to making of them a single indivisible stream,
using which you can send its buffered data as simple flow either into another existing
file (similar to tools for a file concatenation), or for example into a server respond
or into somewhere else. Please see below for more info about details of a module working.

## Installation

This module can be installed via `git` or `npm`.
Before usage, you need to have installed io.js or node.js.

```
$ npm install files-stream

$ git clone https://github.com/hinell/files-stream
```

## Example Usage

```
$ node example.js
```

```javascript
//  example.js

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

```

## API
All module's interfaces (include options parameter and events) are inherited
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

Where *`nameOfYourStream`* is optional.
In *`options`* property, before stream creation you can
use optional parameter *`delimiter`* (by default is "r\n\") - string which separates each file in the stream:
```javascript
	new FilesStream("stream",{delimiter:"\r\n<NEXT FILE HERE>\r\n"})
	.addFiles(['./file/path'[,'./file/path']]) // files for reading, returns itself

```

Notice: the *`options`* property allow you to specify default encoding as well as this does .setEncoding() method.

## Testing
`$ mocha`

## License
MIT.

## To do
1) Data conversion method.
2) Facilities allowing specifying encoding parameter for each file