var Readable     = require('stream').Readable
var iherits      = require("util").inherits
var fs           = require("fs")
var ReadStream   = fs.FileReadStream
    function  Bundle (name,options) {
        if (!name) throw new Error("Name Bundle Required")
        Readable.call(this,options)
        this.name           = name
        this.options        = options
        this._sources       = []
        this._index         = 0
        this.__fRead        = 0
        this._dbg           = 0
    };

    iherits(Bundle,Readable)
    module.exports = Bundle
    Bundle.prototype.addName            = function (name) {
        require("path").parse(name).extname();
        
    }
    Bundle.prototype.addFiles           = function (array) {
        var notArray  = !(array instanceof Array)
        if (notArray) throw new Error ("Required an array containing paths")
        this._sources = array
    }

    Bundle.prototype._isLastSource      = function (            ) { return this._index === this._sources.length;}
    Bundle.prototype._read              = function (chunkSize) {
        if (this._isLastSource()){ this.push(null); return }
        var filePath            = this._sources[this._index]
        if (chunkSize) {
            var open    = fs.open
            var stat    = fs.stat
            var read    = fs.read
            var close   = fs.close

                open(filePath,"r", (function (err, fd) {
                    if (err) throw err
                    stat(filePath, (function (err, stats) {
                        if (err) throw err
                    var sizeofFile  = stats.size
                    var read        = this.__fRead
                        if (read !== sizeofFile){
                            if ((read+chunkSize)>sizeofFile) chunkSize = sizeofFile-read
                            var buffer = new Buffer(chunkSize,this.options.encoding)
                                fs.read(fd,buffer,0,chunkSize,read, (function (err,l,buff) {
                                    if(err) throw err
                                    this._dbg++
                                    this.push(buff)
                                    this.__fRead+=chunkSize
                                }).bind(this))
                        } else {
                            this.__fRead = 0
                            this._index++
                            this.push(new Buffer("\r\n",this.options.encoding))
                            close(fd)
                            console.log(" %s | %s | %s: %s | Chunk: %s | Read: %s:%s |   %s:%s ",this._index,this._dbg,filePath,sizeofFile,chunkSize,read,typeof read,sizeofFile, typeof sizeofFile)

                        }

                    }).bind(this))
                }).bind(this))

        } else {
            this.currentStream  = this.currentStream || new ReadStream(filePath,this.options)
            this.currentStream.once("data", (function (chunk) {
                if (typeof chunk === "string") chunk+=("\r\n")
                this.push(new Buffer(chunk,this.options.encoding))
                this._index++
                this.currentStream = false
            }).bind(this))
        }
    }