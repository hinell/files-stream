var assert              = require('assert');
var FilesStream         = require('../');

var ourInvokations      = 1000
    console.time("Test")


    describe('Files stream testing.', function () {
        context('When file is reading', function () {
            this.timeout(2*1000*10)
            it('should throw error if file not exists', function (done) {
                new FilesStream()
                    .addFiles(['./there.no.file.txt'])
                    .on('error', function (err) {err && done()})
                    .on('data', function () {})



            })


            it('files should have specified delimiter', function (done) {
                new FilesStream({delemiter:'<FILEDELEMITER>'})
                    .addFiles([
                        './test/file.1.txt',
                        './test/file.2.txt'
                    ])
                    .on('data', function (chunk) {this.data+=chunk})
                    .on('end',  function () {
                        var delimiterExists = !~this.data.search(/<FILEDELEMITER>/g)
                        delimiterExists && done()
                        !delimiterExists && done(new Error("Delimiter not found!"))
                    })

            })
        })
    })

