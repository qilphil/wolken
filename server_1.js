/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var http = require("http"),
url = require("url"),
path = require("path"),
fs = require("fs"),
port = process.argv[2] || 8888,
fpath = "fn" ,
mime = require('mime');

http.createServer(function(request, response) {
	

	var uri = url.parse(request.url).pathname
	, filename = path.join(process.cwd(), uri)
	, wolken = require("./wolken.js")
	,	matchpath = "^/"+fpath+"/";
	
	wolken.init(request,response);
	if (uri.match(matchpath)) {
		try {
			wolken.run(uri);
		}
		catch(Ex ){
			response.writeHead(500, {
				"Content-Type": "text/plain"
			});
			response.write(Ex.stack + "\n");
			response.end();
		}
		return;
	}
	else path.exists(filename, function(exists) {
		if(!exists) {
			response.writeHead(404, {
				"Content-Type": "text/plain"
			});
			response.write("404 Not Found\n"+uri+"\n");
			response.end();
			return;
		}

		if (fs.statSync(filename).isDirectory()) filename += '/index.html';

		fs.readFile(filename, "binary", function(err, file) {
			if(err) {
				response.writeHead(500, {
					"Content-Type": "text/plain"
				});
				response.write(err + "\n");
				response.end();
				return;
			}
			try
			{
				fs.stat(filename,function(err,stat){
					if(err) {
						throw err;
					}
					var etag = '"'+stat.ino+"-"+stat.size+"-"+ Date.parse(stat.mtime)+'"';
			
					if (etag == request.headers['if-none-match'])	{
						response.statusCode=304;
					}
					else {
						response.writeHead(200, {
							"Content-Type": mime.lookup(filename),
							"Last-Modified": stat.mtime,
							"Cache-Control": 'max-age=120',
							"ETag":etag
						});
						response.write(file, "binary");
					}
					response.end();
			
				});
			}
			catch(ex)
			{
				response.writeHead(500, {
					"Content-Type": "text/plain"
				});
				response.write(ex + "\n");
				response.end();
				return;
			}
		// console.log("200 "+filename+ " "+ file.length)
		});
	});
}).listen(parseInt(port, 10));

console.log("Static file server running at\n => http://localhost:" + port + "/\nCTRL + C to shutdown");

