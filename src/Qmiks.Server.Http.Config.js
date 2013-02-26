/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008

 http服务 配置
 */
//server
(function(Q) {
    //加载模块
    require("./Qmiks.Server.Http");
    Q.Server.Http.Config = {
        port: 8100, //端口
        Context:{
            appBase:"webapps",
            docBase:"",
            path:"/"
        }
    }
    module.exports = Q;
})(require("./Qmiks"));