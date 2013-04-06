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
	var Response = Http.ServerResponse;
	var IncomingMessage = Http.IncomingMessage;
	var querystring = require('querystring');

	// 框架组件
	var Server = require("./Qmiks.Server");
	var Log = require("./Qmiks.Log");
	var Config = require("./Qmiks.Server.Http.Config");
	var Util = require("./Qmiks.Util");
	var Map = require("./Qmiks.Util.Map");
	var Cookie = require("./Qmiks.Server.Http.Cookie");

	var log = new Log("Qmiks.Server.Http");
	var File = {
		separator : os.platform().indexOf("win") > -1 ? "\\" : "/"

	}

	var sessionIdName = "JSESSIONID";
	var timeout = 7 * 24 * 60 * 60;
	var session = new Map();
	// http请求类(Request)增加方法
	Q.extend(IncomingMessage.prototype, {
				// sessionIdName
				getSessionId : function() {
					var sid = this.cookies()[sessionIdName];
					// 如果sessionId为空,(用户初次登录,或清理过cookie)
					if (sid == null) {
						sid = Util.uuid();// 生成一个uuid当 sessionId
						var obj = new Map();// 用户的会话信息
						session.put(sid, obj);// 把用户会话信息,扔到队列里
						this.getResponse().addSession(sid);
					}
					return sid;
				},
				// 取session
				getSession : function() {
					var sid = this.getSessionId();
					var obj = session.get(sid);
					if (obj == null) {
						obj = new Map();
						session.push(sid, obj);
					}
					return obj;
				},
				// 所有cookies
				cookies : function() {
					this._cookies = this._cookies
							|| querystring.parse(this.headers.cookie) || {};
					return this._cookies;
				},
				getCookie : function(name) {
					return this.cookies()[name];
				},
				// 取参数
				getParameter : function(name) {
					this._params = this._params || {};
					var p = this._params[name];
					if (p) {
						return Q.isArray(p) ? p[0] : p;
					}
					var surl = Q.decode(this.url).trim();
					var idx = surl.indexOf("?");
					if (idx < 0) {
						return null;
					}
					var _params = surl.substring(idx + 1, surl.length);
					_params = _params.replace(/&\s+/g, "&").replace(/\s+=/g,
							"=");
					if (_params == "")
						return null;
					this._params = querystring.parse(_params);
					p = this._params[name];
					if (p) {
						return Q.isArray(p) ? p[0] : p;
					}
					return null;
				},
				// 取请求路径
				getRequestURL : function() {
					if (this._url)
						return this._url;
					var url = Q.decode(this.url), idx = url.indexOf("?");
					return idx >= 0 ? url.substring(0, idx).trim() : url.trim();
				}
			});

	var RES_HEADER_COOKIE = "Set-Cookie"; // cookie
	var RES_HEADER_CONTENT_TYPE = "Content-Type"; // contentType
	// 增加响应类的方法
	Q.extend(Response.prototype, {
				// 增加响应头
				addHeader : function(name, value) {
					this._addHeader(name, value);
					this.writeHeader("\r\n" + name + ":", value);
				},
				// 把增加变量写到缓存里去,外部不建议调用
				_addHeader : function(name, value) {
					if (this.__headers == null) {
						this.__headers = {};
					}
					this.__headers[name] = value;
				},
				addSession : function(sessionId) {
					this.addCookie(sessionIdName, sessionId);
				},
				getHeader : function(name) {
					if (this.__headers == null) {
						this.__headers = {};
					}
					return this.__headers[name];
				},
				addCookie : function(name, value, expires, domain, path, secure) {
					var me = this, cookie = new Cookie(name, value, expires,
							domain, path, secure);
					var cookies = this.getHeader(RES_HEADER_COOKIE) || [];
					cookies.push(cookie.toString());
					me._addHeader(RES_HEADER_COOKIE, cookies);
					me.writeHead(me.statusCode, {
								"Set-Cookie" : cookies
							});
				},
				rmCookie : function(name) {
					this.addCookie(name, "", -1);
				}

			});
	// 删除自带的方法
	delete Response.prototype.setHeader;

})(require("./Qmiks"));