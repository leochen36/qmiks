/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008 http服务: 名称: 过滤器 路油器
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
	var zlib = require("zlib");
	var Buffer = require("buffer").Buffer;
	// 框架组件
	require("./Qmiks.Server.Http._init");
	var Server = require("./Qmiks.Server");
	var Log = require("./Qmiks.Log");
	var Config = require("./Qmiks.Server.Http.Config");
	var Cookie = require("./Qmiks.Server.Http.Cookie");
	var Response = require("./Qmiks.Server.Http.Response");
	var Request = require("./Qmiks.Server.Http.Request");
	var Util = require("./Qmiks.Util");
	var Cache = Util.Cache;
	// /////////////////////////////////////////////
	// 运行变量
	var log = new Log("Qmiks.Server.Http");
	var separator = Q.getSeparator(); // 目录分隔符
	var cacheStatic = new Cache();// 静态文件缓存
	var cacheGzipStatic = new Cache();// 静态文件缓存
	var filters = []; // 过滤器列表
	var routers = []; // 路油器列表
	var cwd = process.cwd(); // 执行路径
	var argv = process.argv; // 启动参数
	var mainJS = argv[1]; // 执行主js
	var runDir = mainJS.substring(0, mainJS.lastIndexOf(separator)); // 工程运行目录
	runDir = runDir.substring(0, runDir.lastIndexOf(separator)) + separator + "web";
	/* 添加过滤器 */
	function addFilter(key, fun, opts) {
		var ft = getFilter(key), nfun = function(req, res, filterChain) {
			fun.apply(fun, [
				req, res, filterChain
			]);
		};
		if (ft) {
			ft.list.push(nfun);
		} else {
			filters.push( {
				key : key,
				list : [
					nfun
				],
				rule : opts.rule,
				ruleType : opts.ruleType,
				option : Q.extend( {}, opts)
			});
		}
	}
	/* 取得过滤器 */
	function getFilter(key) {
		for ( var i = 0; i < filters.length; i++) {
			if (filters[i].key == key) return filters[i];
		}
	}
	/* 取得所有符合此url验证规则的过滤器处理方法 */
	function getAllFilterFun(url) {
		var list = [], i, _ft;
		for (i = 0; i < filters.length; i++) {
			_ft = filters[i];
			if (_ft.ruleType == "regexp" && _ft.rule.test(url)) {
				for ( var k in _ft.list) {
					list.push(_ft.list[k])
				}
			} else if (_ft.rule == url) {
				for ( var k in _ft.list) {
					list.push(_ft.list[k])
				}
			}
		}
		return list
	}
	/* 添加路油器 */
	function addRouter(keyRegexp, fun, opts) {
		var nopts = Q.extend( {
			method : "ALL"
		}, opts), key = keyRegexp.toString();
		if (nopts.ruleType == "string") {
			key = nopts.rule;
		}
		for ( var i = routers.length - 1; i >= 0; i--) {
			if (routers[i].key == key) {
				log.info("the router[" + key + "] too many! remove  the extra");
				routers.splice(i, 1);
			}
		}
		routers.push( {
			key : key,
			rule : opts.rule,
			ruleType : opts.ruleType,
			option : nopts,
			router : function(req, res) {
				fun.apply(fun, [
					req, res
				]);
			}
		});
	}
	function _500(server, url, req, res, error) {
		try {
			var page = server.page500();
			var content;
			res.setStatus(500);
			res.addHeader(Response.CONTENT_TYPE, 'text/html;charset=' + server.getCharset());
			if (page) {
				if (Q.isFun(page)) {
					page(req, res, error);
				} else {
					var errorPage = runDir + page;
					try {
						content = fs.readFileSync(errorPage, "utf8");
						res.write(content);
						delete errorPage;
					} catch (e) {
						res.write(error.stack);
					}
				}
			} else {
				res.write(error.stack);
			}
			res.end();
			delete content;
			delete page;
		} catch (e) {
			log.log("[ERROR][" + e.stack + "]");
		}
	}
	function _404(server, url, req, res, mimeType) {
		var page = server.page404();
		mimeType = mimeType || 'text/html';
		if (page) {
			if (Q.isFun(page)) {
				page(req, res);
			} else {
				var errorPage = runDir + page;
				try {
					file = fs.readFileSync(errorPage, "utf8");
					res.write(file);
				} catch (e) {
					res.setStatus(404);
					res.addHeader(Response.CONTENT_TYPE, mimeType + ";charset=" + server.getCharset());
					res.write("找不到文件");
				}
			}
		} else {
			res.setStatus(404);
			res.addHeader(Response.CONTENT_TYPE, mimeType + ";charset=" + server.getCharset());
			res.write("找不到文件");
		}
		res.end();
	}
	function isSupportGzip(req) {
		return req.getHeader(Request.ACCEPT_ENCODING).indexOf("gzip") > -1;
	}
	// 缓存请求文件,304返回状态码
	function _304(req, res, mimeType, content) {
		var isCache = false;
		// 是否有etag标识,没有就返回false,不做取浏览器缓存处理
		var etag = req.getHeader(Request.IF_MODIFIED_SINCE);
		if (etag == content.eTag) {
			isCache = true;
		}
		// 看是否有IF_MODIFIED_SINCE,没有主水做验证,有就做验证
		var ifModifiedSince = req.getHeader(Request.IF_MODIFIED_SINCE);
		if (ifModifiedSince) {
			ifModifiedSince = new Date(ifModifiedSince);
			if (ifModifiedSince.getTime() == content.lastModifed.getTime()) {
				isCache = true;
			} else {
				isCache = false;
			}
		}
		if (isCache) {
			res.setStatus(304);
			res.addHeader(Response.CONTENT_TYPE, mimeType);
			res.addHeader(Response.ETAG, etag);
			res.end();
			return true;
		}
		return false;
	}
	// 静态文件处理
	function staticFile(server, url, req, res) {
		if (url == "/" || url == "") {
			url = separator + server.getWelcome();
		}
		var sIdx = url.lastIndexOf(".");
		if (sIdx < 0) return false;
		var suffix = url.substring(sIdx + 1, url.length);// 访问的文件类型,值为(js,html,css等)
		var filePath = runDir + url;
		var content;
		var suf = Config.mimeMapping[suffix];
		var isGzip = isSupportGzip(req);
		var isCache = !Q.isNull(Config.cache[suffix]);
		if (suf == null) return false;
		try {
			// var key = Q.encode(filePath);
			var key = filePath;
			if (isGzip) {
				// content = cacheGzipStatic.get(key);
				content = cacheStatic.get(key);
			} else {
				content = cacheStatic.get(key);
			}
			// 缓存里没有此文件的缓存,从磁盘读取
			if (Q.isNull(content)) {
				// 异步读取
				content = {};
				fs.stat(filePath, function(error, stat) {
					if (Q.isNull(error)) {
						content.lastModifed = stat.mtime;
						content.eTag = (stat.mtime.getTime() / 1000) >>> 8;
						if (_304(req, res, suf.mimeType, content)) { return true; }
						// 需要把内容缓存到内存里
						if (isCache) {
							fs.readFile(filePath, function(err, data) {
								if (Q.isNull(err)) {
									content.value = data;
									cacheStatic.set(key, content);
									res.setStatus(200);
									res.addHeader(Response.CONTENT_TYPE, suf.mimeType);
									res.addHeader(Response.EXPIRES, (new Date(Q.time() + 30 * 24 * 60 * 60 * 1000)).toUTCString());
									res.addHeader(Response.ETAG, content.eTag);
									res.write(content.value);
									res.end();
								} else {
									_404(server, url, req, res, suf.mimeType);
								}
							});
						} else {
							cacheStatic.set(key, content);
							res.setStatus(200);
							res.addHeader(Response.CONTENT_TYPE, suf.mimeType);
							res.addHeader(Response.EXPIRES, (new Date(Q.time() + 30 * 24 * 60 * 60 * 1000)).toUTCString());
							res.addHeader(Response.ETAG, content.eTag);
							var raw = fs.createReadStream(filePath);
							raw.pipe(res);
						}
					} else {
						_404(server, url, req, res, suf.mimeType);
					}
				});
			} else {
				// 从内存里读取
				var etag = req.getHeader("If-None-Match".toLowerCase());
				// 如果浏览器不支持etag模式,就增加使用Last-Modified,实现缓存
				if (Q.isNull(etag)) {
					res.addHeader("Last-Modified", content.lastModifed.toUTCString());
				}
				if (_304(req, res, suf.mimeType, content)) { return true; }
				res.setStatus(200);
				res.addHeader(Response.CONTENT_TYPE, suf.mimeType);
				res.addHeader(Response.EXPIRES, (new Date(Q.time() + 30 * 24 * 60 * 60 * 1000)).toUTCString());
				res.addHeader(Response.ETAG, content.eTag);
				// 有缓存,从缓存里读取
				if (isCache) {
					res.write(content.value);
					res.end();
				} else {
					// 从硬盘读取
					var raw = fs.createReadStream(filePath);
					raw.pipe(res);
				}
				delete sIdx, suffix;
			}
		} catch (e) {
			log.error(e);
			_404(server, url, req, res, suf.mimeType);
		}
		return true;
	}
	/* 执行相关路油器,根据url找出相关路油器并执行 */
	function execRouter(url, method, req, res) {
		for ( var k = 0; k < routers.length; k++) {
			if (routers[k].option.method == "ALL" || routers[k].option.method == method) {
				if (routers[k].option.ruleType == "regexp" && routers[k].rule.test(url)) {
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
			if (str == "/" || str == "*") { return /.*/i }
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
		me.on("request", function(_req, _res) {
			try {
				var res = new Response(_res);
				var req = new Request(_req);
				res.getRequest = function() {
					return req
				};
				req.getResponse = function() {
					return res
				};
				req.getSessionId();
				Object.seal(req);// 密封req对象
				res.setStatus(200);
				var url = req.getRequestURL();
				var method = req.getMethod();
				var execCount = 0;
				// 取得所有的过滤方法
				var execList = getAllFilterFun(url) || [];
				function nextFilter(req, res) {
					for ( var i = execCount; i < execList.length; i++) {
						execCount++;
						execList[i](req, res, nextFilter);
						break
					}
					if (execCount == execList.length) {
						execCount = 0;
						// 执行内部最优先组的静态文件路油器,如果返回true,就不执行应用层配置的路油器.
						if (topDealRouter(me, url, req, res)) { return; }
						// 执行路油器
						if (!execRouter(url, method, req, res)) {
							// 如果路油器没有匹配的,
							_404(me, url, req, res);
						}
					}
				}
				console.log("000>>" + method + "," + (Request.METHOD_POST == method))
				if (Request.METHOD_POST == method) {
					// post方法请求
					req.once("data", function(data) {
						try {
							nextFilter(req, res);
						} catch (e) {
							log.log("[ERROR][" + e.stack + "]");
							_500(me, url, req, res, e);
						}
					})
				} else {
					// 非port方法请求
					nextFilter(req, res);
				}
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
				addFilter(regexp, fun, Q.extend( {
					ruleType : "string",
					rule : reg
				}, opts))
			} else if (Q.isRegExp(reg)) {
				addFilter(regexp, fun, Q.extend( {
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
				addRouter(regexp, fun, Q.extend( {
					ruleType : "string",
					rule : regexp
				}, opts))
			} else if (Q.isRegExp(reg)) {
				addRouter(regexp, fun, Q.extend( {
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
		getWelcome : function(file) {
			if (file) {
				this._welcome = file;
			} else {
				return this._welcome;
			}
		},
		// 设置或取得编码,默认UTF8
		getCharset : function() {
			return this._charset || "utf8";
		},
		setCharset : function(charset) {
			this._charset = charset || "utf8";
		}
	});
	module.exports = Q.Server.Http;
})(require("./Qmiks"));