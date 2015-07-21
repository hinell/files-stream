var Readable     = require('stream').Readable
var iherits      = require("util").inherits
var fs           = require("fs")
    /*
    *
    * You can specify arguments in arbitrary order: <tt>(path, path [,path | object])</tt>
    * <tt>Path</tt> - should have form like  <tt>'/foo/bar/file.txt'</tt>
    * <tt>Object</tt> - is optional and represent <a href='https://github.com/hinell/files-stream'>options</a> for instance configuration. Must be specified once.
    * @return {object}
    * */
    function  FilesStream () {
        var options
        var paths = Array.prototype.slice.call(arguments)
            .filter(function (e) {
                options
                || typeof e === 'string'
                || e instanceof Object && (options = e, true)

                return typeof e === 'string'
            })

            Readable.call(this,options)
            this.options         = options = options || {};
            this._dataDelimiter  = options.delimiter || "\r\n"
            this._forceBuffering = ('NODE_ENV' in process.env) && (process.env.NODE_ENV === 'development')
            this._sources        = []
            this._index          = 0
            this.__fRead         = 0
            this.addFiles(paths)
    };
    iherits(FilesStream,Readable)
    module.exports = FilesStream

    /*
    * @return {Function}
    * */
    FilesStream.express                      = function () {
           var paths = Array.prototype.slice.call(arguments)
        return function (req, res, next) {
            var Custom                       = function () { FilesStream.apply(this,paths) }
                Custom.prototype             = Object.create(FilesStream.prototype)
                Custom.prototype.constructor = FilesStream
            new Custom().on('error',next).pipe(res)}
    
    }

    FilesStream.prototype.addFiles           = function (array) {
        var notArray  = !(array instanceof Array)
        if (notArray) throw new Error ("Required an array containing paths")
        this._sources = array
        return this
    }

    FilesStream.prototype._read              = function (chunkSize) {
        var filePath  = this._sources[this._index]
        if (this._isLastSource())   { this.push(null);  return }
        this._sendChunksOf(filePath,chunkSize)
    }
    FilesStream.prototype._isLastSource      = function (        ) { return this._index === this._sources.length }
    FilesStream.prototype._sendChunksOf      = function (filePath,chunkSize) {

        var open    = fs.open
        var stat    = fs.stat
        var read    = fs.read
        var close   = fs.close

        function readFail (err,msg,fd) {
            fd && close(fd)
            err.message=msg+'\r\n '+err.message
            this.errored = true
            this.emit("error",err)
            this._index++
        }
        open(filePath,"r", (function (err, fd) {
            if (err) { readFail.call(this,err,'Error: In attempt to open file.',fd);return}
            stat(filePath, (function (err, stats) {
                if (err) { readFail.call(this,err,'Error: While stat data has been retrieving.',fd);return}
                var sizeofFile  = stats.size
                var readed      = this.__fRead
                if (readed < sizeofFile){
                    if ((readed+chunkSize)>sizeofFile) chunkSize = sizeofFile-readed
                    read(fd,new Buffer(chunkSize),0,chunkSize,readed, (function (err,l,buff) {
                        if (err) { readFail.call(this,err,'Error: While file has been reading.',fd); return}
                        this.push(buff.toString())
                        this.__fRead+=chunkSize
                    }).bind(this))
                } else {
                    this.__fRead = 0;
                    this._index++;

                    this._isLastSource() || this.push(this._dataDelimiter)
                    this._isLastSource() && this.push(' ')
                    close(fd)
                }
            }).bind(this))
        }).bind(this))
    }