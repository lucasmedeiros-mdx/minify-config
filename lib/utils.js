(function() {

    "use strict";

    var fs      = require('fs'),
        glob    = require('glob'),
        path    = require('path'),
        config;


    if (!String.prototype.format) {
        String.prototype.format = function() {
            var args = arguments;
            return this.replace(/\{(\d+)\}/g, function(match, number) {
                return typeof args[number] != 'undefined' ? args[number] : match;
            });
        };
    }


    function contains (a, obj) {

        var i = a.length;
        while (i--) {
           if (a[i] === obj) {
               return true;
           }
        }
        return false;
    }


    function setDS (obj) {

        return obj + (obj.charAt(obj.length - 1) === '/' ? '' : '/');
    }


    /**
    * Splits a string "f" by character "c" removing last element.
    * If pre is informed joins f, otherwise returns the removed value.
    */
    function split (f, c, pre) {

        f = f.split(c);
        var p = f.pop();
        return pre ? f.join(c) : p;
    }


    function createdir (path, callback, parameters) {

        fs.exists(path, function(exists) {
            if (!exists) {
                fs.mkdir(path, '0777', function() {
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
                    console.log("Could not read File " + f);
                    return false;
                }
            });
        } else if (typeof callback === "function") {
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


    function watchFile (data, callback, mtime) {

        var cTime = [],
            files = data.files.split('|');

        for (var c in files) {
            cTime.push( fs.statSync( files[c] ).mtime.getTime() );
        }

        if(mtime && mtime.toString() != cTime.toString()) {
            callback(data);
        }

        setTimeout(function() {
            watchFile(data, callback, cTime);
        }, 500);
    }


    function minify (path, dir, callback) {

        glob(path, [], function (er, files) {
            files.filter(function(file) {
                var outputPath = setDS(dir.replace("${folder}", split(file, "/", 1))),
                    ext = split(file, ".", 0),
                    nfile = split(file, "/", 0).slice(0, - (ext.length + 1)),
                    params = {};

                params[nfile] = [file];

                createdir(outputPath, callback, [outputPath, params]);
            });
        });
    }


    function getExtension (filename) {

        var ext = path.extname(filename||'').split('.');
        return ext[ext.length-1];
    }


    function setConfig (_config) {

        config = _config;
        return _config;
    }


    function getConfig () {

        return config;
    }


    exports.contains = contains;
    exports.setDS = setDS;
    exports.split = split;
    exports.createdir = createdir;
    exports.readFiles = readFiles;
    exports.parseFolder = parseFolder;
    exports.watchFile = watchFile;
    exports.minify = minify;
    exports.getExtension = getExtension;
    exports.setConfig = setConfig;
    exports.getConfig = getConfig;

}());
