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
of the Readable stream and Events emitter Classes:

```javascript

var FilesStream  = require("../path to module/");
new FilesStream(nameOfYourStream,options)
        .addFiles(// any stuff)
        .on("readable" ,callback)
        .on("error"    ,callback)
        .on("close"    ,callback)
        .on("data"     ,callback)
        .on("end"      ,callback)

```

Where *`nameOfYourStream`* is optional.
In *`options`* property, before stream creation you can
use optional parameter *`delimiter`* (by default is "r\n\") - string which separates each file in the stream:
```javascript
	stream = new FilesStream("stream",{delimiter:"\r\n<NEXT FILE HERE>\r\n"})
    // Appends a file paths to streaming. Return itself.
	stream.addFiles(["pathToFile","pathToFile",..etc])

```

Notice: the *`options`* property is used for reading each a file chunk into buffer,
so it allow you specify the file encoding of reading in further.

## Testing
It is working through mocha testing framework:

`$ mocha`

## License
See [LICENSE](https://github.com/hinell/files-stream/blob/master/LICENSE) file for more info.

## To do
1) Data conversion method.
2) Facilities allowing specifying encoding parameter for each file