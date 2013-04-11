/**
 * websocket服务 配置
 * 
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
// server
(function(Q) {
	// 加载模块
	var Config = {
		timeout : 30 * 60 * 2000,// 超时时间,单位毫秒
		delay : true
	// Nagle运算模式被设计用来减少LAN和其它网络拥塞,缺省情况下TCP连接使用Nagle algorithm，此模式会在真正将数据发出前将其缓冲起来
	}
	module.exports = Config;
})(require("./Qmiks"));