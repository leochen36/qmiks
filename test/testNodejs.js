/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
(function () {

    var $ = require("../src/Qmiks.Server");
    console.log("load Qmik is OK");
    console.log("create http server");
    var server = $.createServer();
    console.log("create http server success");
    server.filter("*", function (req, res, filterChain) {
        console.log("enter filter");
        res.writeHead(200, { "Content-Type": "text/json" });
        //res.write("Hello World!");

        //res.write("http request :" + $.time());
        filterChain(req, res);
    });
    server.router("/", function (req, res) {
        console.log("enter router");
        res.writeHead(200, { "Content-Type": "text/text" });
        res.write("Hello World! / ");

        res.write("http request :" + $.time());
        res.end();
    });
    server.router("/abc", function (req, res) {
        console.log("enter router");
        res.writeHead(200, { "Content-Type": "text/text" });
        res.write("Hello World! /abc ");

        res.write("http request :" + $.time());
        res.end();
    });
    server.router("/abc/user", function (req, res) {
        console.log("enter router /abc/user");
        res.writeHead(200, { "Content-Type": "text/text" });
        res.write("Hello World!");

        res.write("/abc/user :" + $.time());
        res.end();
    });
    server.get("/abc/get", function (req, res) {
        console.log("enter router get /abc/get");
        res.writeHead(200, { "Content-Type": "text/text" });
        res.write("Hello World to get!");

        res.write("/abc/get :" + $.time());
        res.end();
    });
    server.listen(8100);
    

    var s2 = $.createServer();
    s2.filter("/",function(req,res){
        console.log("--------");
           res.writeHead(200, { "Content-Type": "text/text" });
        res.write("Hello World s2!");
        res.end();
    });
    s2.listen(8300);
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