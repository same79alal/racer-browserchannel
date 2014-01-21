var racer = require('racer');

racer.Model.prototype._createSocket = function(bundle) {
  var options = bundle.racerWebSocket;
  var url =  ( bundle.mount || location.origin.replace(/^http/, 'ws') ) + (options.base || '/channel');
  if (options && ( Array.isArray(options) || 'string' == typeof options)){
  	return new WebSocket(url, options);  	
  }
  else {
  	return new WebSocket(url);  	
  }
};
