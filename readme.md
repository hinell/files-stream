# Files stream
Module for streaming several files as single for io.js and node.js.

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

## Testing

Ensure you have installed mocha cli and run:

`$ npm test`

or

`$ mocha`

## License
See LICENSE file for more info.

## To do
Data conversion method.