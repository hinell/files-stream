# Files stream
Simple Readable stream a list of files for io.js.

This module allow gather your data-files into the single readable stream
and provide a simple way to stream your data-flow where you want.

## Installation

This module can be installed via `git`.
Also you need to have installed iojs.

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
var FilesStream     = require(".");
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
```

## API
All module interfaces (include options parameter and events) are inherited
of the Readable stream and Events emitter Classes:

```javascript

var FilesStream  = require("../path to module/");
	stream       = new FilesStream(nameOfYourStream,options)
	stream.addFiles(// any stuff)
	stream.on("readable" ,callback);
	stream.on("error"    ,callback);
	stream.on("close"    ,callback);
	stream.on("data"     ,callback);
	stream.on("end"      ,callback);

```

Where *`nameOfYourStream`* is optional.
Before stream creation, in *`options`* you can
use optional parameter *`delimiter`* (by default is "r\n\") - string which separate reading each file:
```javascript
	stream   = new FilesStream("stream",{delimiter:"\r\n<NEXT FILE HERE>\r\n"})
```
Note, the *`options`* also will be used reading each file into buffer.

Module have addFiles method to adding a files:

```javascript
	stream.addFiles(["pathToFile","pathToFile",..etc]) // Appends a file paths to streaming. Return itself.

```

## License
See LICENSE file for more info.

## To do
Data conversion method.