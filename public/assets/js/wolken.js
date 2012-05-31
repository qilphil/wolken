"use strict";
var app={
  masterurl: window.location.protocol+"//"+window.location.host+"/ajax/",
	runit:function(){
		console.log(window.location);
		$("#heroheader").html("Started!");
	}

	
	
};
app.events = {
			"#runbutton": {click:app.runit}
};

$(function() {
	for(var event_element in app.events){
		$(event_element).on(app.events[event_element]);
	}
})