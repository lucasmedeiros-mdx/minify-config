(function() {

    "use strict";

    var fs           = require('fs'),
        Utils        = require('./utils'),
        JsParser     = require('./js-minifier'),
        CssParser    = require('./css-minifier'),
        HtmlParser   = require('./html-minifier'),
        config;


    function build (config) {

        configure(Utils.setConfig(config));
    }


    function configure (config) {

        fs.readFile(config.file, 'utf8', function(err, dataFile) {

            var data;
            try {
                data = JSON.parse(dataFile);
            } catch (e) {
                if (e.name == 'JS_Parse_Error') {
                    console.log("[JSON] Invalid configuration file");
                    return false;
                } else {
                    throw e;
                }
            }

            var js   = data.javascript,
                css  = data.css,
                html = data.html;            
    

            if (js && js.files) {
                JsParser.jsfiles(js.output.files ? Utils.setDS(js.output.files) : "", js.files);
            }
            if (js && js.folders) {
                JsParser.jsfolders(js.output.folders ? Utils.setDS(js.output.folders) : "", js.folders);
            }
            if (css && css.files) {
                CssParser.cssfiles(css.output.files ? Utils.setDS(css.output.files) : "", css.files);
            }
            if (css && css.folders) {
                CssParser.cssfolders(css.output.folders ? Utils.setDS(css.output.folders) : "", css.folders);
            }
            if (html && html.files) {
                HtmlParser.htmlfiles(html.output.files ? Utils.setDS(html.output.files) : "", html.files);
            }
            if (html && html.folders) {
                HtmlParser.htmlfolders(html.output.folders ? Utils.setDS(html.output.folders) : "", html.folders);
            }
        });
    }


    exports.build = build;

}());