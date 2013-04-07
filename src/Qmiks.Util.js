/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
// server
(function(Q) {
	// 加载其它模块
	require("./Qmiks.Log");
	Q.Util = {};
	var Queue = require("./Qmiks.Util.Queue");
	var Map = require("./Qmiks.Util.Map");
	var uuid = require("./Qmiks.Util.uuid");
	var Cache = require("./Qmiks.Util.Cache");
	var Set = require("./Qmiks.Util.Set");

	Q.extend(Q.Util, {
				uuid : uuid
			})

	module.exports = Q.Util;

})(require("./Qmiks"));