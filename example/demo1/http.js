(function() {
	var http = require("http");
	http.createServer(function(request, response) {
		response.writeHead(200, {
			"Content-Type" : "text/javascript"
		});
		console.log(request.url)
		response.write('jsonp1({"name":"leo","age":11})')
		;
		response.end();
	}).listen(8700);
	console.log("----port:8700");
})();
