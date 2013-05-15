(function() {

    "use strict";

    var fs          = require('fs'),
        uglifyjs    = require('uglify-js'),
        Utils       = require('./utils');


    function jsfiles (dir, files) {

        Utils.createdir(dir, minifyJs, [dir, files]);
    }


    function jsfolders (dir, folders) {

        Utils.parseFolder(dir, folders, minifyScripts);
    }


    function writeFile (data) {

        var output = '',
            files = data.files.split('|');

        for (var s in files) {
            output += uglifyjs.minify(files[s], {
                mangle: true
            }).code;
        }

        fs.writeFile(data.output, output);

        if (+Utils.getConfig().stats) {
            console.log('[UglifyJS] ' + data.files.replace(/\|/g, ' ') + ' -> ' + data.output);
        }
    }


    function minifyJs (path, data) {

        for (var scriptName in data) {
            var scripts = data[scriptName],
                file    = Utils.getConfig().unique;

            if (!file || Utils.contains(scripts, file)) {
                var config = {
                    files: scripts.join('|'),
                    output: [path, scriptName, '.min.js'].join('')
                };

                if (Utils.getConfig().auto) {
                    Utils.watchFile(config, writeFile);
                } else {
                    writeFile(config);
                }
            }
        }
    }


    function minifyScripts (dir, folder) {

        Utils.minify(Utils.setDS(folder) + "!(*.min.js).js", dir, minifyJs);
    }


    exports.jsfiles = jsfiles;
    exports.jsfolders = jsfolders;

}());
