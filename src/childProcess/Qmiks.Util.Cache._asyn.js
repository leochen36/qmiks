/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008 缓存
 */
// server
(function(Q) {
	// 加载系统组件
	var child_process = require('child_process');
	// 加载其它模块
	function Map() {
		var me = this;
		me._map = {};
		me.length = 0;
	}
	Q.extend(Map.prototype, {
		get : function(key) {
			return this._map[key];
		},
		put : function(key, value) {
			if (Q.isNull(key)) {
			}
			if (!this.hasOwnProperty(key)) {
				this.length++;
			}
			this._map[key] = value;
			return this;
		},
		set : function(key, value) {
			this.put(key, value);
		},
		rm : function(key) {
			this.length--;
			delete this._map[key];
		},
		size : function() {
			return this.length;
		},
		containsKey : function(key) {
			return this.get(key) != null;
		},
		// 迭代
		iterator : function(callback) {
			for ( var key in this._map) {
				callback.call(callback, key, this.get(key));
			}
		}
	});
	function Cache() {
		var me = this;
		me._keyValue = new Map();
		me._list = [];
		me._map = new Map();
		me.uuid = Util.uuid();
		me.getUuid = function() {
			return me.uuid;
		}
		function check() {
			Q.delay(function() {
				me.iterator(function(key, value) {
					me.get(key);
				});
				check();
			}, 6 * 1000);
		}
		// check();
	}
	var dfTimeout = 60;// 默认缓存时间,单位秒
	function getTime(diff) {
		diff = Q.isNull(diff) ? dfTimeout : diff;
		diff = parseInt(diff) * 1000;
		if (diff < 0) { return -1; }
		return Q.time(diff);
	}
	Q.extend(Cache.prototype, {
		get : function(key) {
			var val = this._keyValue.get(key);
			if (Q.isNull(val)) { return null; }
			// 缓存不失效
			if (val.timeout < 0) { return val.value; }
			var curTime = getTime(0);
			if (val.timeout > curTime) {
				return val.value;
			} else {
				this.rm(key);
				return null;
			}
		},
		// 设置缓存key-value,timeout的单位秒
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
	var caches = new Map();
	process.on('message', function(m) {
		console.log('CHILD got message:', m);
	});
	process.send( {
		foo : 'bar'
	});
})(require("../Qmiks"));