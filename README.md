Qmiks 是一个服务器端的javascript开发框架,目前依赖于 nodejs
使用说明:
Qmiks.js是基础框架文件
	提供方法:
           	encode(str),
            decode(str)
            isFun(fun)
            isFunction(fun)
            isNum(val)
            isNumber(val)
            isArray(array)
            likeArray(array)
            isBool(val)
            isString(str)
            isRegExp(exp)
            isDate(val)
            isObject(obj)
            isPlainObject(obj)
            isNull(val)
            likeNull(val)
            trim(str)
            array(map)//转换为数组
            inArray(value, array)//在数组的索引位
            rmArray(value, array)//删除数组value值
            unique(array)//给数组去重
            contains(source, child)//source是否包含 child
            inherit(subClass, superClass)// 
																		        继承类
																		        子类subClass继承父类superClass的属性方法,
																		        注:子类有父类的属性及方法时,不会被父类替换
																		    
            each(source, callback) //迭代 
            merge()	    // 合并对象或数组
										        至少两个参数
										        说明:1. 如果第一个参数是数组,就会把后面参数(参数会做一层解析,取里面的字段,元素)添加到数组里,
										            例子:var array=[1,2],user={name:"me",age:11},list=[11,23];
										                array=merge(array,user,list);
										                结果:array=[1,2,"me",11,11,23]
										            2.如果第一个参数是对象,就会把后面参数(参数会做一层解析,取里面的字段,元素)设置或替换到对象的字段里,
										            例子:var array=[1,2],user={name:"me",age:11},obj={result:"yes"};
										                user=merge(user,array,obj);
										                结果:user={name:"me",age:11,result:"yes",0:1,1:2}
										    
            
            map(array, callback)//合并数组或对象
            serialize(array)
            serializeArray(array)
            grep(source, callback)//过滤
            
            param(source)/*把对象拼成 name=ccc&age=13这种http请求字符串*/
            stringify(json)//把json对象转换为字符串
            parseJSON(jsonString) //把json字符串转换为json对象
           
            time(diff) /* 取得当前时间,单位毫秒,diff时间差(单位毫秒),用户加上当前时间,可负 */
            delay(fun,timeout,[参数1],[参数2],...)//等于setTimeout,不同点,会对fun做try cache,防止因延迟执行报错,造成服务停止
            cycle(fun,timeout,[参数1],[参数2],...)//等于setInterval,不同点,会对fun做try cache,防止因延迟执行报错,造成服务停止
            toLower(str)//转换为小写
            toUpper(str)//转换为大写

Qmiks.Server.WebSocket.js //WebSocket服务器实现类
Qmiks.Server.Http.js //http服务实现类
Qmiks.Server.createHttp();//创建http服务
Qmiks.Server.createWebSocket();//创建WebSocket服务