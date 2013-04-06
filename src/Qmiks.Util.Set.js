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

	function Set() {
		var me = this;
		me._set = {};
		me.length = 0;
	}
	Q.extend(Set.prototype, {

				add : function(key) {
					if (!this.hasOwnProperty(key)) {
						this.length++;
					}
					this._map[key] = null;
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
	Q.Util.Set = Set;
	module.exports = Set;

})(require("./Qmiks"));