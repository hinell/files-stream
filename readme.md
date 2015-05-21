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
All module interfaces is inherited of the Readable stream and Events emitter Classes:

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
Before a stream creation, you can also
specify in `options` your own an optional *`delimiter`* field (which by default is "r\n\"):
```javascript
	stream   = new FilesStream("stream",{delimiter:"\r\n<NEXT FILE HERE>\r\n"})
```
Note, the *`options`* also will be passed in each stream of paths that you have specified previously .

Module also has two its own methods:

```javascript
	stream.addFiles(["pathToFile","pathToFile",..etc]) // Appends file paths to streaming
	stream.addName ("name of your stream")             // Name of stream. Optional.

```
The each of them return nothing.

## License
See LICENSE file for more info.

## Todo
Method for conversion data on fly.