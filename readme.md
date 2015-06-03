# Files stream
Module for streaming several files as single for io.js and node.js.

This module allow gather your data-files into single readable stream
through which you can stream them as one indivisible file.

## Installation

This module can be installed via `git`.
Also you need to have installed io or node .js.

```
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
In *`options`* , before stream creation you can
use optional parameter *`delimiter`* (by default is "r\n\") - string which separates each file in stream:
```javascript
	stream   = new FilesStream("stream",{delimiter:"\r\n<NEXT FILE HERE>\r\n"})
```

```javascript
    // Appends a file paths to streaming. Return itself.
	stream.addFiles(["pathToFile","pathToFile",..etc])

```

Notice, the *`options`* also will be used for reading each file's chunk into buffer.

## Testing

Uses Mocha testing framework:
`$ mocha`

## License
See LICENSE file for more info.

## To do
Data conversion method.