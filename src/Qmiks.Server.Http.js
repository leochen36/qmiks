/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008

 http服务:
 名称:
    过滤器
    路油器


 */
//server
(function (Q, Server) {
    var http = require("http"),
        filters = [],//过滤器列表
        routers = [];//路油器列表
    /* 添加过滤器 */
    function addFilter(key, fun) {
        var ft = getFilter(key),
            nfun = function (req, res, filterChain) {
                fun.apply(fun, [req, res, filterChain]);
            };
        if (ft) {
            ft.list.push(nfun)
        } else {
            filters.push({ key: key, regexp: new RegExp(key, "i"), list: [nfun] })
        }
    }
    /* 取得过滤器 */
    function getFilter(key) {
        for (var i = 0; i < filters.length; i++) {
            if (filters[i].key == key) return filters[i]
        }
    }
    /* 取得所有符合此url验证规则的过滤器处理方法 */
    function getAllFilterFun(url) {
        var list = [],
            i,
            j,
            _ft;
        for (i = 0; i < filters.length; i++) {
            _ft = filters[i];
            if (_ft.regexp.test(url)) {
                for (var k in _ft.list) {
                    list.push(_ft.list[k]);
                }
            }
        }
        return list;
    }
    /* 添加路油器 */
    function addRouter(key, fun, opts) {
        var nopts = Q.extend({ method: "ALL" }, opts);
        for (var i = routers.length - 1; i >= 0; i--) {
            if (routers[i].key == key) {
                console.log("the router[" + key + "] too many! remove  the extra");
                routers.splice(i, 1);
            }
        }
        routers.push({
            key: key,
            regexp: new RegExp(key, "i"),
            option: nopts,
            router: function (req, res) {
                fun.apply(fun, [req, res]);
            }
        });
    }
    /* 执行相关路油器,根据url找出相关路油器并执行 */
    function execRouter(url, method, req, res) {
        for (var k = 0; k < routers.length; k++) {
            if (routers[k].option.method == "ALL" || routers[k].option.method == method) {
                if (routers[k].option.ruleType == "string") {
                    if (routers[k].key == url) {
                        routers[k].router(req, res)
                    }
                }else if (routers[k].regexp.test(url)) {
                    routers[k].router(req, res)
                }
            }
        }
    }
    /* 把字符串转为正则的字符串 */
    function toRegExpString(str) {
        if (str == "/" || str == "*") {
            return ".*"
        }
        return str;
    }

    var app = function (server) {
        var me = this;
        me.server = server;
    };
    Q.extend(app.prototype, {
        listen: function (port) {
            this.server.listen(port);
        },
        /** 添加过滤器(就是拦截器),同一规则,可以有多个过滤器,优先过滤器,再触发路油器
        * path:过滤路径(正则表达式)
        * fun:如果符合过滤规则,触发方法
        */
        filter: function (regexp, fun) {
            if (Q.isString(regexp)) {
                addFilter(toRegExpString(regexp), fun)
            } else if (Q.isRegExp(regexp)) {
                addFilter(regexp.toString(), fun)
            } else {
                throw new Error("regexp type is error,please input RegExp or String");
            }
        },
        /** 添加路油器(类似java struct的 /abc.e 触发对应action ),同一规则,只能有一个路油器,最后添加的路油器,替换老的
        *   path:过滤路径(正则表达式)
        *   callback:如果符合过滤规则,触发方法
        */
        router: function (regexp, fun, opts) {
            if (Q.isString(regexp)) {
                addRouter(toRegExpString(regexp), fun, Q.extend({ ruleType: "string" }, opts))
            } else if (Q.isRegExp(regexp)) {
                addRouter(regexp.toString(), fun, Q.extend({ ruleType: "regexp" }, opts))
            } else {
                throw new Error("regexp type is error,please input RegExp or String");
            }
        },
        post: function (regexp, fun) {
            this.router(regexp, fun, { method: "POST" })
        },
        get: function (regexp, fun) {
            this.router(regexp, fun, { method: "GET" })
        }
    });
    var server = {
        createServer: function () {
            var service = http.createServer(function (req, res) {
                try {
                    var url = req.url,
                        method = req.method,
                        path = url.replace(/[?].*/, ""),
                        execCount = 0;
                    console.log("url:" + req.url);
                    console.log("path:" + path);
                    console.log("method:" + req.method);
                    console.log("httpVersion:" + req.httpVersion);
                    console.log("connection:" + req.connection);
                    //取得所有的过滤方法
                    var execList = getAllFilterFun(url) || [];

                    function execFilter(req, res) {
                        for (var i = execCount; i < execList.length; i++) {
                            execCount++;
                            execList[i](req, res, execFilter);
                            break;
                        }
                        if (execCount == execList.length) {
                            execCount = 0;
                            execRouter(url, method, req, res);
                        }
                    }
                    execFilter(req, res);
                } catch (e) {
                    console.log("[ERROR]" + e.message);
                }
            })
            return new app(service);
        }
    }
    Q.Server.Http = server;
    module.exports = Q;
})(require("./Qmiks"), require("./Qmiks.Server"));
