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

    var WebSocket = require("./Qmiks.Server.WebSocket");

    /** websocket消息侦 
        first:byte
    */
    function WsFrame(buffer) {
        var me = this,
            index = 0,
            b = buffer.readUInt8(index++),
            b = b & 255;
        me.fin = (b & 128) > 0; //boolean ,1位，用来表明这是一个消息的最后的消息片断，当然第一个消息片断也可能是最后的一个消息片断；
        me.rsv = (b & 112) >>> 4; //int,由三个组成,各占1位，如果双方之间没有约定自定义协议，那么这几位的值都必须为0,否则必须断掉WebSocket连接；
        me.opCode = b & 15; //byte 4位操作码，定义有效负载数据，如果收到了一个未知的操作码，连接也必须断掉

        b = buffer.readUInt8(index++);
        me.mask = (b & 128) >>> 7; //:1位，定义传输的数据是否有加掩码,如果设置为1,掩码键必须放在masking-key区域，客户端发送给服务端的所有消息，此位的值都是1；
        if ((me.mask) == 0) {
            throw new Error("frame.notMasked");
        }
        /**传输数据的长度，以字节的形式表示：7位、7+16位、或者7+64位。
            0-125这个范围，那这个值就表示传输数据的长度；
            126，则随后的两个字节表示的是一个16进制无符号数，用来表示传输数据的长度；
            127,则随后的是8个字节表示的一个64位无符合数，这个数用来表示传输数据的长度。
            多字节长度的数量是以网络字节的顺序表示。负载数据的长度为扩展数据及应用数据之和，
            扩展数据的长度可能为0,因而此时负载数据的长度就为应用数据的长度。
        */
        me.payloadLength = b & 127; //传输数据的长度
        switch (me.payloadLength) {
            case 126:
                var bytes = new Array(2);
                read(buffer, bytes, index);
                index += bytes.length;
                me.payloadLength = Q.Conversions.byteArrayToIng(bytes);
                break;
            case 127:
                var bytes = new Array(8);
                read(buffer, bytes, index);
                index += bytes.length;
                me.payloadLength = Q.Conversions.byteArrayToIng(bytes);
                break;
        }
        //如果请求的是控制指令
        if (me.isControl()) {
            if (me.payloadLength > 125) {
                throw new Error("error opCode command,payloadLength is error");
            }
            if (!me.fin) {
                throw new Error("error opCode command,fin is error");
            }
        }
        /** Masking-key
            0或4个字节，客户端发送给服务端的数据，都是通过内嵌的一个32位值作为掩码的；掩码键只有在掩码位设置为1的时候存在。
        */
        if (me.mask == 1) {
            //发送的消息加有掩码
            me.maskingKey = new Array(4)
            read(buffer, me.maskingKey, index);
            index += me.maskingKey.length;
        } else {
            //发送的消息没有掩码
            me.maskingKey = new Array(0);
        }
        me.payloadData = new Buffer(buffer.slice(index, index + me.payloadLength)); //Buffer
        antiMaskData(me.payloadData, me.maskingKey);
    }
    Q.extend(WsFrame.prototype, {
        getFin: function() { //return boolean
            return this.fin;
        },
        getRsv: function() { //return int
            return this.rsv;
        },
        getOpCode: function() { //return byte
            return this.opCode;
        },
        isControl: function() { //return boolean 是否是控制指令,根据opCode判断
            return this.opCode & 8 > 0;
        },
        isClose: function() { //return boolean 是否是关闭连接指令
            return this.opCode == 8;
        },
        getMask: function() { //return byte[]
            return this.mask;
        },
        getPayloadLength: function() { //return long
            return this.payloadLength;
        },
        getPayloadData: function() { //return buffer
            return this.payloadData
        },
        nextFrame: function() {

        }
    });
    WsFrame.textToWsFrame = function(data) {
        return textToWsFrame(data);
    }
    var unitValue = 1;

    function textToWsFrame(data) {
        var bufTxt = new Buffer(data, "utf8"),
            maskingKey = [nextRandom(), nextRandom(), nextRandom(), nextRandom()],
            bufSize = bufTxt.length + 2,
            index = 0,
            byte1 = 128 + (1),
            byte2 = 0,
            byte3;
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
            //buffer.writeUInt32BE(byte3, ++index);
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
        for (var i in maskingKey) {
            //buffer.writeUInt8(maskingKey[i], index++);
        }
        //antiMaskData(bufTxt, maskingKey);
        bufTxt.copy(buffer, index, 0, bufTxt.length);
        return buffer;
    }

    function nextRandom() {
        return parseInt((Math.random() * 256.0));
    }

    function getLength(bufTxt) {
        if (data.length <= 125) return 125;
        if (data.length <= 65535) return;
    }

    function read(buffer, bytes, index) {
        var read = 0;
        if (buffer.length < bytes.length + index) throw new Error("frame.eos");
        for (; read < bytes.length; read++) {
            bytes[read] = buffer.readUInt8(index++);
        }
        return bytes;
    }
    //根据掩码解析数据

    function antiMaskData(buffer, masks) {
        var last = 0,
            index = 0;
        if (buffer.length < 1) return;
        for (; last >= 0 && index < buffer.length; index++) {
            last = buffer.readUInt8(index);
            buffer.writeUInt8(last ^ masks[index % 4], index);
        }
    }
    WebSocket.WsFrame = WsFrame;
    module.exports = WebSocket.WsFrame;
})(require("./Qmiks"));