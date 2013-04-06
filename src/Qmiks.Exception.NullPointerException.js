/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
// server
(function(Q) {
	// 加载框架组件
	var Log = require('./Qmiks.Log');
	var Exception = require('./Qmiks.Exception');

	// 加载系统组件
	var EventEmitter = require('events').EventEmitter;

	var log = new Log("Qmiks.Exception.NullPointerException");
	// 异常类
	function NullPointerException() {
		var me = this;
		Error.apply(me, arguments);
		log.error(me.getStack());
	}
	Q.extend(NullPointerException.prototype, {
				getStack : function() {
					return this.getName() + this.stack;
				},
				getName : function() {
					return "NullPointerException:";
				},
				getMessage : function() {
					return this.getName() + this.message;
				}
			});
	Q.inherit(NullPointerException, Exception);
	Q.Exception.NullPointerException = NullPointerException;
	module.exports = NullPointerException;
})(require("./Qmiks"));