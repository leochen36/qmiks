/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
(function() {
    var fs = require("fs");
    var $ = require("../src/Qmiks.Server");
    console.log("load Qmik is OK");
    console.log("create http server");
    var server = $.createServer();
    console.log("create http server success");
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
        console.log("enter router");
        res.writeHead(200, {
            "Content-Type": "text/text"
        });
        res.write("Hello World! /abc ");

        res.write("http request :" + $.time());
        res.end();
    });
    server.router("/abc/user", function(req, res) {
        console.log("enter router /abc/user");
        res.writeHead(200, {
            "Content-Type": "text/text"
        });
        res.write("Hello World!");

        res.write("/abc/user :" + $.time());
        res.end();
    });
    server.get("/abc/get", function(req, res) {
        console.log("enter router get /abc/get");
        res.writeHead(200, {
            "Content-Type": "text/text"
        });
        res.write("Hello World to get!");

        res.write("/abc/get :" + $.time());
        res.end();
    });
    server.get(/\S*[.](js)/, function(req, res) {
        var url = req.url;
        console.log("url-js:" + url);
        var path;
        path = "./test" + url;
        console.log("path:" + path);
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
        console.log("url-html:" + url);
        var path;
        path = "./test" + url;
        console.log("path:" + path);
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
        var url = req.url;
        console.log(">>>>>>>ws:" + url);
        

        res.write("ok");
        res.end();
    });
    server.listen(8100);

    server.on("connection", function() {
        console.log("connection--------------------------------------------------");
    })
    server.on("request", function() {
        console.log("request--------------------------------------------------");
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