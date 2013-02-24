/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
//server

(function (Q) {
    var server,
        options = {
            type: "http"
        };
    Q.Server = {};
    require("./Qmiks.Server.Http");
    Q.createServer = function (_options) {
        opts = Q.extend({}, _options, options);
        switch (opts.type) {
            case "https": break;
            case "websocket": break;
            case "socket": break;
            default: server = require("./Qmiks.Server.Http");
        }
        return service.createServer();
    }
    module.exports = Q;
})(require("./Qmiks"));
