(function() {

    "use strict";

    var fs          = require('fs'),
        less        = require('less'),
        Utils       = require('./utils'),
        parser      = new(less.Parser)(),
        tag         = '[CSS]';


    function cssfiles (dir, files) {

        Utils.createdir(dir, minifyCss, [dir, files]);
    }


    function cssfolders (dir, folders) {

        Utils.parseFolder(dir, folders, minifyStyles);
    }


    function writeFile (data) {

        var f = data.files.split('|');
        Utils.readFiles(f, function(dataFile) {
            parser.parse(dataFile, function (e, tree) {

                fs.writeFile(data.output, tree.toCSS({
                    compress: true,
                    yuicompress: true
                })); //Save Minified CSS File

            });
        });

        if (+Utils.getConfig().stats) {
            console.log("{0} {1} -> {2}".format(tag, data.files.replace(/\|/g, ' '), data.output));
        }
    }


    function minifyCss (path, data) {

        for (var scriptName in data) {
            var scripts = data[scriptName],
                file    = Utils.getConfig().unique;

            if (!file || Utils.contains(scripts, file)) {
                var config = {
                    files: scripts.join('|'),
                    output: [path, scriptName, '.min.css'].join('')
                };

                if (Utils.getConfig().auto) {
                    Utils.watchFile(config, writeFile);
                } else {
                    writeFile(config);
                }
            }
        }
    }


    function minifyStyles (dir, folder) {

        Utils.minify(Utils.setDS(folder) + "!(*.min.css).*(css|less)", dir, minifyCss);
    }


    exports.cssfiles = cssfiles;
    exports.cssfolders = cssfolders;

}());