http = require('http');
var sockjs = require('sockjs');
var q = 'tasks';
var open = require('amqplib').connect('amqp://localhost');


var clients = {};
var echo = sockjs.createServer();
var curConn = 0;
echo.on('connection', function(conn) {
    clients[conn.id] = conn;    
    curConn = conn;

		console.log('send other consumers');
		// Consumer
	/*	open.then(function(conn) {
		  var ok = conn.createChannel();
		  ok = ok.then(function(ch) {
		    ch.assertQueue(q);
		    ch.consume(q, function(msg) {
 			console.log('msg', msg.content.toString());
		      if (msg !== null) {
			    for(key in clients) {
			        if(clients.hasOwnProperty(key) && key !== curConn.id) {

					clients[key].write('test' + msg.content.toString());
				        console.log(msg.content.toString());				        
				}
			    }
			ch.ack(msg);
		      }
		    });
		  });
		  return ok;
		}).then(null, console.warn);*/


//            clients[key].write('test');

    conn.on('data', function(message) {
        console.log(message);
//        console.log('clients', clients);

	var q = 'tasks';

	var open = require('amqplib').connect('amqp://localhost');

	// Publisher
	open.then(function(conn) {
	  var ok = conn.createChannel();
	  ok = ok.then(function(ch) {
	    ch.assertQueue(q);
	    ch.sendToQueue(q, new Buffer(message));
	  });
	  return ok;
	}).then(null, console.warn);

        conn.write(message);
    });
    conn.on('close', function() {
	delete clients[conn.id];
    });
});

var server = http.createServer();
echo.installHandlers(server, {prefix:'/echo'});
server.listen(3123, '0.0.0.0');
