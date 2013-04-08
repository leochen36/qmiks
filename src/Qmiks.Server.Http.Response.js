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

	// 运行参数
	var log = new Log("Qmiks.Server.Http");
	var timeout = Config.cookie.timeout;// cookie保存时间
	function Response(nodeJSResponse) {
		var me = this;
		me._response = nodeJSResponse;
	}
	Q.extend(Response.prototype, {
				// 增加响应头
				addHeader : function(name, value) {
					this._addHeader(name, value);
					this._response.writeHeader("\r\n" + name + ":", value);
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
					me._response.writeHead(me.statusCode, {
								"Set-Cookie" : cookies
							});
				},
				rmCookie : function(name) {
					this.addCookie(name, "", -1);
				},
				getContentType : function() {
					return this.getHeader("Content-Type");
				},
				getStatus : function() {
					return this._response.statusCode;
				}
			})
	Http.Response = Response;
	module.exports = Cookie;
})(require("./Qmiks"));