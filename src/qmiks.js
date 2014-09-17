/**
 * @author:leo
 * @email:cwq0312@163.com
 * @version:1.2.20
 */
(function() {
	var g = global;

	// 系统组件
	var os = require("os");
	/* 声明基础性字段 */
	var encode = encodeURIComponent;
	var decode = decodeURIComponent;
	var slice = [].slice; //
	var config = {
		src: "/src" //工程源代码目录
	};
	var separator = os.platform().indexOf("win") > -1 ? "\\" : "/"; //系统路径分隔符
	/* ----------------------- 声明基础性方法 start */
	Q.extend(String.prototype, {
		equalsIgnoreCase: function(v) {
			if (v == null) return false;
			if (this.length != v.length) return false;
			var a1, a2, diff;
			for (var i = 0; i < this.length; i++) {
				a1 = this.charCodeAt(i);
				a2 = v.charCodeAt(i);
				if (a1 == a2) continue;
				diff = Math.abs(a1 - a2);
				if (diff != 32) return false;
				if (a1 > 96 && a1 < 123 && a2 < 91) return true;
				if (a1 > 64 && a1 < 91 && a2 > 96) return true;
				return false;
			}
			return true;
		},
		hashCode: function() {
			var i = this._hash;
			var j = this.length;
			if (i == 0 && j > 0) {
				var k = 0;
				for (var l = 0; l < j; l++)
					i = 31 * i + this.charCodeAt(k++);
				this._hash = i;
			}
			return i;
		},
		endsWith: function(str) {
			if (this.length < str.length) return false;
			return this.substring(this.length - str.length, this.length) === str;
		},
		startsWith: function(str) {
			if (this.length < str.length) return false;
			return this.substring(0, str.length) === str;
		},
		trim: function() {
			return this.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "")
		},
		toLower: function() {
			return this.toLowerCase()
		},
		toUpper: function() {
			return this.toUpperCase()
		}
	});

	// 对Date的扩展，将 Date 转化为指定格式的String   
	// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
	// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
	// 例子：   
	// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
	// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
	Date.prototype.Format = function(fmt) { //author: meizz   
		var o = {
			"M+": this.getMonth() + 1, //月份   
			"d+": this.getDate(), //日   
			"h+": this.getHours(), //小时   
			"m+": this.getMinutes(), //分   
			"s+": this.getSeconds(), //秒   
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度   
			"S": this.getMilliseconds() //毫秒   
		};
		if (/(y+)/.test(fmt))
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}

	var g_path = process.argv[1];
	// define qmik object
	function Q(lib) {
		var file = g_path + "/" + config.src + "/" + lib;
		return require(file);
	}
	Q.extend = function() {
		var args = arguments,
			ret = args[0] || {},
			i = 1;
		switch (args.length) {
			case 0:
				return;
			case 1:
				ret = this;
				i = 0;
				break
		}
		each(slice.call(args, i), function(j, v) {
			v && each(v, function(key, val) {
				isNull(val) || (ret[key] = val)
			});
		});
		return ret
	}

	function grep(array, callback) {
		var ret = [];
		each(array, function(i, v) {
			(callback ? callback(i, v) : !isNull(v)) && ret.push(v)
		});
		return ret
	}
	// public function
	// ///////////////////////////////////////////////////////////////////
	// isNull
	function isNull(v) {
		return v == undefined || v == null
	}

	function likeNull(v) {
		return isNull(v) || (isString(v) && (v == "undefined" || v == "null" || v.trim() == ""))
	}
	// isString
	function isString(v) {
		return typeof v == 'string'
	}
	// isDom
	function isDom(v) {
		return v && v.nodeType == 1
	}
	// isArray
	function isArray(v) {
		return v instanceof Array
	}

	function likeArray(v) { // like Array
		return !isString(v) && (isArray(v) || (Q.isQmik && Q.isQmik(v)) || (function() {
			v += "";
			return v == "[object Arguments]" || v == "[object NodeList]" || v == "[object HTMLCollection]" || v == "[object StaticNodeList]"
		})())
	}
	// isFunction
	function isFun(v) {
		return v instanceof Function
	}

	function isError(v) {
		return v instanceof Error
	}

	function isObject(v) {
		return v instanceof Object
	}

	function each(obj, callback) { // each fun(k,v)
		var i;
		if (likeArray(obj)) {
			for (i = 0; i < obj.length; i++) {
				callback.call(obj, i, obj[i])
			}
		} else if (isObject(obj)) {
			for (i in obj) {
				callback.call(obj, i, obj[i])
			}
		}
	}
	// isNumber
	function isNum(v) {
		return typeof v == 'number'
	}

	function isBool(v) {
		return typeof v == 'boolean'
	}
	/*	function isBaseType(v) {
			return isBool(v) || isString(v) || isNum(v)
		}*/
	function toString(v) {
		return (isBool(v) || isString(v) || isNum(v)) ? v + "" : isFun(v) ? v.toString() : JSON.stringify(v)
	}
	// to json
	function toJSON(v) {
		return likeNull(v) ? "" : JSON.parse(v)
	}

	function isEvent(e) {
		return e instanceof Event;
	}

	function execObject(v) {
		return isFun(v) ? v() : v
	}

	function merge() { // merge array or object
		var args = arguments,
			array = args[0],
			isA = isArray(array),
			i = 1;
		for (; i < args.length; i++) {
			each(args[i], function(k, v) {
				isA ? array.push(v) : array[k] = v
			})
		}
		return array
	}
	//////////Delay class, function 实现setTimeout的功能
	function Delay(fun, time, params) {
		var me = this;
		me.pid = setTimeout(function() {
			fun.apply(null, params)
		}, time)
	}
	Q.extend(Delay.prototype, {
		stop: function() {
			clearTimeout(this.pid)
		}
	});
	///////////////
	///////////////////Cycle class
	function Cycle(fun, cycleTime, ttl, params) {
		var me = this,
			start = Q.now();

		function _exec() {
			if ((isNull(ttl) || Q.now() - start <= ttl)) {
				fun.apply(null, params);
				me._p = new Delay(_exec, cycleTime, params);
			}
		}
		me._p = new Delay(_exec, cycleTime, params);
	}
	Q.extend(Cycle.prototype, {
		stop: function() {
			this._p && this._p.stop()
		}
	});
	//////////////////////
	Q
		.extend({
			encode: encode,
			decode: decode,
			isDom: isDom,
			isBool: isBool,
			isString: isString,
			isFun: isFun,
			isFunction: isFun,
			isNum: isNum,
			isNumber: isNum,
			isArray: isArray,
			isNull: isNull,
			isError: isError,
			each: each,
			stringify: toString,
			parseJSON: toJSON,
			isEvent: isEvent,
			likeArray: likeArray,
			isDate: function(v) {
				return v instanceof Date
			},
			isObject: isObject,
			isPlainObject: function(v) { // isPlainObject
				if (isNull(v) || v + '' != '[object Object]') return !1;
				var k;
				for (k in v) {}
				return isNull(k) || Object.prototype.hasOwnProperty.call(v, k)
			},
			isRegExp: function(v) {
				return v instanceof RegExp
			},
			likeNull: likeNull,
			/**
			 * 继承类 子类subClass继承父类superClass的属性方法, 注:子类有父类的属性及方法时,不会被父类替换
			 */
			inherit: function(subClass, superClass) {
				function F() {}
				var subPrototype = subClass.prototype;
				F.prototype = superClass.prototype;
				subClass.prototype = new F();
				subClass.prototype.constructor = subClass;
				if (superClass.prototype.constructor == Object.prototype.constructor) {
					superClass.prototype.constructor = superClass;
				}
				for (var name in subPrototype) {
					subClass.prototype[name] = subPrototype[name];
				}
				for (var name in superClass) {
					subClass[name] = superClass[name];
				}
				subClass.superClass = superClass;
			},
			isInherit: function(subClass, superClass) {

			},
			trim: function(v) {
				return isNull(v) ? "" : isString(v) ? v.trim() : v.toString().trim()
			},
			toLower: function(v) {
				return v ? v.toLower() : v
			},
			toUpper: function(v) {
				return v ? v.toUpper() : v
			},
			// 合并数组或对象
			merge: merge,
			array: function(array) {
				return merge([], array)
			},
			inArray: function(value, array) {
				if (Q.likeArray(array))
					for (var i = 0; i < array.length; i++)
						if (array[i] === value) return i;
				return -1
			},
			unique: function(array) {
				var ret = [];
				each(array, function(i, value) {
					Q.inArray(value, ret) < 0 && ret.push(value)
				});
				return ret
			},
			/**
			 * 对数组里的内容,做部做一次数据映射转换,
			 * 例:
			 * var array=[1,2,3];
			 * array = Qmik.map(array,function(index,val){
			 * 	return index*val
			 * });
			 * console.log(array);//>>0,2,6
			 */
			map: function(array, callback) {
				var r = [],
					i = 0;
				for (; array && i < array.length; i++)
					isNull(array[i]) || r.push(callback(i, array[i]));
				/*each(array, function(i, val) {
					isNull(val) || r.push(callback(i, val));
				})*/
				return r
			},
			grep: grep,
			/**
			 * 抽取数组里面每个元素的name和value属性,转换成一个url形式(a=b&name=g)的字符串
			 */
			param: function(array) {
				var h = [];
				each(array, function(i, v) {
					isString(i) ? h.push(encode(i) + '=' + encode(execObject(v))) : v.name && h.push(encode(v.name) + '=' + encode(execObject(v.value)))
				});
				return h.join('&')
			},
			/**
			 * 当前时间
			 */
			now: function(d) {
				return (d || 0) + new Date().getTime()
			},
			// 延迟执行,==setTimeout
			/**
			 * target:apply,call的指向对象
			 */
			delay: function(fun, time) {
				//var params = slice.call(arguments, 2);
				return new Delay(fun, time, slice.call(arguments, 2))
			},
			// 周期执行
			/**
			 * fun:执行的方法
			 * cycleTime:执行的周期时间
			 * ttl:过期时间,执行时间>ttl时,停止执行,单位 ms(毫秒)
			 * target:apply,call的指向对象
			 */
			cycle: function(fun, cycleTime, ttl) {
				//var params = slice.call(arguments, 3);
				return new Cycle(fun, cycleTime, ttl, slice.call(arguments, 3));
			},
			log: function(msg, e) {
				if (config.debug) {
					try {
						console.log.apply(console, arguments);
					} catch (e) {}
				}
			},
			isIphone: function(UA) {
				return /iPhone OS/.test(UA)
			},
			isAndroid: function(UA) {
				return /Android/.test(UA)
			},
			isWP: function(UA) {
				return /Windows Phone/.test(UA)
			},
			isIE: function(UA) {
				return /MSIE/.test(UA)
			},
			/**
			 * is Firefox
			 */
			isFF: function(UA) {
				return /Firefox/.test(UA)
			},
			/**
			 * is Webkit
			 */
			isWK: function(UA) {
				return /WebKit/.test(UA)
			},
			isOpera: function(UA) {
				return /Opera/.test(UA)
			},
			config: function(opts, _config) {
				_config = arguments.length <= 1 ? config : (_config || {});
				var ret = _config;
				if (arguments.length < 1 || isNull(opts)) {} else if (!isObject(opts)) {
					ret = _config[opts]
				} else {
					each(opts, function(key, val) {
						isObject(val) && _config[key] ? Q.extend(_config[key], val) : (_config[key] = val)
					})
				}
				return ret
					//return (arguments.length < 1 || isNull(opts)) ? _config : isObject(opts) ? Q.extend(_config, opts) : _config[opts]
			},
			getSeparator: function() { // 取得系统的路径分隔符
				return separator;
			},
			execCatch: function(fun, args, error) {
				try {
					fun.apply(fun, args || []);
				} catch (e) {
					Q.log(e, e.stack);
					error && error(e);
				}
			}
		});
	each([
		Q.now
	], function(i, val) {
		val.toString = val
	});
	///////////////////////////////////////////////////////
	Q.version = "1.0.0";
	g.Qmiks = Q;
	g.Q = g.$ = Q;
	module.exports = Q;
})();