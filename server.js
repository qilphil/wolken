/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var Server_port = process.argv[2] || 8888,
fpath = "fn" ,
express= require('express');
var app = express.createServer();
app.configure(function(){
	app.use(express.logger('dev'));
	app.use(express.static('public'));
	app.use(express.directory('public'));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get("/ajax/:command",function(req,res){
	res.send("Command: "+req.params.command);
});
app.use(function(req, res){
	res.statusCode=404;
	res.end('404 Not Found\n'+req.url);
}).listen(Server_port);

console.log("Static file server running at\n => http://localhost:" + Server_port + "/\nCTRL + C to shutdown");

