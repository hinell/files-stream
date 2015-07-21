# Files stream


The Io.js and Node.js module for concatenation files on fly. Predominantly for textual the files' formats.


|What's here?| [INSTALL](#installation) | [USAGE](#example-usage) | [API](#api) |[TESTS](#testing)|
|---| --- | --- | ---|---|

## Installation

Module can be installed either via `git` or via `npm`.
Before, you have to installed io.js or node.js and git. 
After all, you can clone this repo (for latest version) or just run command below:
```
$ npm install files-stream
```


## Example Usage

```
$ node example.js // in module directory
```

```javascript
//  example.js

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

```
Epress integration:
```javascript
// Warninig: Don't use this module in production!
// Because module haven't yet data bufferization it still has some troubles in files reading
// process, so you have to use this module for development only. 
// See below for more info about express integration.
var express     = require('express')
var streamOf    = require('files-stream').express
var myApp       = express()
	myApp.get('/bundle.js',streamOf(''))
    myApp.listen(8080)

```


## API
All module's interfaces (including options parameter and events) are inherited
of the [Readable stream](https://iojs.org/api/stream.html#stream_class_stream_readable)
and [Events emitter](https://iojs.org/api/events.html) classes:

```javascript

var FSS  = require("../path to module/");
new FSS('./file/path'[,'./file/path'|options])
        .setEncoding('utf8')
        .on("readable" ,handler)
        .on("error"    ,handler)
        .on("data"     ,handler)
        .on("end"      ,handler)
// or...
new FSS(options).addFiles(['./file/path'[,'./file/path']]).on(//etc)
// For Express
var expressApp.get( /**/,FSS.express('./file/path'[,'./file/path'|options]))
```
Static *`FSS.express()`* method resembles the same behavior of the *`files-stream`* Class constructor but standing simple callback function. 

Where *`options`* are optional and can be placed in arbitrary place of arguments order.

|Possible options|Default|Description|
|--- |--- |--- |
|*`options.delimiter`* | r\n\ | String-delimiter. Placed only between two files. If error occurs on some file, will be placed in order before this erroneous file|
|*`options.encoding`*  | utf8 | Resembles [.setEncoding()](https://iojs.org/api/stream.html#stream_readable_setencoding_encoding) method which set up  encoding to read each file|



## Testing
`$ mocha`

## License
MIT.

## To do

- [ ]  Bufferization
- [x] ~~Express integration~~
- [x] ~~More examples~~~~

---
[![npm package](https://nodei.co/npm/files-stream.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/files-stream/)
