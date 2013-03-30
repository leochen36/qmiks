/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
//server
(function(Q) {
    //系统组件
    var fs = require("fs");
    var os = require("os");
    var querystring = require('querystring');

    //框架组件
    var Http = require("./Qmiks.Server.Http");
    var Log = require("./Qmiks.Log");
    var Config = require("./Qmiks.Server.Http.Config");
    var log = new Log("Qmiks.Server.Http");

    function Cookie(value) {
        var me = this;
        me._data = querystring.parse(value);
    }
    Q.extend(Cookie.prototype, {
        getName: function() {
            return this._data.name;
        },
        getValue: function() {
            return this._data.value;
        },
        getDomain: function() {
            return this._data.domain;
        },
        getComment: function() {
            return this._data.comment;
        },
        getMaxAge: function() {
            return this._data.maxAge;
        },
        getPath: function() {
            return this._data.path;
        },
        getSecure: function() {
            return this._data.secure;
        },
        getVersion: function() {
            return this._data.version;
        }
    });

    module.exports = Q.Server.Http;
})(require("./Qmiks"));