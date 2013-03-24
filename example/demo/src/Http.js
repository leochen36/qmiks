/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
(function() {
    var fs = require("fs");
    var Q = require("../lib/QmiksLib");
 
    console.log("load Qmik is OK");
    console.log("create http server");
 
    var server =  Q.Server.createHttp();
    console.log("create http server success");


    var os=require("os");
    var path=require("path");  

    server.filter("*", function(req, res, filterChain) {
        //console.log("enter filter");
        res.writeHead(200, {
            "Content-Type": "text/json"
        });
        //res.write("Hello World!");

        //res.write("http request :" + Q.time());
        filterChain(req, res);
    });

    server.router("/abc", function(req, res) {
        //console.log("enter router");
        res.writeHead(200, {
            "Content-Type": "text/text"
        });
        res.write("Hello World! /abc ");

        res.write("http request :" + Q.time());
        res.end();
    });
    server.router("/abc/user", function(req, res) {
       // console.log("enter router /abc/user");
        res.writeHead(200, {
            "Content-Type": "text/text"
        });
        res.write("Hello World!");

        res.write("/abc/user :" + Q.time());
        res.end();
    });
    server.get("/abc/get", function(req, res) {
        //console.log("enter router get /abc/get");
        res.writeHead(200, {
            "Content-Type": "text/text"
        });
        res.write("Hello World to get!");

        res.write("/abc/get :" + Q.time());
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

   
    });
    var port=8100;
    server.listen(port);

    server.on("connection", function() {
        //console.log("connection--------------------------------------------------");
    })
    server.on("request", function() {
      //  console.log("request--------------------------------------------------");
    })
    server.on("upgrade", function() {
        console.log("upgrade--------------------------------------------------");
    })
    console.log("http port:"+port)

})();