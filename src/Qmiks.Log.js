/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
// server
(function(Q) {
	// 系统组件
	var EventEmitter = require('events').EventEmitter;

	function Log(cata) {
		var me = this;
		me._cata = cata;
		// debug=1,info=2,warn=3,error=5
		me.level = 5;
	}
	Q.extend(Log.prototype, {
				error : function(msg, e) {
					this.log(msg, e)
				},
				warn : function(msg, e) {
					this.log(msg, e)
				},
				debug : function(msg, e) {
					this.log(msg, e)
				},
				info : function(msg, e) {
					this.log(msg, e)
				},
				error : function(msg, e) {
					this.log(msg, e)
				},
				/* 等于 输出到debug+console */
				log : function(msg, e) {
					var m;
					// console.log("isEvent:" + (msg instanceof Events))
					if (msg instanceof Error) {
						console.log("is event")
						e = msg;
						m = e.stack;
						msg = "";
					} else {
						m = msg;
					}
					if (e) {
						m += "\r\n[" + e.stack + "]";
					}
					console.log(this._cata + "--" + m);
				},
				isDebug : function() {
					return this.level = 1;
				},
				isInfo : function() {
					return this.isDebug() || this.level == 2;
				},
				isWarn : function() {
					return this.isInfo() || this.level == 3;
				}
			});
	Q.Log = Log;
	module.exports = Log;
})(require("./Qmiks"));