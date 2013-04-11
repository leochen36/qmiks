/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
// server
(function(Q) {
	// 加载其它模块
	require("./Qmiks.Log");
	var uuid = require("./Qmiks.Util.uuid");
	// Util静态类
	function Util() {
	}
	Q.extend(Util, {
		uuid : uuid
	})
	module.exports = Util;
	// 加载并关联类
})(require("./Qmiks"));