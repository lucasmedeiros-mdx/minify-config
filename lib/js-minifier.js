(function() {

    var fs          = require('fs'),
        glob        = require('glob'),
        uglifyjs    = require('uglify-js'),
        Utils       = require('./utils');

   
    function jsfiles (dir, files) {

        Utils.createdir(dir, minifyJs, [dir, files]);
    }


    function jsfolders (dir, folders) {

        Utils.parseFolder(dir, folders, minifyScripts);
    }


    function minifyJs (path, data) {

        for (var scriptName in data) {
            var scripts     = data[scriptName],
                inScript    = scripts.join(' '),
                outScript   = [path, scriptName, '.min.js'].join(''),
                output      = '';

            for (var s in scripts) {
                output += uglifyjs.minify(scripts[s], {
                    mangle: true
                }).code;
            }

            fs.writeFileSync(outScript, output);

            if (config.stats) {
                console.log('[UglifyJS] ' + inScript + ' -> ' + outScript);
            }
        }
    }    

    
    function minifyScripts (dir, folder) {

        Utils.minify(Utils.setDS(folder) + "!(*.min.js).js", dir, minifyJs);
    }
    

    exports.jsfiles = jsfiles;
    exports.jsfolders = jsfolders;

}());