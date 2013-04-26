(function() {

    var fs          = require('fs'),
        less        = require('less'),
        glob        = require('glob'),
        Utils       = require('./utils');

   
    function cssfiles (dir, files) {

        Utils.createdir(dir, minifyCss, [dir, files]);
    }


    function cssfolders (dir, folders) {

        Utils.parseFolder(dir, folders, minifyStyles);
    }


    function minifyCss (path, data) {

        var parser = new(less.Parser)();

        for (var scriptName in data) {
            var scripts     = data[scriptName],
                inScript    = scripts.join(' '),
                outScript   = [path, scriptName, '.min.css'].join('');

            Utils.readFiles(scripts, function(dataFile) {
                parser.parse(dataFile, function (e, tree) {

                    fs.writeFileSync(outScript, tree.toCSS({
                        compress: true,
                        yuicompress: true
                    })); //Save Minified CSS File

                });
            });

            if (config.stats) {
                console.log('[CSS] ' + inScript + ' -> ' + outScript);
            }
        }
    }


    function minifyStyles (dir, folder) {

        Utils.minify(Utils.setDS(folder) + "!(*.min.css).*(css|less)", dir, minifyCss);
    }


    exports.cssfiles = cssfiles;
    exports.cssfolders = cssfolders;

}());