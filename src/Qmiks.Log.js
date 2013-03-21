/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
//server

(function(Q) {
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
            var nm = msg;
            if (e) mn += "\r\n[" + e.message + "]";
            console.log(this._cata+"--"+nm);
        }
    });
    Q.Log = Log;
    module.exports = Log;
})(require("./Qmiks"));