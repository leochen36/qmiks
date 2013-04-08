/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 * 
 * http服务: 名称: 过滤器 路油器
 * 
 * 
 */
// server
(function(Q) {
	// 系统组件

	// 框架组件

	var Server = require("./Qmiks.Server");
	var Http = require("./Qmiks.Server.Http");
	var Log = require("./Qmiks.Log");
	var Config = require("./Qmiks.Server.Http.Config");
	var Header = {
		req : {
			IF_MODIFIED_SINCE : "if-modified-since" // 最后一次修改时间
		},
		res : {}
	}
	Http.Header = Header;
	module.exports = Header;
})(require("./Qmiks"));