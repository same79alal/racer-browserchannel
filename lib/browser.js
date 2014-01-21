var racer = require('racer');

racer.Model.prototype._createSocket = function(bundle) {
  var options = bundle.racerWebSocket;
  var url =  ( bundle.mount || location.origin.replace(/^http/, 'ws') ) + (options.base || '/channel');
  var ws;
  if (options && ( Array.isArray(options) || 'string' == typeof options)){
  	ws = new WebSocket(url, options);  	
  }
  else {
  	ws = new WebSocket(url);  	
  }

  ws.WebSocketSend = ws.send;
  ws.sendQueue = [];

  ws.send = function (msg){
  	this.sendQueue.push(msg);
  	if (this.readyState==1){
  		var m;
  		while( m=this.sendQueue.shift() )
  			this.WebSocketSend(m);
  	}
  }

  return ws;
};
