/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
// server
(function(Q) {
	// 系统组件
	var fs = require("fs");
	var os = require("os");
	var querystring = require('querystring');
	// 框架组件
	var Http = require("./Qmiks.Server.Http");
	var Log = require("./Qmiks.Log");
	var Config = require("./Qmiks.Server.Http.Config");
	var Cookie = require("./Qmiks.Server.Http.Cookie");
	var Util = require("./Qmiks.Util");
	var Map = require("./Qmiks.Util.Map");
	var Cache = require("./Qmiks.Util.Cache");
	var Cookie = require("./Qmiks.Server.Http.Cookie");
	// 运行参数
	var log = new Log("Qmiks.Server.Http");
	var timeout = Config.cookie.timeout;// cookie保存时间
	var RES_HEADER_CONTENT_TYPE = "Content-Type"; // contentType
	var sessionIdName = "QSESSIONID";
	var session = new Cache();
	// Request对象
	function Request(nodeJSRequest) {
		var me = this;
		me._request = nodeJSRequest;
		me._url = null;
		me._params = null;
		me.__paramStrGet = null;// get请求参数字符串
		me.__paramStrPost = null;// post请求参数字符串
		me._request.on("data", function(data) {
			me.__paramStrPost = data;
		})
	}
	Q.extend(Request, {
		// 最后一次修改时间
		IF_MODIFIED_SINCE : "If-Modified-Since".toLowerCase(),
		// 类型
		CONTENT_TYPE : "Content-Type".toLocaleLowerCase(),
		// 编码
		CHARSET : "Accept-Charset".toLowerCase(),
		ACCEPT_ENCODING : "Accept-Encoding".toLowerCase(),
		CONTENT_LENGTH : "Content-Length".toLowerCase(),
		// ///
		METHOD_POST : "POST",
		METHOD_GET : "GET"
	});
	Q.extend(Request.prototype, {
		// sessionIdName
		getSessionId : function() {
			var sid = this.getCookies()[sessionIdName];
			// 如果sessionId为空,(用户初次登录,或清理过cookie)
			if (sid == null) {
				sid = Util.uuid();// 生成一个uuid当 sessionId
				// name, value, expires, domain, path, secure
				this.getResponse().addCookie(sessionIdName, sid, 7 * 24 * 3600, null, "/");
			}
			return sid;
		},
		// 取session
		getSession : function() {
			var sid = this.getSessionId();
			var obj = session.get(sid);
			if (obj == null) {
				obj = new Map();
				session.set(sid, obj, Config.session.timeout * 60);// 把用户会话信息,扔到队列里
			}
			return obj;
		},
		// 所有cookies
		getCookies : function() {
			this._cookies = this._cookies || querystring.parse(this._request.headers.cookie) || {};
			return this._cookies;
		},
		getCookie : function(name) {
			return this.getCookies()[name];
		},
		// 取参数
		getParameter : function(name) {
			var me = this;
			if (Q.isNull(me._params)) {
				me._initParameter();
			}
			var p = me._params[name];
			return Q.isNull(p) ? null : Q.isArray(p) ? p[0] : p;
		},
		// 取得所有的参数名
		getParameterNames : function() {
			var me = this;
			if (Q.isNull(me._params)) {
				me._initParameter();
			}
			if (me._paramNames) { return me._paramNames; }
			var names = [];
			if (!Q.isNull(me._params)) {
				for ( var name in me._params) {
					names.push(name);
				}
			}
			me._paramNames = names;
			return names;
		},
		_initParameter : function() {
			if (!Q.isNull(me._params)) { return; }
			var me = this;
			// 请求参数的字符串,get和post
			var paramStr = me.__paramStrPost || "";
			var surl = Q.decode(me._request.url).trim();
			var idx = surl.indexOf("?");
			if (idx >= 0) {
				// url里的参数
				var paramStrGet = surl.substring(idx + 1, surl.length);
				paramStrGet = paramStrGet.replace(/&\s+/g, "&").replace(/\s+=/g, "=");
				// 设置到get请求参数的字符串
				me.__paramStrGet = paramStrGet;
				paramStr += "&" + paramStrGet || "";
			}
			me._params = querystring.parse(paramStr);
		},
		getHeader : function(name) {
			return this._request.headers[name];
		},
		getIntHeader : function(name) {
			return parseInt(this.getHeader(name));
		},
		getHeaders : function() {
			return this._request.headers;
		},
		// 取请求路径
		getRequestURL : function() {
			var url = Q.decode(this._request.url);
			if (!Q.isNull(this._url)) return this._url;
			var idx = url.indexOf("?");
			this._url = idx >= 0 ? url.substring(0, idx).trim() : url.trim();
			return this._url;
		},
		getMethod : function() {
			return this._request.method
		},
		getContentType : function() {
			return this.getHeaders()[Request.CONTENT_TYPE];
		},
		getCharacter : function() {
			return this.getHeaders()[Request.CHARSET];
		},
		getRemoteAddr : function() {
			return this._request.socket.remoteAddress;
		},
		getRemotePort : function() {
			return this._request.socket.remotePort
		},
		getContentLength : function() {
			return this.getIntHeader(Request.CONTENT_LENGTH);
		},
		on : function() {
			this._request.on.apply(this._request, arguments);
		},
		emit : function() {
			this._request.emit.apply(this._request, arguments);
		},
		removeListener : function() {
			this._request.removeListener.apply(this._request, arguments);
		},
		addListener : function() {
			this._request.addListener.apply(this._request, arguments);
		},
		once : function() {
			this._request.once.apply(this._request, arguments);
		},
		removeAllListeners : function() {
			this._request.removeAllListeners.apply(this._request, arguments);
		},
		listeners : function() {
			return this._request.listeners.apply(this._request, arguments);
		}
	});
	module.exports = Request;
})(require("./Qmiks"));