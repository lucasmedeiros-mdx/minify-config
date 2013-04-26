minify-config.js
================
Configuration tool for minifying your scripts.


##Installation

> npm install -g minify-config


##Usage

Minify-config is a json based tool. As such, you must copy the default config file from the npm folder.

> C:\Users\\&lt;username&gt;\AppData\Roaming\npm\node_modules\minify-config\config

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
    
###Javascript

Minify-config uses uglify-js for compacting your javascript.  
It allows minifying all your scripts to a single one.

In the default configuration, 
<code>js/jquery.js js/bootstrap.js js/plugins.js js/main.js</code>
will be minified to <code>app.min.js</code> inside the folder set in <code>javascript.output.files</code> tag.

You also may compact every file with .js extension in a determined folder, 
which will be placed in the directory set at <code>javascript.output.folders</code>.
<code>javascript.folders</code> allows glob expressions for matching your folders.
  

###CSS

Minify-config uses less for compacting your css/less.
As javascript parser, It allows minifying all your styles once.

In the default configuration, 
<code>css/bootstrap.css css/bootstrap-responsive.css css/main.less</code>
will be minified to <code>app.min.css</code> inside the folder set in <code>css.output.files</code> tag.

You also may compact every file with .css or .less extension in a determined folder, 
which will be placed in the directory configured in <code>css.output.folders</code>.
<code>css.folders</code> allows glob expressions for matching your folders.
  

###Html
Minify-config uses Googles's htmlcompressor for compacting your html. 
It's required you have java installed for minifying your html templates.

Html Parser follows Javascript/Css parser syntax. Allowing users to minify both single files, or an entire folder, matching files with (html|html|tpl) extension.

##Sublime Text 2

> C:\Users\\&lt;username&gt;\AppData\Roaming\npm\node_modules\minify-config\config

In your npm folder, there's a snippet for quickly creating your config.json file to your projects.    
Simply apply it to Sublime Text 2, the word "minify" triggers the snippet.
    

##Information

Copyright (c) 2013 Lucas Medeiros