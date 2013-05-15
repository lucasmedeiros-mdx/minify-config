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
                console.log("[JSON] Invalid configuration file");
                return false;
            }

            var js   = data.javascript,
                css  = data.css,
                html = data.html;


            if (js && js.files) {
                JsParser.jsfiles(Utils.setDS(js.output.files), js.files);
            }
            if (js && js.folders) {
                JsParser.jsfolders(Utils.setDS(js.output.folders), js.folders);
            }
            if (css && css.files) {
                CssParser.cssfiles(Utils.setDS(css.output.files), css.files);
            }
            if (css && css.folders) {
                CssParser.cssfolders(Utils.setDS(css.output.folders), css.folders);
            }
            if (html && html.files) {
                HtmlParser.htmlfiles(Utils.setDS(html.output.files), html.files);
            }
            if (html && html.folders) {
                HtmlParser.htmlfolders(Utils.setDS(html.output.folders), html.folders);
            }
        });
    }


    exports.build = build;

}());