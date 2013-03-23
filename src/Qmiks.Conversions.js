/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
//server

(function(Q) {
    //加载其它模块
    require("./Qmiks");
    require("./Qmiks.Log");

    var Conversions = {
        byteArrayToLong: function(bytes) {
            if (bytes.length > 8) throw new Error("bytes length is more large");
            var shift = 0;
            var result = 0;
            for (var i = bytes.length - 1; i >= 0; i--) {
                result += (bytes[i] & 255) << shift;
                shift += 8;
            }
            return result;
        }
    }
    Q.Conversions=Conversions;
    module.exports = Q.Conversions;
})(require("./Qmiks"));