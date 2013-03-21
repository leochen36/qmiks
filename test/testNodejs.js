/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
(function() {
    var fs = require("fs");
    var $ = require("../src/Qmiks");
    require("../src/Qmiks.Server");
    console.log("load Qmik is OK");
    console.log("create http server");
    console.log($.Server)
    var server =  $.Server.createHttp();
    console.log("create http server success");


    var os=require("os");
    var path=require("path");  

    server.filter("*", function(req, res, filterChain) {
        //console.log("enter filter");
        res.writeHead(200, {
            "Content-Type": "text/json"
        });
        //res.write("Hello World!");

        //res.write("http request :" + $.time());
        filterChain(req, res);
    });
    /*server.router("/", function (req, res) {
        console.log("enter router");
        res.writeHead(200, { "Content-Type": "text/text" });
        res.write("Hello World! / ");

        res.write("http request :" + $.time());
        res.end();
    });*/
    server.router("/abc", function(req, res) {
        //console.log("enter router");
        res.writeHead(200, {
            "Content-Type": "text/text"
        });
        res.write("Hello World! /abc ");

        res.write("http request :" + $.time());
        res.end();
    });
    server.router("/abc/user", function(req, res) {
       // console.log("enter router /abc/user");
        res.writeHead(200, {
            "Content-Type": "text/text"
        });
        res.write("Hello World!");

        res.write("/abc/user :" + $.time());
        res.end();
    });
    server.get("/abc/get", function(req, res) {
        //console.log("enter router get /abc/get");
        res.writeHead(200, {
            "Content-Type": "text/text"
        });
        res.write("Hello World to get!");

        res.write("/abc/get :" + $.time());
        res.end();
    });
    server.get(/\S*[.](js)/, function(req, res) {
        var url = req.url;

        var path;
        path = "./test" + url;
        //path=fs.realpathSync(path)
        //fs.open(path,"r");
        var file = fs.readFileSync(path, "utf8");
        res.writeHead(200, {
            //'Content-Length': file.length,
            'Content-Type': 'text/html'
        });
        //res.writeHead(200, { "Content-Type": "text/javascript" });

        res.write(file);
        res.end();
    });
    server.get(/\S*[.](html|htm)/, function(req, res) {
        var url = req.url;
        var paramSepIdx=url.indexOf("?");
        if(paramSepIdx>-1)
            url=url.substring(0,url.indexOf("?"));

        //console.log("url-html:" + url);
        var path;
        path = "./test" + url;
        //console.log("path:" + path);
        //path=fs.realpathSync(path)
        //fs.open(path,"r");
        var file = fs.readFileSync(path, "utf8");
        res.writeHead(200, {
            // 'Content-Length': file.length,
            'Content-Type': 'text/html'
        });
        // res.writeHead(200, { "Content-Type": "text/html" });
        res.write(file);
        res.end();
    });
    server.get("/ws", function(req, res) {
        console.log("request websocket!");
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
        var obj = toObject(buffer);
        for (var key in obj) {
            console.log(">>>>>>>>>" + key)
        }
        var array = [],
            frame = [];
        //array.push(obj.protocolAgent);
        var FIN = "1",
            RSV1 = "0",
            RSV2 = "0",
            RSV3 = "0",
            Opcode = "%x10",
            Mask = "0",
            Payloadlen = ""


        array.push("HTTP/1.1 101 Switching Protocols");
        array.push("Upgrade: " + obj["Upgrade"]);
        array.push("Connection: " + obj["Connection"]);

        var hash = crypto.createHash("sha1");
        hash.update(obj["Sec-WebSocket-Key"] + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11");
        var ws_accept = hash.digest('base64');
        array.push("Sec-WebSocket-Accept: " + ws_accept);
        array.push("Sec-WebSocket-Protocol: chat");
        array.push("Sec-WebSocket-Version: " + obj["Sec-WebSocket-Version"]);
        array.push("WebSocket-Origin: " + obj["Origin"]);
        // array.push("(Challenge Response): 00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00");
        // array.push("WebSocket-Location: "+obj["WebSocket-Location"]);
        console.log("=================================")
        console.log(array.join("\r\n") + "\r\n");
        res.write(array.join("\r\n") + "\r\n")
   
    });
    server.listen(8100);

    server.on("connection", function() {
        //console.log("connection--------------------------------------------------");
    })
    server.on("request", function() {
      //  console.log("request--------------------------------------------------");
    })
    server.on("upgrade", function() {
        console.log("upgrade--------------------------------------------------");
    })
    /* global.a = "global0999";
    var http = require("http");
    var service = http.createServer(function (request, response) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write("Hello World!");

        console.log("http request :" + $.time());
        response.writeContinue()
        response.end();
    });*/

    //service.listen(8100);



})();