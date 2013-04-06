/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008 缓存
 */
// server
(function(Q) {
	// 加载其它模块
	require("./Qmiks.Log");
	var Util = require("./Qmiks.Util");
	var Map = require("./Qmiks.Util.Map");

	function Cache() {
		var me = this;
		me._keyValue = new Map();
		me._list = [];
		me._map = new Map();
		// me.
		Q.cycle(function() {
					me.iterator(function(key, value) {
								me.get(key);
							});
				}, 6 * 1000);
	}
	var timeout = 30;
	function getTime(diff) {
		diff = diff || timeout;
		return (new Date()).getTime() + diff;
	}
	Q.extend(Cache.prototype, {
				get : function(key) {
					var val = this._keyValue.get(key);
					var curTime = getTime(1);
					if (val.timeout < curTime) {
						return val.value;
					} else {
						this.rm(key);
						return null;
					}
				},
				set : function(key, value, timeout) {
					this._keyValue.put(key, {
								value : value,
								timeout : getTime(timeout)
							});
					return this;
				},
				rm : function(key) {
					this._keyValue.rm(key);
				},
				size : function() {
					return this._keyValue.size();
				},
				containsKey : function(key) {
					return this._keyValue[key] != null;
				},
				// 迭代
				iterator : function(callback) {
					this._keyValue.iterator(callback);
				}
			});
	// Q.inherit(Cache, Map);
	Q.Util.Cache = Cache;
	module.exports = Cache;

})(require("./Qmiks"));