/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
//server

(function(Q) {
    var EventEmitter=require('events').EventEmitter;


    function Log(cata) {
        var me=this;
        me._cata=cata;
    }
    Q.extend(Log.prototype, {
        error: function(msg, e) {
            this.log(msg, e)
        },
        debug: function(msg, e) {
            this.log(msg, e)

        },
        info: function(msg, e) {
            this.log(msg, e)

        },
        error: function(msg, e) {
            this.log(msg, e)
        },
        /* 等于 输出到debug+console */
        log: function(msg, e) {
            var m;
            if(msg instanceof EventEmitter){
                m=msg.stack;
                e=null;
            }else{
                m=msg;
            }
            if(e){
                m += "\r\n[" + msg.stack + "]";
            }
            console.log(this._cata+"--"+m);
        }
    });
    Q.Log = Log;
    module.exports = Log;
})(require("./Qmiks"));