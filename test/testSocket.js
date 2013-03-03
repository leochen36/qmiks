/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
(function() {

    var Q = require("../src/Qmiks.Server");
    require("../src/Qmiks.Security.MD5");

    var net = require('net'),
        length = 128;



    var mproto="GET / HTTP/1.1";
    var mkey="Sec-WebSocket-Key: ";

    var server = net.createServer(function(stream) {
        try {
            //stream.setEncoding('utf8');
            stream.on('connect', function(e) {
                console.log("connect");
                console.log(e)
                stream.write('hello');

            });

            function resume() {
                stream.resume();
            }
            //  pause();
            stream.on('data', function(buffer) {
                 stream.pause();
                 console.log("------------------------------------------------------------------");
                //console.log(buffer);
                var list=[];
                for(var i=0;i<buffer.length;i++){
                    var charValue= String.fromCharCode(buffer[i]); 
                    //console.log(charValue+"-"+buffer[i]);
                }

                var i,chr,tlength=0,tstart=0;
                for(i=0;i<buffer.length;i++){
                    chr=buffer[i];
                    if(chr==10&&tstart!=i-1){
                        console.log("start:"+tstart+",length:"+(i-1));
                        if(buffer[i-1]==13){
                            nb=buffer.slice(tstart,i-1);   
                        }else{
                            nb=buffer.slice(tstart,i);
                        }
                        
                        console.log("nb:"+nb);
                        if(nb.length>0){
                            list.push(nb)
                        }
                        tstart=i+1;
                    }
                }
                for(var i=list.length-1;i>=0;i--){
                    var skey=list[i].toString();
                    console.log(".,,,,,,length:"+skey.length+","+mkey.length);
                    console.log("v:"+skey)
                    if(skey.substring(0,mkey.length)==mkey){
                        console.log("asldjflaksdjl;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2");
                        var proto="HTTP/1.1 101 Web Socket Protocol Handshake";
                        var Upgrade="Upgrade: WebSocket";
                        var remoteAddr="Sec-WebSocket-Origin: http://127.0.0.1";
                        var wsremoteAddr="Sec-WebSocket-Location: ws://localhost:8100/";
                        stream.write(proto);
                        stream.write("\r\n");
                       /* stream.write(Upgrade);
                        stream.write("\r\n");
                        stream.write(remoteAddr);
                        stream.write("\r\n");
                        stream.write(wsremoteAddr);
                        stream.write("\r\n");
                        stream.write("1234567890qazwsx");*/
                        
                      //  stream.end();
                        stream.resume();
                        return;
                    }
                }
                stream.write("abceefig");
                 stream.end();
                 stream.resume();
            });
            stream.on('end', function() {
                stream.write('goodbye\r\n');
                stream.end();
            });
            stream.on("drain", function() {
                console.log("drain>>>");
            })
             stream.on("error", function(e) {
                console.log("error>>>"+e);
            })
        } catch (e) {
            console.log(e.message);
        }

    });
    server.listen(8124, 'localhost');
    server.on("stream",function(stream){
        console.log("--------------------");
    })
    //server.listen(8110);
    console.log("server port:8124");


})();