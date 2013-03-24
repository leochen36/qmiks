/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
(function(Q) {
    //系统组件
    var crypto = require("crypto");
    var fs = require("fs");
    var Buffer = require('buffer').Buffer;
    var net = require('net');

    //框架组件
    var Log = require("./Qmiks.Log");
    var WsFrame = require("./Qmiks.Server.WebSocket.WsFrame");
    var WsOut = require("./Qmiks.Server.WebSocket.WsOut");

    //其它变量
    var log = new Log("Qmiks.Server.WebSocket");

    //把第一次的握手请求头转换为json对象

    function toObject(buffer) {
        var chr,
        tstart = 0, //开始
            nb, //临时对象,每行数据
            lineNum = 1, //行数
            obj = {}; //返回对象
        for (var i = 0; i < buffer.length; i++) {
            chr = buffer[i];
            if (chr == 10 && tstart != i - 1) {
                if (buffer[i - 1] == 13) {
                    nb = buffer.slice(tstart, i - 1);
                } else {
                    nb = buffer.slice(tstart, i);
                }
                if (nb.length > 0) {
                    nb = nb.toString();
                    if (lineNum == 1) {
                        obj.protocolAgent = nb
                    } else {
                        nb = nb.split(": ");
                        obj[nb[0]] = nb[1]
                    }
                    lineNum++;
                }
                tstart = i + 1;
            }
        }
        return obj
    }
    //取得第一次握手应返回给客房端的成功信息

    function getResponseProtocol(header) {
        var version = header["Sec-WebSocket-Version"];
        var array = [];
        switch (parseInt(version)) {
            case 13:
                //版本13
                //计算key的sha1加密值,并转换成base64
                var hash = crypto.createHash("sha1");
                hash.update(header["Sec-WebSocket-Key"] + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11");
                var ws_accept = hash.digest('base64');

                array.push("HTTP/1.1 101 Switching Protocols");
                array.push("Upgrade: " + header["Upgrade"]);
                array.push("Connection: " + header["Connection"]);
                //array.push("Sec-WebSocket-Protocol: chat");
                array.push("Sec-WebSocket-Version: " + header["Sec-WebSocket-Version"]);
                array.push("WebSocket-Origin: " + header["Origin"]);
                array.push("Sec-WebSocket-Accept: " + ws_accept);
                //array.push("\r\n\r\n");
                array.push("\r\n");
                return array.join("\r\n");
            default:
        }
    }
    Q.extend(net.Server.prototype, {
        onAccept: function(inbound) {}
    });

    //消息接受类
    ///////////////////////////////////////////////////////////////////////////////////////////////////////

    function Inbound(socket) {
        var me = this;
        me._socket = socket;
        me.wsOut = new WsOut(socket);
    }
    Q.extend(Inbound.prototype, {
        onOpen: function(socket) {},
        onTextData: function(data) {},
        onByteData: function(buffer) {},
        write: function(data) {
            this.wsOut.writeTextData(data);
        },
        writeTextData: function(data) {
            this.wsOut.writeTextData(data);
        },
        writeByteData: function(data) {
            this.wsOut.writeByteData(data);
        }
    });
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    Q.Server.createWebSocket = function(opts) {
        var server = new Q.Server.WebSocket();
        return server;
    };
    //建立WebSocket类,继承net.Server
    ///////////////////////////////////////////////////////////////////
    Q.Server.WebSocket = function() {
        var me=this;
        net.Server.apply(me, arguments);
        me.on("connection", function(socket) {
            var shakeHands = true; //握手
            //绑定消息接收体
            var inbound = new Inbound(socket);
            me.onAccept(inbound);
            //接受消息
            socket.on("data", function(buffer) {
                try {
                    socket.pause();
                    if (socket.readyState === "open") {
                        if (shakeHands) {
                            //握手
                            shakeHands = false;
                            var obj = toObject(buffer);
                            var array = [];
                            var resProtocol = getResponseProtocol(obj);
                            socket.write(resProtocol);
                            //握手
                            inbound.onOpen(socket);
                            return
                        } else {
                            var frame = new WsFrame(buffer);
                            switch (frame.getOpCode()) {
                                case 0:
                                    //表示连续消息片断
                                    break;
                                case 1:
                                    // 表示文本消息片断
                                    inbound.onTextData(frame.payloadData.toString("utf8"));
                                    break;
                                case 2:
                                    //表示二进制消息片断
                                    inbound.onByteData(frame.payloadData);
                                    break;
                                case 3:
                                    //下面表示 为将来的非控制消息片断保留的操作码
                                case 4:
                                case 5:
                                case 6:
                                case 7:
                                    break;
                                case 8:
                                    socket.end();
                                    socket.destroy();
                                    break;
                                case 9:
                                    //表示心跳检查的ping
                                    break;
                                case 10:
                                    //表示心跳检查的pong
                                    break;
                                case 11:
                                    //下面为将来的控制消息片断的保留操作码
                                case 12:
                                case 13:
                                case 14:
                                case 15:

                                    break;
                            }
                            return;
                        }
                    } else if (socket.readyState === "readOnly") {
                        socket.write("read ")
                        return;
                    } else if (socket.readyState === "writeOnly") {
                        console.log("deal writeOnly v");
                        socket.write("hwhw write");
                        return;
                    }
                } catch (e) {
                    log.log("[ERROR][" + e.stack + "]");
                } finally {
                    socket.resume();
                }
            });
        });
    };
    Q.inherit(Q.Server.WebSocket, net.Server);

    module.exports = Q.Server.WebSocket;
})(require("./Qmiks"));