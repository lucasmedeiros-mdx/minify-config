(function() {

    "use strict";

    var sys         = require('sys'),
        exec        = require('child_process').exec,
        Utils       = require('./utils'),
        tag         = '[Html]',
        child;


    function htmlfiles (dir, data) {

        for (var scriptName in data) {
            var scripts = data[scriptName],
                inputScripts = scripts.join(' '),
                outputScript = dir + scriptName + '.min.html',
                cmd = [
                    "java",
                    "-jar", __dirname + "/../bin/htmlcompressor-1.5.3.jar",
                    inputScripts,
                    "-o", outputScript,
                    "--type", "html",
                    "--remove-quotes",
                    "--compress-js",
                    "--compress-css"
                ];

            if (+Utils.getConfig().stats) {
                console.log("{0} {1} -> {2}".format(tag, inputScripts, outputScript));
            }
            childProccess(cmd.join(' '));
        }
    }


    function htmlfolders (dir, folder) {

        Utils.minify(folder + "!(*.min.html).*(html|htm|tpl)", dir, htmlfiles);
    }


    function childProccess (command) {

        child = exec(command, function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
    }


    exports.htmlfiles = htmlfiles;
    exports.htmlfolders = htmlfolders;

}());