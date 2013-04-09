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
	// 运行参数
	var log = new Log("Qmiks.Server.Http");
	var timeout = Config.cookie.timeout;// cookie保存时间
	var RES_HEADER_COOKIE = "Set-Cookie"; // cookie
	var RES_HEADER_CONTENT_TYPE = "Content-Type"; // contentType
	function Request(nodeJSResponse) {
		var me = this;
		me._response = nodeJSResponse;
		me._isWriteHead = false;
	}
	Q.extend(Request.prototype, {
		// 增加响应头
		addHeader : function(name, value) {
			value = Q.isString(value) ? value : (value + "");
			this._addHeader(name, value);
			// this._response.setHeader("\r\n" + name + ":", value);
			return this;
		},
		// 把增加变量写到缓存里去,外部不建议调用
		_addHeader : function(name, value) {
			if (this._isWriteHead) {
				log.error("The body has been written, can not add add header!");
			}
			if (this.__headers == null) {
				this.__headers = {};
			}
			this.__headers[name] = value;
			return this;
		},
		getHeader : function(name) {
			if (this.__headers == null) {
				this.__headers = {};
			}
			return this.__headers[name];
		},
		addCookie : function(name, value, expires, domain, path, secure) {
			var me = this;
			var cookie = new Cookie(name, value, expires, domain, path, secure);
			var cookies = this.getHeader(RES_HEADER_COOKIE) || [];
			cookies.push(cookie.toString());
			me._addHeader(RES_HEADER_COOKIE, cookies);
			// me._response.writeHead(me.statusCode, {
			// "Set-Cookie" : cookies
			// });
			me._response.setHeader("Set-Cookie", cookies);
			return this;
		},
		rmCookie : function(name) {
			this.addCookie(name, "", -1);
			return this;
		},
		getContentType : function() {
			return this.getHeader("Content-Type");
		},
		getStatus : function() {
			return this._response.statusCode;
		},
		setStatus : function(status) {
			// this._response.writeHead(status);
			this._response.statusCode = status;
			return this;
		},
		// 内部方法,写头部数据流给客户端
		_writeHead : function() {
			var me = this;
			// 如果已写过,就不写
			if (me._isWriteHead) { return; }
			me._response.writeHead(me.getStatus(), me.__headers || {});
			me._isWriteHead = true;
		},
		write : function(buffer) {
			this._writeHead();
			this._response.write(buffer);
			return this;
		},
		end : function(buffer) {
			this._writeHead();
			this._response.end(buffer);
			return this;
		},
		pipe : function(socket) {
			this._response.pipe(socket);
		}
	});
	Http.Request = Request;
	module.exports = Request;
})(require("./Qmiks"));