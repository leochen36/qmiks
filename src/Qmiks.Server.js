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
    var Http=require("./Qmiks.Server.Http").Http;
    var WebSocket=require("./Qmiks.Server.WebSocket").WebSocket;

    var http,https;
    Q.extend(Q.Server.prototype,{
        createHttp:function(){
            return Http.createServer();
        },
        createWebSocket:function(){
            return new WebSocket();
        }
    })

    module.exports = Q.Server;
    
})(require("./Qmiks"));
