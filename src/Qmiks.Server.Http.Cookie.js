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
	var log = new Log("Qmiks.Server.Http");

	// 运行参数
	var timeout = 7 * 24 * 60 * 60;// 过期时间
	function Cookie(name, value, expires, domain, path, secure) {
		var me = this, cookie = [];
		// me._data = querystring.parse(value);
		me.name = name;
		me.value = value;
		expires = expires || timeout;// 单位秒
		// cookie有效期时间
		if (expires) {
			expires = parseInt(expires);
			me.expires = expires;
		}
		// 域名
		if (domain) {
			me.domain = domain;
		}
		// 目录
		if (path) {
			me.path = path;
		}
		// 安全
		if (secure) {
			me.secure = secure;
		}
	}
	Q.extend(Cookie.prototype, {
				getName : function() {
					return this.name;
				},
				getValue : function() {
					return this.value;
				},
				getExpires : function() {
					return this.expires
				},
				getMaxAge : function() {
					return this.expires;
				},
				getDomain : function() {
					return this.domain;
				},
				getPath : function() {
					return this.path;
				},
				getSecure : function() {
					return this.secure;
				},
				toString : function() {
					var me = this, cookie = [];
					cookie.push(me.getName());
					cookie.push('=');
					cookie.push(me.getValue());
					cookie.push('; ');
					expires = me.getExpires();
					// cookie有效期时间
					if (expires) {
						expires = parseInt(expires);
						var today = new Date();
						var time = today.getTime() + expires * 1000;
						var new_date = new Date(time);
						var expiresDate = new_date.toGMTString(); // 转换成GMT
						// 格式。
						cookie.push('expires=');
						cookie.push(expiresDate);
						cookie.push('; ');
					}
					// 目录
					if (me.getPath()) {
						cookie.push('path=');
						cookie.push(me.getPath());
						cookie.push('; ');
					}
					// 域名
					if (me.getDomain()) {
						cookie.push('domain=');
						cookie.push(me.getDomain());
						cookie.push('; ');
					}
					// 安全
					if (me.getSecure()) {
						cookie.push('getSecure=');
						cookie.push(me.getSecure());
						cookie.push('; ');
					}
					return cookie.join("");
				}
			});

	module.exports = Cookie;
})(require("./Qmiks"));