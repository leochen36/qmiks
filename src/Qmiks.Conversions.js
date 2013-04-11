/**
 * 数据转换
 * 
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 */
(function(Q) {
	// 加载其它模块
	require("./Qmiks");
	require("./Qmiks.Log");
	var unitValue = 1, intMaxValue = (((unitValue << 31) - 1) << 1) + 1;
	intMaxValue = intMaxValue >>> 0;
	var Conversions = {
		byteArrayToIng : function(bytes) {
			if (bytes.length > 8) throw new Error("bytes length is more large");
			var shift = 0;
			var result = 0;
			for ( var i = bytes.length - 1; i >= 0; i--) {
				result += (bytes[i] & 255) << shift;
				shift += 8;
			}
			return result;
		},
		intToByteArray : function(longValue) {
			if (longValue > intMaxValue) throw new Error("longValue is more large");
			var bytes = [], unidNum = 4, // 几个字节
			shift = (unidNum - 1) * 8;
			for ( var i = 0; i < 4; i++) {
				bytes[i] = longValue >>> shift;
				shift -= 8;
			}
			return bytes;
		},
		intMaxValue : intMaxValue
	}
	module.exports = Q.Conversions;
})(require("./Qmiks"));