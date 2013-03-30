/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008

 http服务:
 名称:
    过滤器
    路油器


 */
//server
(function(Q) {
    //系统组件
    var fs = require("fs");
    var Http = require("http");
    var os = require("os");
    var HttpServer = Http.Server;
    var IncomingMessage = Http.IncomingMessage;
    var querystring = require('querystring');


    //框架组件
    var Server = require("./Qmiks.Server");
    var Log = require("./Qmiks.Log");
    var Config = require("./Qmiks.Server.Http.Config");
    var Util = require("./Qmiks.Util");
    var Map = require("./Qmiks.Util.Map");
    var Cookie = require("./Qmiks.Server.Http.Cookie");


    var log = new Log("Qmiks.Server.Http");
    var File = {
        separator: os.platform().indexOf("win") > -1 ? "\\" : "/"

    }

    var sessionId = "JSESSIONID";
    var timeout = 7 * 24 * 60 * 60;
    var session = new Map();
    Q.extend(IncomingMessage.prototype, {
        //取session
        getSession: function() {
            var sid = this.cookies()[sessionId];
            if (sid == null) {
                sid = Util.uuid();
                this.setCookie(sessionId, sid);
                var obj = new Map();
                session.push(sid, obj);
            }
            var obj = session.get(sid);
            if (obj == null) {
                obj = new Map();
                session.push(sid, obj);
            }
            return obj;
        },
        //所有cookies
        cookies: function() {
            this._cookies = this._cookies || querystring.parse(this.headers.cookie) || {};
            return this._cookies;
        },
        getCookie: function(name) {
            return this.cookies()[name];
        },
        setCookie: function(name, value, expires, path, domain) {
            var cookie = [];
            cookie.push("; ");
            cookie.push(name);
            cookie.push('=');
            cookie.push(value);
            cookie.push(';');
            expires = expires || timeout;
            //cookie有效期时间 
            if (expires) {
                expires = parseInt(expires);
                var today = new Date();
                var time = today.getTime() + expires * 1000;
                var new_date = new Date(time);
                var expiresDate = new_date.toGMTString(); //转换成GMT 格式。 
                cookie.push('expires=');
                cookie.push(expiresDate);
                cookie.push(';');
            }
            //目录 
            if (path) {
                cookie.push('path=');
                cookie.push(path);
                cookie.push(';');
            }
            //域名 
            if (domain) {
                cookie.push('domain=');
                cookie.push(domain);
                cookie.push(';');
            }
            this.headers.cookie += cookie.join("");
            this.cookies()[name] = cookie.join("");;
        },
        rmCookie: function(name) {
            this.setCookie(name, "", -1);
        },
        //取参数
        getParameter: function(name) {
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
            _params = _params.replace(/&\s+/g, "&").replace(/\s+=/g, "=");
            if (_params == "") return null;
            this._params = querystring.parse(_params);
            p = this._params[name];
            if (p) {
                return Q.isArray(p) ? p[0] : p;
            }
            return null;
        },
        //取请求路径
        getRequestURL: function() {
            if (this._url) return this._url;
            var url = Q.decode(this.url),
                idx = url.indexOf("?");
            return idx >= 0 ? url.substring(0, idx).trim() : url.trim();
        }
    });


})(require("./Qmiks"));