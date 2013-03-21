/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
(function() {
    console.log("============================start =================\r\n\r\n");
    require("../src/Qmiks.Server");
    var crypto = require("crypto");
    var fs = require("fs");


    require("../src/Qmiks.Server.WebSocket");
    var Q = require("../src/Qmiks");
    var app= Q.Server.createWebSocket();

    app.listen(8124);
    app.on("data", function(buffer,write){
        write.write();
    })
    /*
    var Buffer = require('buffer').Buffer;

    var net = require('net'),
        length = 128;



    var mproto = "GET / HTTP/1.1";
    var mkey = "Sec-WebSocket-Key: ";

    var server = new net.Server(); // net.createServer();
    server.listen(8124, 'localhost');

    function toObject(buffer) {
        var i,
        chr,
        tstart = 0,
            nb,
            vpIdx = 0,
            obj = {};
        for (i = 0; i < buffer.length; i++) {
            chr = buffer[i];
            if (chr == 10 && tstart != i - 1) {
                if (buffer[i - 1] == 13) {
                    nb = buffer.slice(tstart, i - 1);
                } else {
                    nb = buffer.slice(tstart, i);
                }
                if (nb.length > 0) {
                    nb = nb.toString();
                    if (vpIdx == 0) {

                        obj.protocolAgent = nb
                    } else {
                        nb = nb.split(": ");
                        obj[nb[0]] = nb[1]
                    }
                    vpIdx++;
                }


                tstart = i + 1;
            }
        }
        return obj
    }

    function connect(stream) {
        // stream.setEncoding("utf8");
        var requestIndex = 1;
        stream.on("data", function(buffer) {

            console.log(">>>>>>>>>>>>>>>new request>stream.writeable:" + stream.writable + "---" + requestIndex);
            console.log(">>>>>>>>>>stream.readyState:" + stream.readyState);
            console.log("data:" + buffer);
            if (stream.readyState === "open") {


                if (requestIndex == 1) {
                    requestIndex++;


                    var obj = toObject(buffer);
                    for (var key in obj) {
                        console.log(">>>>>>>>>" + key)
                    }
                    var array = [],frame=[];
                    //array.push(obj.protocolAgent);
                    var FIN = "1",
                        RSV1 = "0",
                        RSV2 = "0",
                        RSV3 = "0",
                        Opcode = "%x10",
                        Mask = "0",
                        Payloadlen = ""
                        ;

                    array.push("HTTP/1.1 101 Switching Protocols");
                    array.push("Upgrade: " + obj["Upgrade"]);
                    array.push("Connection: " + obj["Connection"]);

                    var hash = crypto.createHash("sha1");
                    hash.update(obj["Sec-WebSocket-Key"] + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11");
                    var ws_accept = hash.digest('base64');
                    array.push("Sec-WebSocket-Accept: " + ws_accept);
                    //array.push("Sec-WebSocket-Protocol: chat");
                    array.push("Sec-WebSocket-Version: " + obj["Sec-WebSocket-Version"]);
                    array.push("WebSocket-Origin: " + obj["Origin"]);
                    // array.push("(Challenge Response): 00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00");
                    // array.push("WebSocket-Location: "+obj["WebSocket-Location"]);
                    console.log("=================================")
                    console.log(array.join("\r\n") + "\r\n");
                    stream.write(array.join("\r\n") + "\r\n\r\n")
              
                    return;

                } else {
                    console.log("normal msg....");

                    stream.write("agooo");
         
                    return;
                }


            } else if (stream.readyState === "readOnly") {

                console.log("deal readOnly v");
                console.log("");
                stream.write("read ")
  
                return;
            } else if (stream.readyState === "writeOnly") {
                console.log("deal writeOnly v");
                stream.write("hwhw write");

                return;
            }

            //stream.end();
        });
        stream.on("close", function() {
            console.log(">>>>>>>>>>111111111111111>close");
        })
        stream.on('end', function() {
            stream.write('==========================goodbye\r\n');
            // stream.end();
        });
        stream.on("drain", function() {
            console.log(">>>>>>>>>>drain>>>");
        })
        stream.on("error", function(e) {
            console.log(">>>>>>>>>>error>>>" + e);
        })
    }

    server.on("connection", connect)
    server.on("close", function() {
        console.log(">>>>>>>>>>>close");
    })
    server.on('error', function(e) {
        if (e.code == 'EADDRINUSE') {
            console.log('Address in use, retrying...');
            setTimeout(function() {
                server.close();
                server.listen(PORT, HOST);
            }, 1000);
        }
    });
    //server.listen(8110);
    console.log("server port:8124");

*/

    /*
     fs.open("f:/abc", 'w',0666, function(err,fd){
                    fs.write(fd,buffer,0,buffer.length,null,function(){
                        fs.closeSync(fd);
                    })
                    console.log("--------------------------------"+fd);
                    
                })
*/

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