/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var wolken =  {
	run: function(path) {
		response.write("error");
		this.response.writeHead(200);
		this.response.write(path + " hduhu");
		this.response.end();
		
		return;
	},
	request:{},
	response:{},
	init:function(rq,rsp) {
		this.request = rq;
		this.response = rsp;
	}
};
module.exports = wolken;
	