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
    var Config = require("./Qmiks.Server.WebSocket.Config");
    var Conversions = require("./Qmiks.Conversions");
    //其它变量
    var log = new Log("Qmiks.Server.WebSocket");
    var Header = {
        UPGRADE: "Upgrade",
        CONNECTION: "Connection",
        WEBSOCKET: "websocket",
        SEC_WEBSOCKET_KEY: "Sec-WebSocket-Key",
        SEC_WEBSOCKET_ORIGIN: "Origin",
    };

    function isSupportWebSocket(header) {
        return Header.UPGRADE.equalsIgnoreCase(header[Header.CONNECTION].toString()) && Header.WEBSOCKET.equalsIgnoreCase(header[Header.UPGRADE].toString());
    }
    //把第一次的,握手请求头转换为json对象,默认处理最新版本13的协议
    // 去掉传入字符串的所有非数字   return string

    function getNumeric(str) {
        return str.replace(/\D/g, "");
    }

    // 返回传入字符串的空格   

    function getSpace(str) {
        return str.replace(/\S/g, "");
    }

    function toHeader(buffer) {
        var chr,
        tstart = 0, //开始
            nb, //临时对象,每行数据
            lineNum = 1, //行数
            keyNum = 3,
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
                    if (lineNum == 1) {
                        obj.protocolAgent = nb;
                    } else {
                        var name = [],
                            index = 0,
                            isMove = false,
                            tv;
                        for (; index < nb.length; index++) {
                            tv = nb.readUInt8(index);
                            if (tv != 58) {
                                name.push(String.fromCharCode(tv));
                            } else {
                                isMove = true;
                                break;
                            }
                        }
                        if (isMove == false) {
                            continue;
                        }
                        obj[name.join("")] = nb.slice(index + 2, nb.length);
                    }
                    lineNum++;
                }
                tstart = i + 1;
            }
        }
        //兼容老版本为7.5,7.6的websocket协议
        if (obj["Sec-WebSocket-Version"] != "13" && obj["Sec-WebSocket-Key1"]) {
            obj["Sec-WebSocket-Version"] = new Buffer("7");
            obj["Sec-WebSocket-Key3"] = buffer.slice(nb.length - 8, nb.length);
        }
        return obj
    }

    //改善握手协议

    function sendHandShake(header, socket) {
        var version = parseInt(header["Sec-WebSocket-Version"].toString());
        var array = [];
        var isNVHandshake = false;
        if (version >= 13 || (header[Header.SEC_WEBSOCKET_ORIGIN] && header[Header.SEC_WEBSOCKET_KEY])) {
            isNVHandshake = true;
        }
        if (isNVHandshake) {
            array.push("HTTP/1.1 101 Switching Protocols");
        } else {
            array.push("HTTP/1.1 101 Web Socket Protocol Handshake");
        }
        array.push("Upgrade: " + header["Upgrade"].toString());
        array.push("Connection: " + header["Connection"].toString());
        switch (version) {
            case 13:
                //版本13
                //计算key的sha1加密值,并转换成base64
                var hash = crypto.createHash("sha1");
                hash.update(header["Sec-WebSocket-Key"].toString() + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11");
                var ws_accept = hash.digest('base64');

                array.push("Sec-WebSocket-Version: " + header["Sec-WebSocket-Version"].toString());
                array.push("WebSocket-Origin: " + header["Origin"].toString());
                array.push("Sec-WebSocket-Accept: " + ws_accept);
                array.push("\r\n");
                socket.write(array.join("\r\n"));
                break;
            case 7:
                //版本7
                var agentBuf = header.protocolAgent,
                    host = header["Host"].toString(),
                    location,
                    index = 0,
                    size = 0,
                    varStr,
                    buffer;

                //取Sec-WebSocket-Location
                var url = agentBuf.slice("GET ".length).toString();
                url = url.substring(0, url.lastIndexOf(" "));
                location = "ws://" + host + url;

                array.push("Sec-WebSocket-Origin: " + header["Origin"].toString());
                array.push("Sec-WebSocket-Location: " + location);

                varStr = array.join("\r\n");
                size = varStr.length + 18;
                buffer = new Buffer(size);
                buffer.write(varStr, 0, size);
                index = size;

                var key1 = header["Sec-WebSocket-Key1"].toString();
                var key2 = header["Sec-WebSocket-Key2"].toString();
                var maskkey1 = parseInt(parseInt(getNumeric(key1)) / getSpace(key1).length);
                var maskkey2 = parseInt(parseInt(getNumeric(key2)) / getSpace(key2).length);

                var key3 = header["Sec-WebSocket-Key3"];

                var mask1 = Conversions.intToByteArray(maskkey1);
                var mask2 = Conversions.intToByteArray(maskkey2);
                var mask = [];

                mask = mask1.concat(mask2);
                for (var i = 0; i < key3.length; i++) {
                    mask.push(key3[i]);
                }

                //md5加密
                var hash = crypto.createHash("md5");
                hash.update(mask.join(""));
                var encrypt = hash.digest('hex');
    
                for (var i = 0; i < encrypt.length; i++) {
                    buffer.writeUInt8(encrypt[i].charCodeAt(0), index++);
                    // mask.push();
                }
                buffer.writeUInt8(13, size++);
                buffer.writeUInt8(10, size++);
    
                return buf;
        }
    }

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
        var me = this;
        net.Server.apply(me, arguments);
        me.on("close", function() {
            console.log("close socket")
        })
        me.on("connection", function(socket) {
            var shakeHands = true; //握手
            //绑定消息接收体
            var inbound = new Inbound(socket);
            socket.setTimeout(Config.timeout);
            socket.setNoDelay(!Config.delay);
            //接受请求事件
            me.onAccept(inbound);
            socket.on("timeout", function() {
                socket.destroy();
            })

            //接受消息
            socket.on("data", function(buffer) {
                try {
                    socket.pause();
                    if (socket.readyState === "open") {
                        if (shakeHands) {
                            //console.log(buffer.toString())
                            //握手
                            shakeHands = false;
                            var header = toHeader(buffer);
                            if (!isSupportWebSocket(header)) {
                                log.warn("no support WebSocket!\r\n" + buffer.toString());
                                socket.destroy();
                                return;
                            }
                            //握手
                            sendHandShake(header, socket);
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
    Q.extend(Q.Server.WebSocket.prototype, {
        onAccept: function(inbound) {}
    });
    module.exports = Q.Server.WebSocket;
})(require("./Qmiks"));