/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
(function() {
    
    var crypto = require("crypto");
    var fs = require("fs");
    var os = require("os");

    var Q = require("../lib/QmiksLib");
    var app = Q.Server.createWebSocket();
    var port=8124;
    app.listen(port);
    console.log("websocket port:"+port)
    app.onAccept = function(inbound) {
        inbound.onTextData = function(data) {
 
            this.write("dafsd---"+Q.time());
 
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

    console.log(Q.time())
    console.log(os.uptime())
})();