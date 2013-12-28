/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
(function() {

    /*var Qmiks=require("../../../src/qmiks/Qmiks");
    require("../../../src/qmiks/server/Server");*/

    var vars={
    	lib:function(){
    		return "../../../src/";
    	},
    	require:function(clazz){
    		return require(vars.lib()+clazz);
    	}
    }

    module.exports = vars;
})();