/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
//server

(function (Q) {
    //加载其它模块
    require("./Qmiks.Log");

    var options = {
            type: "http"
        };
    Q.Server = {};

    //加载子模拟
    var Http=require("./Qmiks.Server.Http").Server.Http;


    var http,https;
    Q.extend(Q.Server.prototype,{
        getHttpServer:function(){
            return http;
        },
        getHttpsServer:function(){
            return https;
        },
        getSocketServer:function(){

        },
        getSebSocketServer:function(){

        }
    })

    Q.createServer = function (_options) {
        opts = Q.extend({}, _options, options);
        switch (opts.type) {
            case "https": break;
            case "websocket": break;
            case "socket": break;
            default: http = Http.createServer();return http;
        }
    }
    module.exports = Q;
})(require("./Qmiks"));
