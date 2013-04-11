/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
// server
(function(Q) {
	// 加载框架模块
	var Log = require("./Qmiks.Log");
	function Queue() {
		var me = this;
		me._queue = [];
	}
	Q.extend(Queue.prototype, {
		// 检索并移除头
		pop : function() {
			return this._queue.shift();
		},
		// 检索,不移除头
		peek : function() {
			return this.size() > 0 ? this._queue[0] : null;
		},
		add : function(value) {
			this._queue.push(val);
			return this;
		},
		size : function() {
			return this._queue.length;
		},
		isEmpty : function() {
			return this.size() < 1;
		},
		rm : function(value) {
			for ( var i = 0; i < this.size(); i++) {
				if (this._queue[i] === value) {
					this._queue.splice(i, 1);
					break;
				}
			}
		},
		contains : function(value) {
			for ( var i = 0; i < this.size(); i++) {
				if (this._queue[i] === value) { return true; }
			}
			return false;
		},
		// 迭代
		iterator : function(callback) {
			for ( var i = 0; i < this.size(); i++) {
				callback(i, this._queue[i]);
			}
		},
		clear : function() {
			delete me._queue;
			me._queue = [];
		}
	});
	module.exports = Queue;
})(require("./Qmiks"));