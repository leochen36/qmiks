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
	}
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
			this._params = this._params || {};
			var p = this._params[name];
			if (p) { return Q.isArray(p) ? p[0] : p; }
			var surl = Q.decode(this._request.url).trim();
			var idx = surl.indexOf("?");
			if (idx < 0) { return null; }
			var _params = surl.substring(idx + 1, surl.length);
			_params = _params.replace(/&\s+/g, "&").replace(/\s+=/g, "=");
			if (_params == "") return null;
			this._params = querystring.parse(_params);
			p = this._params[name];
			if (p) { return Q.isArray(p) ? p[0] : p; }
			return null;
		},
		getHeader : function(name) {
			return this._request.headers[name];
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
		}
	});
	Http.Request = Request;
	module.exports = Request;
})(require("./Qmiks"));