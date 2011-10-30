
require('./../libs/mootools-server');

var fs = require('fs');
var http = require("http");
var files = require('./files');
var directory = 'src/phi/';

// Build script data from files
function buildScript()
{
    var result = "";
    files.all.each( function( item, index ) {
        
        var data = fs.readFileSync(directory + item, 'utf-8');
        result += data;
        
    });
    
    return result;
}

// Write data to server
var server = http.createServer(
	function(request, response) 
	{
		response.writeHead(200, {"Content-Type": "application/x-javascript"});
		response.write( buildScript() );
		response.end();
	}
);

server.listen( process.env.PORT );