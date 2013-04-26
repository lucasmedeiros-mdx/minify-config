(function() {

    var fs           = require('fs'),
        underscore   = require('underscore'),
        Utils        = require('./utils'),
        JsParser     = require('./js-minifier'),
        CssParser    = require('./css-minifier'),
        HtmlParser   = require('./html-minifier'),
        config;


    function build (arguments) {

        var options  = {},
            _options = {
                f: {
                    name: 'file',
                    type: 'literal'
                },
                stats: {
                    name: 'stats',
                    type: 'literal'
                }
            },
            header,
            type;

        for (var a in arguments) {
            var it = arguments[a].replace('/^ +| +$/g', '');
            if (it[0] == '-') {
                var op = _options[it.substring(1)];
                header = op.name;
                type = op.type;
                if (type == 'array') {
                    options[header] = [];
                }
            } else if (type == 'array') {
                options[header].push(it);
            } else if (type == 'literal') {
                options[header] = it;
            }
        }

        config = underscore.extend({
            file: 'config.json',
            stats: true,
        }, options);
        
        configure(Utils.setConfig(config));
    }


    function configure (config) {

        fs.readFile(config.file, 'utf8', function(err, dataFile) {
            var data = JSON.parse(dataFile),
                js   = data.javascript,
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