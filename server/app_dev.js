http = require('http');
var sockjs = require('sockjs');
    var redis = require("redis"),
        client = redis.createClient();

var clients = {};
var echo = sockjs.createServer();
var curConn = 0;
echo.on('connection', function(conn) {
    clients[conn.id] = conn;    
    curConn = conn;

    conn.on('data', function(message) {

    client.on("error", function (err) {
        console.log("Error " + err);
    });

/*    client.set("string key", "string val", redis.print);
    client.hset("hash key", "hashtest 1", "some value", redis.print);
    client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
    client.hkeys("hash key", function (err, replies) {
        console.log(replies.length + " replies:");
        replies.forEach(function (reply, i) {
            console.log("    " + i + ": " + reply);
        });
        client.quit();
    });*/

//	client.set("str123", "str value", redis.print);
//	client.hset("str123", {"asd":"adad", "3wrwer":"ddsa3"});
/*client.hmset("key123", {
    "0123456789": "abcdefghij", // NOTE: key and value will be coerced to strings
    "some manner of key": "a type of value"
});*/
//var jsonObj = {"asda":"asdasdasdas", "4trwe":"asdasda"};
//client.hmset("user123", jsonObj);

// add first user
//client.sadd("users", "user:rahul");
//client.hmset("user:rahul", "username", "rahul", "foo", "bar");

// add second user
//client.sadd("users", "user:namita");
//client.hmset("user:namita", "username", "namita", "foo", "baz");


/*client.HKEYS("user1", function(err, replies) {
    replies.forEach(function (reply, i) {
	console.log("   " + i + ": " + reply);	
    })
})*/
client.hmset("hosts", "mjr", "1", "another", "23", "home", "1234");
client.hgetall("hosts", function (err, obj) {

	obj.forEach(function(cli, i){	
		console.log(cli, i);
	}) 
//    console.log(obj);
});

        console.log(message);
        conn.write(message);
    });
    conn.on('close', function() {
	delete clients[conn.id];
    });
});

var server = http.createServer();
echo.installHandlers(server, {prefix:'/echo'});
server.listen(3123, '0.0.0.0');
