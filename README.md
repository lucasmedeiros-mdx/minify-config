minify-config.js
================
minify-config is a node.js configuration tool for easily minifying your scripts/stylesheets.


##Installation

If you sill don't have node.js installed, download it at [http://nodejs.org/](http://nodejs.org/).

If everything went as expected, npm (Node Packaged Modules) was configured with node.js. Verify it typing the following command (in command line):

> npm --version

Considering npm was successfully configured, install the minify-config lib:

> npm install -g minify-config

The -g option indicates the lib minify-config will be available for command line usage, if your objective is use the lib as an API this option isn't needed.


##Configuration

To configure the library to minify your application, [download the default configuration file](#) or copy it from your npm directory.

> __Windows__: C:\Users\<username>\AppData\Roaming\npm\node_modules\minify-config\config

###config.json  

```json
{
    "javascript": {
        "files": {
            "app": [
                "js/plugins.js",
                "js/main.js"
            ]
        },
        "folders": "js/*(vendor|plugins)",
        "output": {
            "files": "js/min",
            "folders": "${folder}/min"
        }
    },
    "css": {
        "files": {
            "app": [
                "css/bootstrap.css",
                "css/bootstrap-responsive.css",
                "css/main.less"
            ]
        },
        "folders": "css/*(less)",
        "output": {
            "files": "css/",
            "folders": "${folder}/min"
        }
    }
}
```

###Javascript / CSS
The library allows you to compact both your scripts in js extension, as your stylesheets in [Less] (http://lesscss.org) or css extension.
You might minify many scripts to a single file, reducing the number of http requests your application requires. 

E.g., in the default configuration file, <code>js/jquery.js js/bootstrap.js js/plugins.js js/main.js</code> will be minified to <code>app.min.js</code>, and stored in the directory defined in <code>javascript.output.files</code> (js/min) tag.

Besides a single file, you may configure minify-config for minifying an entire folder in <code>folders</code> tag. <code>folders</code> may receive an Array setting the directories that will be minified, or an regular expression¹.

[¹] <code>javascript.folders</code> and <code>css.folders</code> allow the use of [Glob](https://npmjs.org/package/glob) expressions for parsing your folders.


### Html

Minify-config uses Google's htmlcompressor lib for compacting your html. It's required you have Java installed for minifying your templates.

The html parser follow 

O parser html follows the javascript/css parser syntax. Allowing you to compact specific files or entire directories.



##Aplicando no seu projeto

To use the library in your project you must place the configuration file on the root of your application (or in the directory that you find more appropriate) with the correct path for the files location. Now just run the process (command line) making sure to be in the directory where the config.json is stored:

> minifyconfig -f config.json

If all paths were set correctly, will be displayed on the screen which processes were executed and which files were generated.

> __Windows__: You may also execute the automin.bat file (copy it from the config folder). This file will automatically execute the command above.



##Sublime Text 2

It's not required, but Sublime Text editor is highly recommended for improving your development workflow.

> C:\Users\<username>\AppData\Roaming\npm\node_modules\minify-config\config

Check it out <code>Minify.sublime-build</code> and <code>minify.sublime-snippet</code> set in the config folder.

To make the whole proccess even faster, add the build <code> Minify.sublime-build </ code> on your Sublime. Just set the default build system as Minify (Tools> Build System) and after that perform the build.
It's ready, the command will be processed via the command line and your files will be generated.

####_*Comming soon: Sublime Minify Config package *_####


##Informations

Access [lmedeiros.com](http://lmedeiros.com) for more informations.

Copyright (c) 2013 Lucas Medeiros
