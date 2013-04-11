/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
// server
(function(Q) {
	// 加载其它模块
	require("./Qmiks.Log");
	Q.Server = {};
	// 加载子模拟
	var Http = require("./Qmiks.Server.Http");
	var WebSocket = require("./Qmiks.Server.WebSocket");
	var http, webSocket;
	Q.extend(Q.Server, {
		createHttp : function() {
			if (http) return http;
			http = new Http();
			return http;
		},
		createWebSocket : function() {
			if (webSocket) return webSocket;
			webSocket = new WebSocket();
			return webSocket;
		},
		getHttp : function() {
			return http;
		},
		getWebSocket : function() {
			return webSocket;
		}
	})
	module.exports = Q.Server;
})(require("./Qmiks"));