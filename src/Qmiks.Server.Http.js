/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 * 
 * http服务: 名称: 过滤器 路油器
 * 
 * 
 */
// server
(function(Q) {
	// 系统组件
	var fs = require("fs");
	var Http = require("http");
	var os = require("os");
	var HttpServer = Http.Server;
	var IncomingMessage = Http.IncomingMessage;
	var querystring = require('querystring');

	// 框架组件
	var Server = require("./Qmiks.Server");
	var Log = require("./Qmiks.Log");
	var Config = require("./Qmiks.Server.Http.Config");
	require("./Qmiks.Server.Http._init");
	var log = new Log("Qmiks.Server.Http");
	var File = {
		separator : os.platform().indexOf("win") > -1 ? "\\" : "/"

	}

	// 声明变量
	var separator = File.separator, // 目录分隔符
	filters = [], // 过滤器列表
	routers = [], // 路油器列表
	cwd = process.cwd(), // 执行路径
	argv = process.argv, // 启动参数
	mainJS = argv[1], // 执行主js
	runDir = mainJS.substring(0, mainJS.lastIndexOf(separator)) // 工程运行目录
	;
	runDir = runDir.substring(0, runDir.lastIndexOf(separator)) + separator
			+ "web";
	/* 添加过滤器 */

	function addFilter(key, fun, opts) {
		var ft = getFilter(key), nfun = function(req, res, filterChain) {
			fun.apply(fun, [req, res, filterChain]);
		};
		if (ft) {
			ft.list.push(nfun)
		} else {
			filters.push({
						key : key,
						list : [nfun],
						rule : opts.rule,
						ruleType : opts.ruleType,
						option : Q.extend({}, opts)
					})
		}
	}
	/* 取得过滤器 */

	function getFilter(key) {
		for (var i = 0; i < filters.length; i++) {
			if (filters[i].key == key)
				return filters[i]
		}
	}
	/* 取得所有符合此url验证规则的过滤器处理方法 */

	function getAllFilterFun(url) {
		var list = [], i, _ft;
		for (i = 0; i < filters.length; i++) {
			_ft = filters[i];
			if (_ft.ruleType == "regexp" && _ft.rule.test(url)) {
				for (var k in _ft.list) {
					list.push(_ft.list[k])
				}
			} else if (_ft.rule == url) {
				for (var k in _ft.list) {
					list.push(_ft.list[k])
				}
			}
		}
		return list
	}
	/* 添加路油器 */

	function addRouter(keyRegexp, fun, opts) {
		var nopts = Q.extend({
					method : "ALL"
				}, opts), key = keyRegexp.toString();
		if (nopts.ruleType == "string") {
			key = nopts.rule;
		}
		for (var i = routers.length - 1; i >= 0; i--) {
			if (routers[i].key == key) {
				log.info("the router[" + key + "] too many! remove  the extra");
				routers.splice(i, 1);
			}
		}
		routers.push({
					key : key,
					rule : opts.rule,
					ruleType : opts.ruleType,
					option : nopts,
					router : function(req, res) {
						fun.apply(fun, [req, res]);
					}
				});
	}

	function _500(server, url, req, res, error) {
		try {
			var page = server.page500();
			res.writeHead(500, {
						'Content-Type' : 'text/html;charset='
								+ server.charset()
					});
			if (page) {
				if (Q.isFun(page)) {
					page(req, res, error);
				} else {
					var errorPage = runDir + page;

					try {
						file = fs.readFileSync(errorPage, "utf8");
						res.write(file);
					} catch (e) {
						res.write(error.stack);
					}
				}
			} else {
				res.write(error.stack);
			}
			res.end();
		} catch (e) {

		}
	}

	function _404(server, url, req, res, mimeType) {
		var page = server.page404();
		if (page) {
			if (Q.isFun(page)) {
				page(req, res);
			} else {
				var errorPage = runDir + page;
				try {
					file = fs.readFileSync(errorPage, "utf8");
					res.write(file);
				} catch (e) {
					res.writeHead(404, {
								'Content-Type' : (mimeType || 'text/html')
										+ ';charset=' + server.charset()
							});
					res.write("找不到文件");
				}
			}
		} else {
			res.writeHead(404, {
						'Content-Type' : 'text/html;charset='
								+ server.charset()
					});
			res.write("找不到文件");
		}
		res.end();
	}
	// 静态文件处理

	function staticFile(server, url, req, res) {
		if (url == "/" || url == "") {
			url = separator + server.welcome();
		}
		var sIdx = url.lastIndexOf(".");
		if (sIdx < 0)
			return false;
		var suffix = url.substring(sIdx + 1, url.length), filePath = runDir
				+ url, file;
		var suf = Config.mimeMapping[suffix];
		if (suf == null)
			return false;
		try {
			file = fs.readFileSync(filePath, "utf8");
		} catch (e) {
			_404(server, url, req, res, suf.mimeType);
			return true;
		}
		res.writeHead(200, {
					'Content-Type' : suf.mimeType
				});
		res.write(file);
		res.end();
		return true;
	}

	/* 执行相关路油器,根据url找出相关路油器并执行 */

	function execRouter(url, method, req, res) {
		for (var k = 0; k < routers.length; k++) {
			if (routers[k].option.method == "ALL"
					|| routers[k].option.method == method) {
				if (routers[k].option.ruleType == "regexp"
						&& routers[k].rule.test(url)) {
					routers[k].router(req, res);
					return true;
				} else if (routers[k].rule == url) {
					routers[k].router(req, res);
					return true;
				}
			}
		}
		return false;
	}
	/** 把 /和* 转换成正则对象,其它的不转 */

	function transform(str) {
		if (Q.isString(str)) {
			if (str == "/" || str == "*") {
				return /.*/i
			}
		}
		return str;
	}

	Q.Server.createHttp = function(opts) {
		var server = new Q.Server.Http();
		return server;
	};
	// 顶级路油器,用于处理静态文件,对外部不开放

	function topDealRouter(server, url, req, res) {
		// 最顶级过滤器,用户处理静态文件
		return staticFile(server, url, req, res);
	}
	// 创建Http类,并继承http.Server类
	// /////////////////////////////////////////////////////////////////
	Q.Server.Http = function() {
		var me = this;
		HttpServer.apply(me, arguments);
		me.on("request", function(req, res) {
			try {
				res.getRequest = function() {
					return req
				};
				req.getResponse = function() {
					return res
				};
				req.getSessionId();
				Object.seal(req);// 密码req对象
				var url = req.getRequestURL(), method = req.method, execCount = 0;
				/*
				 * Log.log("path:" + path); Log.log("method:" + req.method);
				 * Log.log("httpVersion:" + req.httpVersion);
				 * Log.log("connection:" + req.connection);
				 */
				// 取得所有的过滤方法
				var execList = getAllFilterFun(url) || [];

				function execFilter(req, res) {
					for (var i = execCount; i < execList.length; i++) {
						execCount++;
						execList[i](req, res, execFilter);
						break
					}
					if (execCount == execList.length) {
						execCount = 0;
						// 回调处理
						if (topDealRouter(me, url, req, res)) {
							return;
						}
						// 执行路油器
						if (!execRouter(url, method, req, res)) {
							// 如果路油器没有匹配的,
							_404(me, url, req, res);
						}
					}
				}
				execFilter(req, res);

			} catch (e) {
				log.log("[ERROR][" + e.stack + "]");
				_500(me, url, req, res, e);
			}
		});
	};
	Q.inherit(Q.Server.Http, HttpServer);

	Q.extend(Q.Server.Http.prototype, {
		/**
		 * 添加过滤器(就是拦截器),同一规则,可以有多个过滤器,优先过滤器,再触发路油器 path:过滤路径(正则表达式)
		 * fun:如果符合过滤规则,触发方法 fun=function(req,res,next)
		 */
		filter : function(regexp, fun, opts) {
			var reg = transform(regexp);
			if (Q.isString(reg)) {
				addFilter(regexp, fun, Q.extend({
									ruleType : "string",
									rule : reg
								}, opts))
			} else if (Q.isRegExp(reg)) {
				addFilter(regexp, fun, Q.extend({
									ruleType : "regexp",
									rule : reg
								}, opts))
			} else {
				throw new Error("regexp type is error,please input RegExp or String")
			}
			return this
		},
		/**
		 * 添加路油器(类似java struct的 /abc.e 触发对应action ),同一规则,只能有一个路油器,最后添加的路油器,替换老的
		 * path:过滤路径(正则表达式) callback:如果符合过滤规则,触发方法
		 */
		router : function(regexp, fun, opts) {
			var reg = transform(regexp);
			if (Q.isString(reg)) {
				addRouter(regexp, fun, Q.extend({
									ruleType : "string",
									rule : regexp
								}, opts))
			} else if (Q.isRegExp(reg)) {
				addRouter(regexp, fun, Q.extend({
									ruleType : "regexp",
									rule : reg
								}, opts))
			} else {
				throw new Error("regexp type is error,please input RegExp or String")
			}
			return this
		},
		post : function(regexp, fun) {
			return this.router(regexp, fun, {
						method : "POST"
					})
		},
		get : function(regexp, fun) {
			return this.router(regexp, fun, {
						method : "GET"
					})
		},
		// 错误页面
		// page: 如果是url: 跳转到默认页面,如果是方法,用方法处理错误页面,page(req,res);
		page500 : function(page) {
			if (page) {
				this._page500 = page;
			} else {
				return this._page500;
			}
		},
		// 找不到页面
		page404 : function(page) {
			if (page) {
				this._page404 = page;
			} else {
				return this._page404;
			}
		},
		_welcome : "index.html",
		_page404 : "404.html",
		_page500 : "500.html",
		_charset : "utf8",
		// 欢迎页面
		welcome : function(file) {
			if (file) {
				this._welcome = file;
			} else {
				return this._welcome;
			}
		},
		// 设置或取得编码,默认UTF8
		charset : function(charset) {
			if (charset) {
				this._charset = charset || "utf8";
			}
			return this._charset;
		}
	});

	module.exports = Q.Server.Http;
})(require("./Qmiks"));