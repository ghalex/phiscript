
require('./libs/mootools-server');

var fs = require('fs');
var http = require("http");
var files = require('./core/files');
var directory = 'src/phi/';

// Build script data from files
var scriptData = "";
files.all.each( function( item, index ) {
    
    var data = fs.readFileSync(directory + item, 'utf-8');
    scriptData += data + '\n';
    
});

// Write data to server
var server = http.createServer(
	function(request, response) 
	{
		response.writeHead(200, {"Content-Type": "application/x-javascript"});
		response.write( scriptData );
		response.end();
	}
);

server.listen( process.env.PORT );