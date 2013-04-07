/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 * websocket协议输出流
 */
(function(Q) {
    //系统组件
    var crypto = require("crypto");
    var fs = require("fs");
    var Buffer = require('buffer').Buffer;
    var net = require('net');

    var WebSocket = require("./Qmiks.Server.WebSocket");

    function WsOut(socket) {
        var me = this;
        me.text = true;
        me.socket=socket;
    }
    Q.extend(WsOut.prototype, {
        writeTextData: function(txtData) {
            this.text = true;
            this.socket.write(this.getBuffer(txtData));
        },
        writeByteData: function(bytes) {
            this.text = false;
            socket.write(this.getBuffer(bytes));
        },
        getBuffer: function(data) {
            var bufTxt,
            byte1 = 128,
                byte2 = 0,
                byte3,
                index = 0,
                bufSize;
            //输出内容是否是文本
            if (this.text) {
                bufTxt = new Buffer(data, "utf8");
                byte1 += 1;
            } else {
                bufTxt = new Buffer(data);
                byte1 += 2;
            }
            bufSize = bufTxt.length + 2;
            //计算长度
            if (bufTxt.length <= 125) {
                byte2 += bufTxt.length;
            } else if (bufTxt.length <= 65535) {
                byte2 += 126;
                byte3 = bufTxt.length;
                bufSize += 2;
            } else if (bufTxt.length > 65535) {
                byte2 += 127;
                byte3 = bufTxt.length;
                bufSize += 8;
            }

            var buffer = new Buffer(bufSize);
            buffer.writeUInt8(byte1, index++);
            buffer.writeUInt8(byte2, index++);
            if (bufTxt.length > 125 && bufTxt.length <= 65535) {
                buffer.writeUInt8(byte3 >>> 8, index++);
                buffer.writeUInt8(byte3 & 255, index++);
            } else if (bufTxt.length > 65535) {
                buffer.writeUInt8(0, index++);
                buffer.writeUInt8(0, index++);
                buffer.writeUInt8(0, index++);
                buffer.writeUInt8(0, index++);
                buffer.writeUInt8(byte3 >>> 24, index++);
                buffer.writeUInt8(byte3 >>> 16, index++);
                buffer.writeUInt8(byte3 >>> 8, index++);
                buffer.writeUInt8(byte3 & 255, index++);
            }
            bufTxt.copy(buffer, index, 0, bufTxt.length);
            return buffer;
        }
    });

    WebSocket.WsOut = WsOut;
    module.exports = WebSocket.WsOut;
})(require("./Qmiks"));