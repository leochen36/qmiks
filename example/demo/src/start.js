/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
(function() {
	var vars = require("../lib/vars");

	require("./Http");
	require("./WebSocket");

	var querystring = require('querystring');
	var ss = "name=key&name=leo&age=134";
	var pp = querystring.parse(ss);
	console.log(pp.name instanceof Array);



	var msg = {
		"url": "login",
		"etag": "xxx",
		"header": {
			"kkkey": "vvv"
		},
		"body": {
			"kkkey": "body-vvv"
		}
	};

	var net = require("net");


	var server = new net.Server();
	server.listen(8181);
	console.log('Server listening on ' +
		server.address().address + ':' + server.address().port);

	server.on('connection', function(sock) {
		console.log("cccccccccccccccccccccccccc")
		console.log('server CONNECTED: ' +
			sock.remoteAddress + ':' + sock.remotePort);
		// 其它内容与前例相同
		sock.write("dfsf");
		sock.on("data", function(data) {
			console.log("ser rec:", data.toString());
		})
	});


	var socket = new net.Socket();
	console.log(socket.constructor)

	msg = JSON.stringify(msg) + "\r\n\r\n";
	var client = net.connect(8089, function() { //'connect' listener
		console.log('client connected');
		//client.write(JSON.stringify(msg));
	});
	client.on('data', function(data) {
		console.log("client rec:" + data.toString());
	});
	client.on('end', function() {
		console.log('client disconnected');
	});
	client.write(msg);
})();