
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 9123);

var server = require('http').createServer(app),
    io = require('socket.io').listen(server);

server.listen(app.get('port'));


io.sockets.on('connection', function (socket) {
//    socket.emit('news', { hello: 'world' });
    socket.emit('data', { hello: 'world' });
});

//http.createServer(app).listen(app.get('port'), function(){
//    console.log('Express server listening on port ' + app.get('port'));
//});

// all environments
/*
app.set('port', process.env.PORT || 9123);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
*/

// development only
//if ('development' == app.get('env')) {
//  app.use(express.errorHandler());
//}

app.get('/', routes.index);
//app.get('/users', user.list);


