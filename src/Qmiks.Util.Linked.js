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
	function Linked() {
		var me = this;
		me.length = 0;
	}
	function Node(value){
		var me=this;
		me._next=null;
		me._pre=null;
		me._value=value;
	}
	Q.extend(Linked.prototype, {
		get : function(index) {
			var me=this;
			var node=me._first;
			var i=0;
			while(node){
				if(i==index)return node.getValue();
				i++;
				node=node.getNext();
			}
			return this._list[idx]
		},
		add : function(key) {
			var node=new Node(key);
			if(Q.isNull(this._first)){
				this._first=node;
				this._last=node;
			}else{
				node._pre==this._last;
				this._last._last=node;
			}
			me.length++;
		},
		rm:function(index){
			
		},
		size:function(){
			return me.length;
		},
		getFirst:function(){
			return Q.isNull(this._first)?null:this._first.getValue();
		},
		getLast:function(){
			return Q.isNull(this._last)?null:this._last.getValue();
		}
	});
	Q.extend(Node.prototype, {
		getValue:function(){
			return this._value;
		},
		getNext:function(){
			return this._next;
		}
		getPre:function(){
			return this._pre;
		}
	});
	module.exports = Linked;
})(require("./Qmiks"));