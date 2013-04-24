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
	var Linked = require("./Qmiks.Util.Linked");
	function QLinked() {
		QLinked.apply(this, arguments);
	}
	Q.inherit(QLinked, Linked);
	Q.extend(QLinked.prototype, {
		getByValue : function(value) {
			var me = this;
			var node = me._first;
			var i = 0;
			while (node) {
				if (value == node.getValue) return value;
			}
			return null;
		}
	});
	function HashList() {
		var me = this;
		me._list = [];
		me.length = 0;
	}
	Q.extend(HashList.prototype, {
		get : function(value) {
			var hash = Q.isString(value) ? value.hashCode() : value.toString().hashCode();
			var idx = hash % 100000;
			if (Q.isNull(this._list[idx])) {
				this._list[idx] = new QLinked();
			}
			return this._list[idx].get(value);
		},
		add : function(value) {
			var hash = Q.isString(value) ? key.hashCode() : value.toString().hashCode();
			var idx = hash % 100000;
			if (Q.isNull(this._list[idx])) {
				this._list[idx] = new QLinked();
			}
			this._list[idx].add(value);
			return this;
		}
	});
	module.exports = Map;
})(require("./Qmiks"));