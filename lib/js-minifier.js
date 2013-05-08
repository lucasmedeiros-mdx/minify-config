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
    
	function watch_file(file,callback,last_mtime) {
		
		var current_time = fs.statSync( file ).mtime.getTime();
		
		if(last_mtime) {
			
			if(current_time != last_mtime) {
				callback();
				return;
			}
		}
		
		setTimeout(function() {
			
			watch_file(file,callback,current_time);
		});
	}
	
    function minifyJs (path, data) {
		
        for (var scriptName in data) {
            var scripts     = data[scriptName],
                inScript    = scripts.join(' '),
                outScript   = [path, scriptName, '.min.js'].join(''),
                output      = '';
			
            for (var s in scripts) {
				
				watch_file(scripts[s],function(){
					minifyJs(path, data);
				});
				
                output += uglifyjs.minify(scripts[s], {
                    mangle: true
                }).code;
            }
			
            fs.writeFileSync(outScript, output);
			
            if (+Utils.getConfig().stats) {
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
