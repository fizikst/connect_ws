var util = require('util');
var url = util.format("ws://%s:%s/echo/websocket", 'localhost', 11222);
var WebSocket = require('ws');


function ReconnectingWebSocket(url, protocols) {
    protocols = protocols || [];

    // These can be altered by calling code.
    this.debug = false;
    this.reconnectInterval = 3000;
    this.timeoutInterval = 3000;

    var self = this;
    var ws;
    var forcedClose = false;
    var timedOut = false;

    this.url = url;
    this.protocols = protocols;
    this.readyState = WebSocket.CONNECTING;
    this.URL = url; // Public API

    this.onopen = function(event) {
    };

    this.onclose = function(event) {
    };

    this.onconnecting = function(event) {
    };

    this.onmessage = function(event) {
    };

    this.onerror = function(event) {
    };

    function connect(reconnectAttempt) {
        ws = new WebSocket(url, protocols);

        self.onconnecting();
        if (self.debug || ReconnectingWebSocket.debugAll) {
            console.debug('ReconnectingWebSocket', 'attempt-connect', url);
        }

        var localWs = ws;
        var timeout = setTimeout(function() {
            if (self.debug || ReconnectingWebSocket.debugAll) {
                console.debug('ReconnectingWebSocket', 'connection-timeout', url);
            }
            timedOut = true;
            localWs.close();
            timedOut = false;
        }, self.timeoutInterval);

        ws.onopen = function(event) {
            clearTimeout(timeout);
            if (self.debug || ReconnectingWebSocket.debugAll) {
                console.debug('ReconnectingWebSocket', 'onopen', url);
            }
            self.readyState = WebSocket.OPEN;
            reconnectAttempt = false;
            self.onopen(event);
        };

        ws.onclose = function(event) {
            clearTimeout(timeout);
            ws = null;
            if (forcedClose) {
                self.readyState = WebSocket.CLOSED;
                self.onclose(event);
            } else {
                self.readyState = WebSocket.CONNECTING;
                self.onconnecting();
                if (!reconnectAttempt && !timedOut) {
                    if (self.debug || ReconnectingWebSocket.debugAll) {
                        console.debug('ReconnectingWebSocket', 'onclose', url);
                    }
                    self.onclose(event);
                }
                setTimeout(function() {
                    connect(true);
                }, self.reconnectInterval);
            }
        };
        ws.onmessage = function(event) {
            if (self.debug || ReconnectingWebSocket.debugAll) {
                console.debug('ReconnectingWebSocket', 'onmessage', url, event.data);
            }
            self.onmessage(event);
        };
        ws.onerror = function(event) {
            console.log('err',new Date());
            clearTimeout(timeout);
            setTimeout(function() {
                connect(true);
            }, self.reconnectInterval);

            if (self.debug || ReconnectingWebSocket.debugAll) {
                console.debug('ReconnectingWebSocket', 'onerror', url, event);
            }
            self.onerror(event);
        };
    }

    connect(url);

    this.send = function(data) {
        if (ws) {
            if (self.debug || ReconnectingWebSocket.debugAll) {
                console.debug('ReconnectingWebSocket', 'send', url, data);
            }
            return ws.send(data);
        } else {
            throw 'INVALID_STATE_ERR : Pausing to reconnect websocket';
        }
    };

    this.close = function() {
        if (ws) {
            forcedClose = true;
            ws.close();
        }
    };

    /**
     * Additional public API method to refresh the connection if still open (close, re-open).
     * For example, if the app suspects bad data / missed heart beats, it can try to refresh.
     */
    this.refresh = function() {
        if (ws) {
            ws.close();
        }
    };
}

/**
 * Setting this to true is the equivalent of setting all instances of ReconnectingWebSocket.debug to true.
 */
//ReconnectingWebSocket.debugAll = false;


var ws = new ReconnectingWebSocket(url);

ws.onopen = function() {
	console.log('send');
    var message = { "cmd":"auth" };
    ws.send(JSON.stringify(message));
};
ws.onmessage = function(message, flags) {
    var data = JSON.parse(message.data);
	console.log(data);
};

/*
===========================
function start(url) {

    var ws = new WebSocket(url);
    var timerID=0;


    */
/* initiate what has to be done *//*


    ws.on('open', function(event){
        */
/* as what was before *//*

        console.log('open');
        ws.send('something');
        if(timerID){ */
/* a setInterval has been fired *//*

            console.log('open', 'create');
            clearInterval(timerID);
            timerID=0;
        }
        */
/* ... *//*

    });
    ws.on('message', function(data, flags) {
        console.log('data');
        console.log(data);
    });

    ws.on('error', function(event){
        clearInterval(timerID);
        if(!timerID){ */
/* avoid firing a new setInterval, after one has been done *//*

            timerID=setInterval(function(){start(url)}, 1000);
            console.log('error', timerID);
        }
    });

    ws.on('close', function(event){
        clearInterval(timerID);
        */
/* ... *//*

        if(!timerID){ */
/* avoid firing a new setInterval, after one has been done *//*

            timerID=setInterval(function(){start(url)}, 5000);
        }
        */
/* that way setInterval will be fired only once after loosing connection *//*

        */
/* ... *//*

    });
}

start(url);

=====================
*/



/*var sjsc = require('sockjs-client');
var util = require('util');
var options ={
    transports: ['websocket']
};
var url = util.format("http://%s:%s/echo", 'localhost', 11222);
client = sjsc.create(url, options);

var message = {};
var recInterval = null;
var socket = null;


var new_conn = function() {
    client.on('connection', function () {
        clearInterval(recInterval);
        message.cmd = "h1";
        client.write(JSON.stringify(message));
    });
    client.on('data', function (msg) {

    });
    client.on('error', function (e) {
        console.error('error',e);
        recInterval = setInterval(function () {
            new_conn();
        }, 2000);
    });

    client.on('close', function (e) {
        console.log(e.message);
        recInterval = setInterval(function () {
            new_conn();
        }, 2000);
    });
};

new_conn();*/

