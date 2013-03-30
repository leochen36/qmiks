/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
(function() {

	require("./Http");
	require("./WebSocket");


	var querystring = require('querystring');
	var ss="name=key&name=leo&age=134";
	var pp=querystring.parse(ss);
	console.log(pp.name instanceof Array)
})();