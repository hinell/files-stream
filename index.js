var Readable     = require('stream').Readable
var iherits      = require("util").inherits
var fs           = require("fs")
var ReadStream   = fs.ReadStream
    function  FilesStream (name,options) {
        if (typeof name === "string") this.name = name
        else                          options   = name
        Readable.call(this,options)
        this.options        = options = options || {}
        this._dataDelimiter = options.delimiter || null
        this._sources       = []
        this._index         = 0
        this.__fRead        = 0
    };

    iherits(FilesStream,Readable)
    module.exports = FilesStream
    FilesStream.prototype.addFiles           = function (array) {
        var notArray  = !(array instanceof Array)
        if (notArray) throw new Error ("Required an array containing paths")
        this._sources = array
        return this
    }
    FilesStream.prototype._read              = function (chunkSize) {
        var filePath  = this._sources[this._index]
        if (this._isLastSource())   { this.push(null); return }
        this._sendChunksOf(filePath,chunkSize)
    }
    FilesStream.prototype._isLastSource      = function (        ) { return this._index === this._sources.length }
    FilesStream.prototype._sendChunksOf      = function (filePath,chunkSize) {
        function readFail (err,fd) {
            fd && fs.close(fd)
            this.emit("error",err)
            this._index++
        }
        var open    = fs.open
        var stat    = fs.stat
        var read    = fs.read
        var close   = fs.close
        open(filePath,"r", (function (err, fd) {
            if (err) { readFail.call(this,err,fd);return}
            stat(filePath, (function (err, stats) {
                if (err) { readFail.call(this,err,fd);return}
                var sizeofFile  = stats.size
                var readed      = this.__fRead
                if (readed < sizeofFile){
                    if ((readed+chunkSize)>sizeofFile) chunkSize = sizeofFile-readed
                    read(fd,new Buffer(chunkSize),0,chunkSize,readed, (function (err,l,buff) {
                        if (err) { readFail.call(this,err,fd);return}
                        this.push(buff.toString())
                        this.__fRead+=chunkSize
                    }).bind(this))
                } else {
                    this.__fRead = 0
                    this._index++
                    this.push(this._dataDelimiter || "\r\n")
                    close(fd)
                    this.emit('close')
                }
            }).bind(this))
        }).bind(this))
    }