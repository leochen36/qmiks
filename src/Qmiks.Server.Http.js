/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008

 http����:
 ����:
    ������
    ·����


 */
//server
(function (Q, Server) {
    var http = require("http"),
        filters = [],//�������б�
        routers = [];//·�����б�
    /* ��ӹ����� */
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
    /* ȡ�ù����� */
    function getFilter(key) {
        for (var i = 0; i < filters.length; i++) {
            if (filters[i].key == key) return filters[i]
        }
    }
    /* ȡ�����з��ϴ�url��֤����Ĺ����������� */
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
    /* ���·���� */
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
    /* ִ�����·����,����url�ҳ����·������ִ�� */
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
    /* ���ַ���תΪ������ַ��� */
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
        /** ��ӹ�����(����������),ͬһ����,�����ж��������,���ȹ�����,�ٴ���·����
        * path:����·��(������ʽ)
        * fun:������Ϲ��˹���,��������
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
        /** ���·����(����java struct�� /abc.e ������Ӧaction ),ͬһ����,ֻ����һ��·����,�����ӵ�·����,�滻�ϵ�
        *   path:����·��(������ʽ)
        *   callback:������Ϲ��˹���,��������
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
                    //ȡ�����еĹ��˷���
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
