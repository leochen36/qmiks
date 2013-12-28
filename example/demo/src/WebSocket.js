/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
(function() {
    
    var crypto = require("crypto");
    var fs = require("fs");
    var os = require("os");


    var vars = require("../lib/vars");
    var Q = vars.require("org/qmiks/Qmiks");
    var Server = vars.require("org/qmiks/server/Server");
    var app = Server.createWebSocket();
    var port=8124;
    app.listen(port);
    console.log("websocket port:"+port);
    console.log("filename:"+__filename)
    app.onAccept = function(inbound) {
        inbound.onTextData = function(data) {
            
            this.write("dafsd---"+Q.now());
 
        };
    }

    function tobinChange(n) {
        if (!isNaN(n) && n > 0) {
            if (n % 2 == 0) {
                return tobinChange(n / 2) + "0";
            } else {
                if (n > 2) {
                    return tobinChange(parseInt(n / 2)) + (n % 2);
                } else {
                    return tobinChange(0) + n;
                }
            }
        } else {
            return "";
        }
    }

})();