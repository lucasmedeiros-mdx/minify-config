minify-config.js
================
Configuration tool for minifying your scripts.


##Introduction

Minify-config is a json based application for minifying your files in an organized and quick way.
It requires that you have node.js and npm installed.


##Installation

> npm install -g minify-config


##Usage

Copy the default config file from the npm folder (or bellow).

> __Windows__: C:\Users\\&lt;username&gt;\AppData\Roaming\npm\node_modules\minify-config\config

###config.json  

```json
{
    "javascript": {
        "files": {
            "app": [
                "js/jquery.js",
                "js/bootstrap.js",              
                "js/plugins.js",
                "js/main.js"
            ]
        },
        "folders": "js/(vendor|plugins)",
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
        "folders": "css/(less)",
        "output": {
            "files": "css/",
            "folders": "${folder}/min"
        }
    }
}
```
    
###Javascript / CSS

Minify-config uses uglify-js for compacting your javascript and less for compacting your css/less.
It allows minifying all your scripts to a single one, each key in <code>files</code> tag represents the name the minified file will receive.

In the default configuration, 
<code>js/jquery.js js/bootstrap.js js/plugins.js js/main.js</code>
will be minified to <code>app.min.js</code> inside the folder set in <code>javascript.output.files</code> tag.

<code>javascript.folders</code> and <code>css.folders</code> allow glob expressions for matching your folders.
  
 
###Html
Minify-config uses Googles's htmlcompressor for compacting your html. 
It's required you have java installed for minifying your html templates.

Html Parser follows Javascript/Css parser syntax. Allowing users to minify both single files, or an entire folder, matching files with (html|html|tpl) extension.


##Applying to your project

Place the configurated json file in your root directory (or where you think it's better) with the correct path for your files.
Now simply run the following from command line:

>minifyconfig -f config.json

You might also execute the "automin" file placed in the config directory, which will run the command above.


##Sublime Text 2

> C:\Users\\&lt;username&gt;\AppData\Roaming\npm\node_modules\minify-config\config

In your npm folder, there's a snippet for quickly creating your config.json file to your projects.    
Simply apply it to Sublime Text 2, the word "minify" triggers the snippet.

##Alpha
Minify-config is still in it's alpha version and the following tasks are being implemented

###TO DO
* Web page explaining the config.json file line by line
* Pre-configured example application + Sublime Fetch Download
* Sublime package
    * Snippets for quickly creating your configuration file
    * Build and execute minify-config directly from Sublime Text
    * Smart build detecting if the file is in a package and automatically compiling the entire group
* Unit Tests and TravisCI


Need something more robust? You're probably looking for [Grunt](http://gruntjs.com/).



##Information

Copyright (c) 2013 Lucas Medeiros