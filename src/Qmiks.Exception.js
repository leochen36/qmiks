/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
// server
(function(Q) {
	// 加载框架组件
	var Log = require('./Qmiks.Log');
	// 加载系统组件
	var EventEmitter = require('events').EventEmitter;
	// 异常类
	function Exception() {
		var me = this;
		Error.apply(me, arguments);
	}
	Q.extend(Exception.prototype, {
		getStack : function() {
			return this.stack;
		},
		getName : function() {
			return this.name;
		},
		getMessage : function() {
			return this.message;
		}
	});
	Q.inherit(Exception, Error);
	module.exports = Exception;
})(require("./Qmiks"));