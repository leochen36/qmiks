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
	var log = new Log("Qmiks.Server.Http.Response");
	var timeout = Config.cookie.timeout;// cookie保存时间
	// 响应类
	function Response(nodeJSResponse) {
		var me = this;
		me._response = nodeJSResponse;
		me._isWriteHead = false;
		me.__headers = {};
	}
	Q.extend(Response, {
		// cookie
		SET_COOKIE : "Set-Cookie",
		CONTENT_TYPE : "Content-Type",
		// 编码
		CHARSET : "Accept-Charset",
		EXPIRES : "Expires",
		ETAG : "ETag"
	});
	Q.extend(Response.prototype, {
		// 增加响应头
		addHeader : function(name, value) {
			value = Q.isString(value) ? value : (value + "");
			this._addHeader(name, value);
			// this._response.setHeader("\r\n" + name + ":", value);
			return this;
		},
		// 批量增加头信息,参数 headers的格式 是{name:value,name1:value1};
		addHeaders : function(headers) {
			if (Q.isNull(headers)) return this;
			for ( var key in headers) {
				this._addHeader(key, headers[key]);
			}
			return this;
		},
		// 把增加变量写到缓存里去,外部不建议调用
		_addHeader : function(name, value) {
			if (this._isWriteHead) {
				log.error("The body has been written, can not add add header!");
			}
			this.__headers[name] = value;
			return this;
		},
		getHeader : function(name) {
			return Q.isNull(this.__headers) ? null : this.__headers[name];
		},
		addCookie : function(name, value, expires, domain, path, secure) {
			var me = this;
			var cookie = new Cookie(name, value, expires, domain, path, secure);
			var cookies = this.getHeader(Response.SET_COOKIE) || [];
			cookies.push(cookie.toString());
			me._addHeader(Response.SET_COOKIE, cookies);
			// me._response.writeHead(me.statusCode, {
			// "Set-Cookie" : cookies
			// });
			me._response.setHeader(Response.SET_COOKIE, cookies);
			return this;
		},
		rmCookie : function(name) {
			this.addCookie(name, "", -1);
			return this;
		},
		getContentType : function() {
			return this.getHeader(Response.CONTENT_TYPE);
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
			me._isWriteHead = true;
			me._response.writeHead(me.getStatus(), me.__headers || {});
		},
		write : function(buffer) {
			try {
				this._writeHead();
				this._response.write(buffer);
			} catch (e) {
				log.error("response write error;", e);
			}
			return this;
		},
		end : function(buffer) {
			try {
				this._writeHead();
				this._response.end(buffer);
			} catch (e) {
				log.error("response end error;", e);
			}
			return this;
		},
		pipe : function(socket) {
			try {
				this._writeHead();
				this._response.pipe(socket);
			} catch (e) {
				log.error("response pipe error;", e);
			}
		},
		on : function() {
			this._response.on.apply(this._response, arguments);
		},
		emit : function() {
			this._response.emit.apply(this._response, arguments);
		},
		removeListener : function() {
			this._response.removeListener.apply(this._response, arguments);
		},
		addListener : function() {
			this._response.addListener.apply(this._response, arguments);
		},
		once : function() {
			this._response.once.apply(this._response, arguments);
		},
		removeAllListeners : function() {
			this._response.removeAllListeners.apply(this._response, arguments);
		},
		listeners : function() {
			return this._response.listeners.apply(this._response, arguments);
		}
	});
	Http.Response = Response;
	module.exports = Response;
})(require("./Qmiks"));