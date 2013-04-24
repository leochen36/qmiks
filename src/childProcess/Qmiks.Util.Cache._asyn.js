/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008 缓存
 */
// server
(function(Q) {
	// 加载系统组件
	var child_process = require('child_process');
	// 加载其它模块
	var Cache = require("../Qmiks.Util.Cache.Sync");
	var Map = require("../Qmiks.Util.Map");
	var Log = require("../Qmiks.Log");
	// 运行参数
	var log = new Log("Qmiks.Util.Cache._asyn.js");
	var caches = new Cache();
	process.on('message', function(param) {
		console.log('CHILD got message:', param);
		if (!Q.isFun(param.getUuid)) {
			log.log("uuid is null or is not function!");
			return;
		}
		console.log(">>>" + param)
		var cache = caches.get(param.getUuid());
		if (Q.isNull(cache)) {
			log.log("uuid:" + param.getUuid() + " is null!");
			return;
		}
		if (Q.isNull(cache)) {
			cache = new QCache();
			caches.set(param.getUuid(), cache, -1);
		}
		switch (param.opCode) {
		case 1:// set
			cache.set(param.key, param.value, param.timeout);
			break;
		case 2:// get
			process.send( {
				opCode : param.opCode,
				value : cache.get(param.key)
			});
			break;
		case 3:// rm
			cache.rm(param.key);
			break;
		case 4:// containsKey
			process.send( {
				opCode : param.opCode,
				value : cache.containsKey(param.key)
			});
		}
	});
	process.send( {
		foo : 'bar'
	});
})(require("../Qmiks"));