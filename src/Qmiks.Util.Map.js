/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
// server
(function(Q) {
	// 加载其它模块
	require("./Qmiks.Log");
	require("./Qmiks.Util");
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
	Q.Util.Map = Map;
	module.exports = Map;
})(require("./Qmiks"));