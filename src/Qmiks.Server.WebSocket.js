/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
//server

(function (Q) {
    var net = require("net");

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
                    if(chr==10){
                        console.log("start:"+tstart+",length:"+(i-1));
                        var nb=buffer.slice(tstart,i-1);
                        console.log("nb:"+nb);
                        list.push(nb);
                        
                        tstart=i+1;
                    }
                }

                stream.write("abceefig");
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
    module.exports = Q;
})(require("./Qmiks"));
