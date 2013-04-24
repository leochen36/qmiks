/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008 缓存
 */
// server
(function(Q) {
	// 加载系统组件
	var child_process = require('child_process');
	// 加载框架模块
	var Log = require("./Qmiks.Log");
	var Cache = require("./Qmiks.Util.Cache.Sync");
	function QCache() {
		var me = this;
		Cache.apply(me, arguments);
		me._keys = [];
		function check() {
			Q.delay(function() {
				var index = parseInt((Math.random() * me._keys.length));
				var key = me._keys[index];
				if (Q.isNull(me.get(key))) {
					me._keys.splice(index, 1);
				}
				check();
			}, 10);
		}
	}
	Q.inherit(QCache, Cache);
	var cp = child_process.fork(Q.getQmiksSrc() + Q.getSeparator() + 'childProcess/Qmiks.Util.Cache._asyn.js');
	cp.on('message', function(m) {
		console.log('PARENT got message:', m);
	});
	console.log("0000000000000")
	module.exports = Cache;
})(require("./Qmiks"));