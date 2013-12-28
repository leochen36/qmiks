var ws = null;

alert(document.cookie)
function getServiceURL() {
    var pathName = window.location.pathname;
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return "http://" + window.location.host + projectName;
}

function getWsUrl() {
    var pathName = window.location.pathname;
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return "ws://" + window.location.host + projectName;
}

function getWs() {

    return ("ws://" + window.location.host).replace(/[:][0-9]+/g,"")+":8124/";
}
function connectToServer() {

    // 设定WebSocket,注意协议是ws，请求是指向对应的WebSocketServlet的
    var url = getWs();
    console.log(url);

    // 创建WebSocket实例，下面那个MozWebSocket是Firefox的实现,EsWebSocket为宜搜webview中的实现
    if ('WebSocketFactory' in window) {
        ws = new EsWebSocket(url);
    } else {
        if ('WebSocket' in window) {
            ws = new WebSocket(url);
        } else if ('MozWebSocket' in window) {
            ws = new MozWebSocket(url);
        } else {

            alert('不支持WebSocket,.');
            return;
        }
    }

    ws.onopen = function() {
        console.log("socket连接成功");

    };

    // 收到服务器发送的文本消息, event.data表示文本内容
    ws.onmessage = function(msg) {
        var mm="receive msg:"+msg.data;
        document.getElementById("show").innerHTML =mm;
        console.log(mm)
    };
    // 关闭WebSocket的回调
    ws.onclose = function(eve) {
        console.log("socket断开：");
        console.log(eve);
    };

    ws.onerror = function(eve) {
        console.log("socket建立失败：");
        console.log(eve);
    };
}
// 发送消息给服务器

function sendMessage(dtoObj) {
    try {
        //console.log("websocket status:"+ws.readyState +",protocol :"+ws.protocol  );
        console.log("send:" + dtoObj);
        document.getElementById("content").innerHTML = "websocket status:" + ws.readyState + ",protocol :" + ws.protocol;
        if (ws != null) {

            ws.send("你好吗");
        } else {

        }
    } catch (e) {
        if (dtoObj) {

            console.log("服务器连接异常11");
            console.log(e);
        } else {
            console.log("服务器连接异常22," + e.message);
            console.log(e);
        }
        console.log(e.stack);
    }

}

connectToServer();

function send() {
    setInterval(function() {

        sendMessage("dafsd---"+$.now);
    }, 3000);
}
send();