# Files stream


Io.js and Node.js module for file concatenation on fly.


|What's here?| [INSTALL](#installation) | [USAGE](#example-usage) | [API](#api) |[TESTS](#testing)|
|---| --- | --- | ---|---|

## Installation

Module can be installed either via `git` or via `npm`.
Before, you have to install io.js (or node.js) and git. 
After all, clone this repo (for latest version) or just run:
```
$ npm install files-stream
```


## Example Usage

```
$ node example.js //  of module dir
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
        .on('end' ,console.log.bind(console,'you will see me only if there has been occurred no errors '))
        .pipe(new WS("./my.three.files.txt"))

```
Epress integration:
```javascript
// Warninig: Don't use this module in production!
// Since module doesn't supports data bufferization it still keeps some troubles in files reading
// process, so in that way you have to use this module in case of development only.
// See below for more info about express integration.
var express     = require('express')
var streamOf    = require('files-stream').express
var myApp       = express()
    myApp.get('/bundle.js',streamOf(	'./dist/jQuery.min.js',
					'./dist/main.min.js',
					'./dist/modules.min.js'))
    myApp.listen(8080)

```


## API
All module's interfaces (including options parameter and events) are inherited
of the [Readable stream](https://iojs.org/api/stream.html#stream_class_stream_readable)
and [Events emitter](https://iojs.org/api/events.html) classes:

```javascript

var FSS  = require('files-stream');
new FSS('./file/path'[,'./file/path'|options])
        .setEncoding('utf8')
        .on("readable" ,handler)
        .on("error"    ,handler)
        .on("data"     ,handler)
        .on("end"      ,handler)
// or...
new FSS(options).addFiles(['./file/path'[,'./file/path']]).on(//etc)
// For Express
var expressApp.get( '/myRoute',FSS.express('./file/path'[,'./file/path'|options]))
```
Static *`.express()`* method is just the same *`files-stream`* constructor with the same behavior without any resctrictions. 

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
- [x] ~~More examples~~

---
[![npm package](https://nodei.co/npm/files-stream.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/files-stream/)
