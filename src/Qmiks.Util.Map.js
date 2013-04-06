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
					if (this._map[key] == null) {
						this.length++;
					}
					this._map[key] = value;
					return this;
				},
				rm : function(key) {
					this.length--;
					delete this._map[key];
				},
				size : function() {
					return this.length;
				},
				containsKey : function(key) {
					return this._map[key] != null;
				},
				// 迭代
				iterator : function(callback) {
					for (var key in this._map) {
						callback(key, this._map[key]);
					}
				}
			});
	Q.Util.Map = Map;
	module.exports = Map;

})(require("./Qmiks"));