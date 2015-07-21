var assert              = require('assert')
    equal               = assert.strictEqual
var FilesStream         = require('../')
    var message     = function (m, isMethod,after) {
        var end = (isMethod && 'method') || 'field'
        return "Instance should have "+m+" "+end+(after || '')
    }
    describe('Module internal elements.', function () {
        var fs = new FilesStream()
            context('Module.constructor', function () {
                it('.Internal'       , function (done) {
                    assert(fs.options               ,message('.options '       ))
                    assert(fs._sources              ,message('._sources'       ))
                    equal (fs._dataDelimiter,"\r\n" ,message('._dataDelimiter' ))
                    equal (fs._index        ,0      ,message('._index'         ))
                    equal (fs.__fRead       ,0      ,message('.__fRead'        ))
                    done()
                })
                it('.Readable.Stream', function (done) {
                    assert(fs._readableState    ,message('#_readableState'     ))
                    assert(fs.push              ,message('#push()'        ,true))
                    assert(fs.pipe              ,message('#pipe()'        ,true))
                    done()

                })
                it('.Buffering', function (done) {
                    equal (fs._forceBuffering,false       ,message('._forceBuffering',false," when NODE_ENV isn't development"))
                    process.env.NODE_ENV = 'development'
                    fs = new FilesStream()
                    equal (fs._forceBuffering,true        ,message('._forceBuffering',false," when NODE_ENV is development"   ))
                    done()
                })
            })
            context('Module.methods'    , function () {
                it('.addFiles()'        , function (done) {
                    assert(fs.addFiles          ,message('#addFiles()'                      ,true))
                    equal (fs.addFiles([]),fs   ,message('#addFiles() method returns itself'     ))
                    done()
                })
                it('._isLastSource()'   , function (done) {
                var fail    = false
                    fs._index = fs._sources.length = 0
                    assert(fs._isLastSource         ,message('#_isLastSource()',true))
                    equal (fs._isLastSource(),true  ,"Instance's #_isLastSource() method must returns true")
                    done()
                })

            })

    })
    describe('Behavior.' , function () {
        context('When files is reading ', function () {
        var fail = false
            it('should throw error if file does not exists'  , function (done) {
                new FilesStream()
                    .addFiles(['./there.no.file.txt'])
                    .on('error', function (err) {
                        err && done()
                        err || done(new Error('During reading file if file does not exist instance must throw error '))
                    })
                    .on('data' , function () {})
            })
            it('data stream should have specified delimiter ', function (done) {
                var delimiter = '<FILEDELEMITER>'
                new FilesStream({delimiter:delimiter})
                    .addFiles([
                        './test/file.1.txt',
                        './test/file.2.txt'
                    ])
                    .on('end' ,function () {
                        var delimiterExists = !! new RegExp(delimiter,'g').exec(this.data)
                            delimiterExists && done()
                            delimiterExists || done(new Error("Delimiter not found!"))

                    })
                    .on('data',function (chunk) {this.data+=chunk})

            })
            it('must read encoding chunk specified encoding' , function (done) {
                new FilesStream({encoding:'base64'})
                    .addFiles(['./test/file.1.txt'])
                    .on('readable', function () { this.data+= this.read() })
                    .on('end'     , function () { this.data !== null && equal (this.data.slice(0,4),'QmVk','Read chunk must have specified encoding')})
                    done()

            })
            it('must read only fixed data chunk'             , function (done) {
                new FilesStream()
                    .addFiles(['./test/file.1.txt'])
                    .on('readable', function () {
                    var fixedLength = 1024;
                    var chunk = this.read(fixedLength)
                        equal (chunk.length, fixedLength, message('Read data from strea.read() must be fixed'))
                        this.resume()
                        done()
                    })
            })
        })
    })