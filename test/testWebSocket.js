var ws = null;
 

function connectToServer() {
  
    // 设定WebSocket,注意协议是ws，请求是指向对应的WebSocketServlet的
    var url = "ws://127.0.0.1:8124/socket";
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
       console.log("000000>msg:"+msg)
    };
    // 关闭WebSocket的回调
    ws.onclose = function(eve) {
        console.log("socket断开：");
        console.log(eve);
    };

    ws.onerror = function(eve) {
        console.log("socket建立失败：" );
        console.log(eve);
    };
}
// 发送消息给服务器
function sendMessage(dtoObj) {
    try {
        console.log("websocket status:"+ws.readyState +",protocol :"+ws.protocol  );
  
        if (ws != null) {
            ws.send(JSON.stringify(dtoObj));
        } else {
            disconnectTip();
        }
    } catch (e) {
        if (dtoObj) {
 
            console.log("服务器连接异常11");
            console.log(e);
        } else {
             console.log("服务器连接异常22,"+e.message);
            console.log(e);
        }
        console.log("异常:" + e.message);
    }

}

connectToServer();

function send(){
    setTimeout(function(){
        sendMessage({name:"me"});
    },3000);
}
send();