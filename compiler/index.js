
// Load Mootools
require('mootools');

var xml2js = require("xml2js");
var parser = new xml2js.Parser();
var tags = require('./phi/compiler/tags');
var fs = require('fs');

var myTag = new tags.ContainerTag();


fs.readFile('compiler/example.xml', 'utf-8', function(err, data) 
{
    parser.parseString(data, function (err, result) 
    {
        console.log(result);
    });

});
