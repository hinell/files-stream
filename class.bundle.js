var Readable     = require('stream').Readable
var iherits      = require("util").inherits
var fs           = require("fs")
var ReadStream   = fs.ReadStream
    function  Bundle (name,options) {
        if (!name) throw new Error("Name Bundle Required")
        Readable.call(this,options)
        this.name           = name
        this.options        = options
        this._sources       = []
        this._index         = 0
    };

    iherits(Bundle,Readable)
    module.exports = Bundle
    Bundle.prototype.addFiles           = function (array) {
        var notArray  = !(array instanceof Array)
        if (notArray) throw new Error ("Required an array containing paths")
        this._sources = array
    }

    Bundle.prototype._isLastSource      = function (            ) { return this._index === this._sources.length;}
    Bundle.prototype._read              = function () {
        if (this._isLastSource()){ this.push(null); return }
        var path            = this._sources[this._index]
        this.currentStream  = this.currentStream || new ReadStream(path,this.options)
        this.currentStream.once("data", (function (chunk) {
                if (typeof chunk === "string") chunk+=("\r\n")
                //this.resume()
                this.push(new Buffer(chunk,this.options))
                this._index++
                this.currentStream = false
            }).bind(this))

    }