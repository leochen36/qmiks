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
    var Log=require("./Qmiks.Log");
    var WsFrame=require("./Qmiks.Server.WebSocket.WsFrame");
    //握手运行参数
    var length = 128,
        mproto = "GET / HTTP/1.1",
        mkey = "Sec-WebSocket-Key: ";

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
                array.push("\r\n\r\n");
                return array.join("\r\n");
            default:
        }
    }
    //向客户端天写数据

    function write(data, stream) {
        var frame = [];
        var FIN = "1",
            RSV1 = "0",
            RSV2 = "0",
            RSV3 = "0",
            Opcode = "%x10",
            Mask = "0",
            Payloadlen = "";
        console.log("normal msg....");

        stream.write("agooo");
    }

    function createServer() {
        var server = new net.Server(function(stream) {
            var shakeHands = true; //握手
            stream.on("data", function(buffer) {
                try {
                    stream.pause();
                    if (stream.readyState === "open") {
                        if (shakeHands) {
                            //握手
                            shakeHands = false;
                            var obj = toObject(buffer);
                            var array = [];
                            var resProtocol = getResponseProtocol(obj);
                            stream.write(resProtocol);
                            server._write=function(data){
                                wirte(data,stream);
                            }
                            //握手
                            server.onOpen&&server.onOpen(stream);
                            return
                        } else {
                            //console.log(buffer);
                            var frame=new WsFrame(buffer);
                            console.log(frame.payloadData.toString("utf8"))
                            //消息
                            server.onTextData&&server.onTextData(buffer);
                            return;
                        }
                    } else if (stream.readyState === "readOnly") {

                        stream.write("read ")
                        stream.resume();
                        return;
                    } else if (stream.readyState === "writeOnly") {
                        console.log("deal writeOnly v");
                        stream.write("hwhw write");

                        return;
                    }
                } catch (e) {
                    //log.log(e);
                   log.log("[ERROR][" + e.name + ":"+e.fileName+":"+e.stack+ "]");
                }finally{
                    stream.resume();
                }
            });
        })
        return server;
    }

    Q.extend(net.Server.prototype, {
        onOpen:function(stream){

        },
        onTextData: function(data) {

        },
        onDataString: function(buffer) {

        },
        write: function(data) {
            this._write(data);
        }
    });
    Q.Server.createWebSocket = function(opts) {
        var server = createServer();
        return server;
    };
    Q.Server.WebSocket = function(){};
    Q.inherit(Q.Server.WebSocket,net.Server);



    module.exports = Q.Server.WebSocket;
})(require("./Qmiks"));
