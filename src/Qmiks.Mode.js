/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
//server

(function (Q) {
    //加载依赖模块
    require("../src/Qmiks.Server");
    var server = $.createServer();
    server.listen(8100);
 	var mode={
 		server:function(){
 			return server
 		}
 	}
    Q.Mode =mode;
    module.exports = Q;
})(require("./Qmiks"));
