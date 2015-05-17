var Readable     = require('stream').Readable
var iherits      = require("util").inherits
var fs           = require("fs")
var ReadStream   = fs.ReadStream
    function  Bundle (name,options) {
        if (typeof name === "string") this.name = name
        else                          options   = name
        Readable.call(this,options)
        options             = options || {}
        this.options        = options
        this._dataDelimiter = options.delimiter || false
        this._sources       = []
        this._index         = 0
        this.__fRead        = 0
        this.__fExists      = true
    };

    iherits(Bundle,Readable)
    module.exports = Bundle
    Bundle.prototype.addFiles           = function (array) {
        var notArray  = !(array instanceof Array)
        if (notArray) throw new Error ("Required an array containing paths")
        this._sources = array
    }
    Bundle.prototype._read              = function (chunkSize) {
        var filePath  = this._sources[this._index]
        if (this._isLastSource())   { this.push(null); return }
         chunkSize && this._sendAsChunks(filePath,chunkSize)
        !chunkSize && this._sendAsStream(filePath)

    }
    Bundle.prototype._isLastSource      = function (        ) { return this._index === this._sources.length }
    Bundle.prototype._sendAsChunks      = function (filePath,chunkSize) {
        function failFail (err) {
            this.emit("error",err)
            this._index++
        }
        var open    = fs.open
        var stat    = fs.stat
        var read    = fs.read
        var close   = fs.close
        open(filePath,"r", (function (err, fd) {
            if (err) {failFail.call(this,err);return}
            stat(filePath, (function (err, stats) {
                if (err) {failFail.call(this,err);return}
                var sizeofFile  = stats.size
                var read        = this.__fRead
                if (read !== sizeofFile){
                    if ((read+chunkSize)>sizeofFile) chunkSize = sizeofFile-read
                    var buffer = new Buffer(chunkSize,this.encoding)
                    fs.read(fd,buffer,0,chunkSize,read, (function (err,l,buff) {
                        if (err) {failFail.call(this,err);return}
                        this.push(buff)
                        this.__fRead+=chunkSize
                    }).bind(this))
                } else {
                    this.__fRead = 0
                    this._index++
                    this.push(new Buffer(this._dataDelimiter || "\r\n",this.encoding))
                    close(fd)
                    //console.log(" %s | %s | %s: %s | Chunk: %s | Read: %s:%s |   %s:%s ",this._index,this._dbg,filePath,sizeofFile,chunkSize,read,typeof read,sizeofFile, typeof sizeofFile)
                }

            }).bind(this))
        }).bind(this))
    }
    Bundle.prototype._sendAsStream      = function (filePath) {

        this.currentStream  = this.currentStream || new ReadStream(filePath,this.options)
        this.currentStream.once("data", (function (chunk) {
            if (typeof chunk === "string") chunk+=("\r\n")
            this.push(new Buffer(this._dataDelimiter || "\r\n",this.encoding))
            this._index++
            this.currentStream = false
        }).bind(this))
        this.currentStream._errExtracted || (function () {
            var lstrns = this.listeners("error")
            if(lstrns instanceof Array){
                this.currentStream._errExtracted = !0;
                for (var i in lstrns) this.currentStream.on("error",lstrns[i])

            }
        }).call(this)

    }