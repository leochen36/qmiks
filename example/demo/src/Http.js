/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
(function() {
	var fs = require("fs");
	var M = require("http").IncomingMessage;
	var Q = require("../lib/QmiksLib");
	console.log("load Qmik is OK");
	console.log("create http server");
	var server = Q.Server.createHttp();
	var log = new Q.Log("http.start");
	log.log("create http server success");
	var m = new Error("afdfd");
	for ( var key in m) {
		log.log(key + ":" + Q.isFun(m[key]))
	}
	var os = require("os");
	var path = require("path");
	var Http = require("http");
	var Response = Http.ServerResponse;
	server.filter("*", function(req, res, next) {
		log.log("=======================================" + Q.time())
		var url = req.getRequestURL();
		log.log("url:" + url);
		for ( var key in req.getHeaders()) {
			//log.log(key + "--:" + req.getHeaders()[key])
		}
		log.log();
		next(req, res);
	});
	server.router("/abc", function(req, res) {
		res.addCookie("mgo1", "qqw");
		res.addHeaders( {
			"Content-Type" : "text/text"
		// ,"Set-Cookie":["kuyd=abc", "mena=cc", "mena1=ee"]
		});
		// log.log(req.getHeader("Cache-Control"))
		// log.log(req.headers["cache-control"])
		// for (var key in req.headers) {
		// log.log(key + ":" + req.headers[key])
		// }
		// console.log("enter router");
		// log.log("req cookies:"+req.getCookies())
		// res.writeHeader("\r\nSet-Cookie:", "trackerqqq=direct;");
		// res.writeHeader("\r\nSet-Cookie:", "accc=direct;");
		// res.writeHead("\r\nSet-Cookie", ["kuyd=abc", "mena=cc", "mena1=ee"]);
		// res.writeHead("\r\nSet-Cookie:", "acccaa=direct;");
		// res.addCookie("kuy", "11",300)
		// res.addCookie("kuy1", "11",300)
		// res.addCookie("mgo", "likeyou")
		//
		res.write("http request :" + Q.time());
		// res.rmCookie("mgo1")
		// res.writeHead(res.statusCode, {
		// "Set-Cookie":["kuyd33=abc", "mena33=cc", "mena133=ee"]
		// });
		res.end();
		// log.log("---:"+res._header)
		// console.log(res._header);
	});
	server.router("/abc/user", function(req, res) {
		// console.log("enter router /abc/user");
		res.addHeaders( {
			"Content-Type" : "text/text"
		});
		res.write("Hello World!");
		res.write("/abc/user :" + Q.time());
		res.end();
	});
	server.get("/abc/get", function(req, res) {
		// console.log("enter router get /abc/get");
		res.addHeaders( {
			"Content-Type" : "text/text"
		});
		res.write("Hello World to get!");
		res.write("/abc/get :" + Q.time());
		res.end();
	});
	server.filter(/\S*[.](js)/, function(req, res) {
	});
	server.get(/\S*[.](html|htm)/, function(req, res) {
	});
	server.get("/ws", function(req, res) {
	});
	var port = 8100;
	server.listen(port);
	server.on("connection", function() {
		// console.log("connection--------------------------------------------------");
	})
	server.on("request", function() {
		// console.log("request--------------------------------------------------");
	})
	server.on("upgrade", function() {
		console.log("upgrade--------------------------------------------------");
	})
	console.log("http port:" + port)
})();