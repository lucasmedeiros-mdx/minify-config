(function () {

    'use strict';

    var assert  = require("assert"),
        fs      = require('fs'),
        Utils   = require("../../lib/utils"),
        minifyconfig   = require("../../lib/minify-config");


    describe('Utils', function() {
        describe('#getExtension()', function() {
            it('should get the file extension', function(done) {
                assert.equal('js', Utils.getExtension('file.js'));
                assert.equal('css', Utils.getExtension('file.min.css'));
                assert.equal('less', Utils.getExtension('space separated file.less'));
                done();
            });
        });

        describe('#readFiles()', function() {
            it('should throw an exception when reading inexistent file', function(done) {
                assert.doesNotThrow(function() {
                    Utils.readFiles(['test.js'], function() {
                        done();
                    });
                }, Error);
            });
        });
    });

})();
