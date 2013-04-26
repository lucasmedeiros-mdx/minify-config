(function() {

    var fs      = require('fs'),
        glob    = require('glob'),
        config;


    function setDS (obj) {

        return obj + (obj.charAt(obj.length-1) == '/' ? '' : '/');
    }


    /**
    * Splits a string "f" by character "c" removing last element. 
    * If pre is informed joins f, otherwise returns the removed value.
    */
    function split (f, c, pre) {

        f = f.split(c);
        var p = f.pop();
        return pre ? f.join(c) : p;
    };    


    function createdir (path, callback, parameters) {

        fs.exists(path, function(exists) {
            if (!exists) {
                fs.mkdir(path, 0777, function() {
                    callback.apply(null, parameters);
                });
            } else {
                callback.apply(null, parameters);
            }
        });
    }


    function readFiles (files, callback, dataFile) {

        if (files.length) {
            var f = files.shift();
            fs.readFile(f, 'utf8', function(err, data) {
                readFiles(files, callback, (dataFile || '') + (data || ''));

                if (err) {
                    console.log("[Error] - Could not read File " + f);
                }
            });
        } else {
            callback(dataFile);
        }
    }


    function parseFolder (dir, folders, callback) {

        if (typeof folders == 'string') {
            folders = [folders];
        }

        for (var f in folders) {
            callback(dir, setDS(folders[f]));
        }
    }


    function minify (path, dir, callback) {

        glob(path, [], function (er, files) {            
            files.filter(function(file) {
                var outputPath = Utils.setDS(dir.replace("${folder}", Utils.split(file, "/", 1))),
                    ext = Utils.split(file, ".", 0),
                    nfile = Utils.split(file, "/", 0).slice(0, - (ext.length + 1)),
                    params = {};                

                params[nfile] = [file];
                callback(outputPath, params);
            });
        });
    }


    function setConfig (_config) {
        config = _config;
        return _config;
    }


    exports.setDS = setDS;
    exports.split = split;
    exports.createdir = createdir;
    exports.readFiles = readFiles;
    exports.parseFolder = parseFolder;
    exports.minify = minify;
    exports.setConfig = setConfig;
    exports.config = config;

}());
