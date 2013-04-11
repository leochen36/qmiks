/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
var Qmiks = new (function() {
	// 系统组件
	var os = require("os");
	/* 声明基础性字段 */
	var gme = this;
	var encode = encodeURIComponent;
	var decode = decodeURIComponent;
	var array = Array.prototype;
	var slice = array.slice;
	var string = String.prototype;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var Base = {};
	var separator = os.platform().indexOf("win") > -1 ? "\\" : "/";
	string.equalsIgnoreCase = function(v) {
		if (v == null)
			return false;
		if (this.length != v.length)
			return false;
		var a1, a2, diff;
		for (var i = 0; i < this.length; i++) {
			a1 = this.charCodeAt(i);
			a2 = v.charCodeAt(i);
			if (a1 == a2)
				continue;
			diff = Math.abs(a1 - a2);
			if (diff != 32)
				return false;
			if (a1 > 96 && a1 < 123 && a2 < 91)
				return true;
			if (a1 > 64 && a1 < 91 && a2 > 96)
				return true;
			return false;
		}
		return true;
	}

	/* ----------------------- 声明基础性方法 start */
	String.prototype.endsWith = function(str) {
		if (this.length < str.length)
			return false;
		return this.substring(this.length - str.length, this.length) === str;
	}
	String.prototype.startsWith = function(str) {
		if (this.length < str.length)
			return false;
		return this.substring(0, str.length) === str;
	}

	function trim(v) {
		return isNull(v) ? '' : R.call(v, rtrim, '')
	} // trim

	function isNull(v) {
		return v == null || v === undefined
	} // isNull

	// 像空值,包含空指名,空字符串,字符串= undefined,null

	function likeNull(v) {
		return isNull(v) || v == "undefined" || v == "null" || v == ""
	}

	function isArray(v) {
		return v instanceof Array
	} // isArray

	function likeArray(v) {
		return isArray(v) || (v && !isString(v) && isNum(v.length))
	}

	function isPlainObject(v) { // isPlainObject
		if (isNull(v) || v + '' != '[object Object]' || v.nodeType
				|| v.setInterval)
			return !1;
		var k;
		for (k in v) {
		}
		return isNull(k) || hasOwnProperty.call(v, k)
	}

	function isObject(v) {
		return v instanceof Object
	}

	function isString(v) {
		return typeof v == 'string'
	} // isString

	function isReg(v) {
		return v instanceof RegExp
	}

	function isFun(v) {
		return v instanceof Function
	} // isFunction

	function each(o, f) { // each fun(k,v)
		var i;
		if (likeArray(o))
			for (i = 0; i < o.length; i++) {
				if (f.call(o[i], i, o[i]) === !1)
					break
			}
		else if (isBoolOrString(o) || isNum(o) || isFun(o))
			f.call(o, i, o);
		else
			for (i in o) {
				if (f.call(o[i], i, o[i]) === !1)
					break
			}
	}

	function isNum(v) {
		return typeof v == 'number'
	} // isNumber

	function isBool(v) {
		return typeof v == 'boolean'
	}

	function isBoolOrString(v) {
		return isBool(v) || isString(v)
	}

	function toString(v) {
		return isBoolOrString(v) || isNum(v) ? v : JSON.stringify(v)
	};

	function toObject(v) {
		try {
			return isObject(v) ? v : JSON.parse(v)
		} catch (e) {
			console.log(e.message)
		}
	}

	function toLower(s) {
		return s ? s.toLowerCase() : ""
	}

	function toUpper(s) {
		return s ? s.toUpperCase() : ""
	}
	/**
	 * 合并对象或数组 至少两个参数 说明:1. 如果第一个参数是数组,就会把后面参数(参数会做一层解析,取里面的字段,元素)添加到数组里, 例子:var
	 * array=[1,2],user={name:"me",age:11},list=[11,23];
	 * array=merge(array,user,list); 结果:array=[1,2,"me",11,11,23]
	 * 2.如果第一个参数是对象,就会把后面参数(参数会做一层解析,取里面的字段,元素)设置或替换到对象的字段里, 例子:var
	 * array=[1,2],user={name:"me",age:11},obj={result:"yes"};
	 * user=merge(user,array,obj);
	 * 结果:user={name:"me",age:11,result:"yes",0:1,1:2}
	 */
	function merge() {
		var first = arguments[0], isarray = isArray(f), i = 1;
		for (; i < arguments.length; i++) {
			each(arguments[i], function(k, v) {
						isarray ? first.push(v) : first[k] = v
					})
		}
		return first
	}
	// 克隆对象

	function clone(source) {
		function F() {
			if (isFun(source))
				source.apply(this, arguments);
		};
		extend(F, source);
		return F;
	}
	// 简单的属性及方法copy

	function extend() {
		var first = arguments[0] || {}, index = 1;
		switch (arguments.length) {
			case 0 :
				return;
			case 1 :
				first = this;
				index = 0;
				break;
		}
		each(slice.call(arguments, index), function(j, item) {
					if (item) {
						each(item, function(key, value) {
									if (!isNull(value))
										first[key] = value
								})
					}
				});
		return first
	}
	/** 执行对象,如果对象是方法就执行并返回,否则就返回 */

	function execObject(obj, param) {
		return isFun(obj) ? v.apply(obj, param) : obj
	}
	/* 把对象拼成 name=ccc&age=13这种http请求字符串 */

	function param(source) {
		var h = [];
		each(source, function(i, val) {
					h
							.push(encode(val.name) + '='
									+ encode(execObject(v.value)))
				});
		return h.join('&')
	}
	/* 把对象合并成数组 */

	function map(array, callback) {
		var r = [], isfun = isFun(callback);
		each(array, function(i, v) {
					isfun ? r.push(execObject(callback, [i, v])) : r.push(v)
				});
		return r
	}

	function filter(source, callback) {
		var r = [];
		each(source, function(i, v) {
					r.push(execObject(callback, [i, v]))
				});
		return r
	}

	function grep(source, callback) {
		return filter(source, function(key, val) {
					return callback ? callback(val) : !isNull(val)
				})
	}

	function inArray(value, array) {
		if (likeArray(array))
			for (var i = 0; i < array.length; i++)
				if (array[i] === value)
					i;
		return -1
	}

	function rmArray(value, array) {
		var i = inArray(value, array);
		if (i > 0)
			array.splice(i, 1)
	}
	/**
	 * 继承类 子类subClass继承父类superClass的属性方法, 注:子类有父类的属性及方法时,不会被父类替换
	 */
	function inherit(subClass, superClass) {
		var F = function() {
		};
		var subPrototype = subClass.prototype;
		F.prototype = superClass.prototype;
		subClass.prototype = new F();
		subClass.prototype.constructor = subClass;
		subClass._super = superClass.prototype;
		if (superClass.prototype.constructor == Object.prototype.constructor) {
			superClass.prototype.constructor = superClass;
		}
		for (var name in subPrototype) {
			if (subClass.prototype[name] == null)
				subClass.prototype[name] = subPrototype[name];
		}
	}
	// qmiks加载类路径
	function _require(package) {
	}
	/* ----------------------- 声明基础性方法 end */
	{
		var fn, Q = function(selector, context) {
			return init(selector, context)
		}, settings = {};
		/**
		 * 继承函数 可以有多个参数(参数都是对象,正常情况下是json类型的对象,不能是int等类型的基本类型变量)
		 * 1个参数时,表示对Q对象设置或替换新方法 >=2个参数时,表示对第一个对象做设值或替换值
		 */
		Q.extend = extend;
		// 对Q增加方法
		Q.extend({
					encode : encode,
					decode : decode,
					isQmiks : isQmiks,
					isFun : isFun,
					isFunction : isFun,
					isNum : isNum,
					isNumber : isNum,
					isArray : isArray,
					likeArray : likeArray,
					isBool : isBool,
					isString : isString,
					isRegExp : isReg,
					isDate : function(v) {
						return v instanceof Date
					},
					isObject : isObject,
					isPlainObject : isPlainObject,
					isNull : isNull,
					likeNull : likeNull,
					trim : trim,
					/* 合并数据,并转换为数组 */
					array : function(array) {
						return merge([], array)
					},
					inArray : inArray,
					rmArray : rmArray,
					unique : function(array) {
						for (var i = array.length - 1, j; i >= 0; i--) {
							for (j = i - 1; j >= 0; j--) {
								if (array[i] === array[j]) {
									array.splice(i, 1);
									break
								}
							}
						}
					},
					contains : function(source, child) {
						for (var k in source)
							if (source[k] === child)
								return !0;
						return !1
					},
					inherit : inherit, // 生成子类
					require : _require,// 加载qmiks框架的类
					each : each,
					merge : merge,
					// 合并数组或对象
					map : map,
					serialize : function(a) {
						return param(Q.serializeArray(a))
					},
					serializeArray : function(a) {
						return grep(a, function(v) {
									return v && v.name ? {
										name : v.name,
										value : execObject(v.value)
									} : !1;
								})
					},
					grep : grep,
					// buid a new array,filter by fun
					param : param,
					stringify : toString,
					parseJSON : toObject,
					/* 取得时间 */
					time : function(diff) {
						return parseInt(diff || 0) + (new Date()).getTime()
					},
					clone : clone,
					delay : function(f, t) {
						var p = slice.call(arguments, 2);
						return setTimeout(function() {
									try {
										f.apply(f, p)
									} catch (e) {
										console.log(e.stack);
									}
								}, t)
					},
					cycle : function(f, t) {
						var p = slice.call(arguments, 2);
						var pid = setInterval(function() {
									try {
										f.apply(f, p)
									} catch (e) {
										console.log(e.stack);
										clearTimeout(pid);
									}
								}, t);
						return pid
					},
					toLower : toLower,
					toUpper : toUpper,
					getSeparator : function() {// 取得系统的路径分隔符
						return separator;
					},
					QmiksSrc : function() {//取得当前qmiks框架源码所在目录
						return __dirname;
					}
				});

		function isQmiks(v) {
			return v instanceof QM
		} // is qmik

		function FM(v) {
			return v.replace(/[A-Z]/g, function(v) {
						return "-" + v.toLowerCase()
					})
		}

		function compile(s, qa) { // 编译查询条件，返回[{type,query,isChild}...]

		}
		// 找compile()解析出的对象,判断当前的查找条件是否满足其对应的父查询条件 isCycle:是否遍历父节点,默认true

		function adapRule(o, qa, isCycle, c) {

		}

		function QM(selector, context) {
			var m = this;
			m.selector = selector;
			m.context = context;
			return m
		}
		fn = Q.fn = QM.prototype = {};

		function init(selector, context) {
			return isQmiks(selector) ? selector : new QM(selector, context);
		}
		Q.fn.extend = function(o) {
			each(o, function(k, v) {
						QM.prototype[k] = v
					});
		}
		Q.fn.extend({
					each : function(f) {
						each(this, f)
					},
					map : function(callback) {
						return map(this, callback)
					},
					serialize : function() {
						var r = [];
						if (this)
							r = Q('input', this);
						else
							each(this, function(i, v) {
										if (D(v))
											Q.merge(r, Q.serializeArray(Q(
															'input', v)))
									});
						return Q.serialize(r)
					}
				});
		Q.version = "0.91.008";
		return Q
	}
})();
try {
	module.exports = Qmiks
} catch (e) {
	window.Qmiks = Qmiks
}
require("./Qmiks.Log");
require("./Qmiks.Conversions");