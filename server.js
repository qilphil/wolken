/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var Server_port = process.argv[2] || 8888,
fpath = "fn" ,
connect= require('connect');
var app = connect()
  .use(connect.logger('dev'))
  .use(connect.static('public'))
	.use(connect.directory('public'))
  .use(function(req, res){
    res.end('hello world\n');
  })
 .listen(Server_port);
console.log("Static file server running at\n => http://localhost:" + Server_port + "/\nCTRL + C to shutdown");

