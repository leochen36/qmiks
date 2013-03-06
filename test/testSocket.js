/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
(function() {

    var Q = require("../src/Qmiks.Server");
    var crypto = require("crypto");
    require("../src/Qmiks.Security");

    var net = require('net'),
        length = 128;



    var mproto = "GET / HTTP/1.1";
    var mkey = "Sec-WebSocket-Key: ";

    var server = net.createServer(function(stream) {
        try {

            //stream.setEncoding('utf8');
            stream.on('connect', function(e) {
                console.log("connect");
                console.log(e)
               // stream.write('hello');

            });
            stream.on("secure",function(){
                console.log(">>>>>>>>>>>>>>secure");

            });

            //  pause();
            stream.on('data', function(buffer) {
               // stream.pause();
                console.log("------------------------------------------------------------------");
                console.log("=========================stream.writeable:"+stream.writeable+",stream.readable:"+stream.readable);
                console.log("-----stream.readyState:1:"+stream.readyState);
                console.log(buffer);


                if(stream.readyState=="open"){
                    var list = [];
                    for (var i = 0; i < buffer.length; i++) {
                        var charValue = String.fromCharCode(buffer[i]);
                        //console.log(charValue+"-"+buffer[i]);
                    }

                    var i, chr, tlength = 0,
                        tstart = 0;
                    for (i = 0; i < buffer.length; i++) {
                        chr = buffer[i];
                        if (chr == 10 && tstart != i - 1) {
                            if (buffer[i - 1] == 13) {
                                nb = buffer.slice(tstart, i - 1);
                            } else {
                                nb = buffer.slice(tstart, i);
                            }

                           // console.log("nb:" + nb);
                            if (nb.length > 0) {
                                list.push(nb)
                            }
                            tstart = i + 1;
                        }
                    }
                    for (var i = list.length - 1; i >= 0; i--) {
                        var skey = list[i].toString();

                        if (skey.substring(0, mkey.length) == mkey) {



                            stream.write("HTTP/1.1 101 Switching Protocols\r\n");
                            stream.write("Upgrade: websocket\r\n");
                            stream.write("Connection: Upgrade\r\n");
                            stream.write("Date: " + new Date() + "\r\n");

                            var nm = skey.replace(mkey, "").trim();
                            console.log('mm;' + nm + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11");
                            var hash = crypto.createHash("sha1");
                            hash.update(nm + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11");
                            var ws_accept = hash.digest('base64');

                            console.log(ws_accept);
                            stream.write("Sec-WebSocket-Accept: " + ws_accept + "\r\n");
                            stream.write("WebSocket-Origin: http://localhost\r\n");
                            stream.write("http://localhost:8100/testWebSocket.html\r\n");

                            console.log("-----stream.readyState:2:"+stream.readyState);
                            stream.resume();
    
                            return;
                        }
                    }
                }
                console.log("=====================================================");
                stream.write("<a>");

                
                 stream.end();
                 stream.resume();
            });
            stream.on("close",function(){
                console.log(">>>>>>>>>>111111111111111>close");
            })
            stream.on('end', function() {
                stream.write('==========================goodbye\r\n');
                stream.end();
            });
            stream.on("drain", function() {
                console.log("drain>>>");
            })
            stream.on("error", function(e) {
                console.log("error>>>" + e);
            })
        } catch (e) {
            console.log(e.message);
        }

    });
    server.listen(8124, 'localhost');
    server.on("stream", function(stream) {
        console.log("--------------------");
    })
                server.on("close",function(){
                console.log(">>>>>>>>>>>close");
            })
    //server.listen(8110);
    console.log("server port:8124");


})();