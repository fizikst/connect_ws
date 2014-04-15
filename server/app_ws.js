var sockjs  = require('sockjs');
var express = require('express');
var sockjs_server = sockjs.createServer();
var path = require('path');

var connections = {};

sockjs_server.on('connection', function(socket) {

    connections[socket.id] = socket;

    socket.on('close', function() {
        delete connections[socket.id];
    });

    socket.on('data', function(message) {
        if (IsJsonString(message)) {

            var data = JSON.parse(message);
            console.log(data.cmd);

            if (data.cmd === 'auth') {
                var responseJSON = {"cmd":"auth", "token":"ok", "code":200};
                socket.write(JSON.stringify(responseJSON));
            } else {
                var responseJSON = {"cmd":"auth", "token":"ok", "code": 400};
                socket.write(JSON.stringify(responseJSON));
            }


//            console.log(JSON.parse(message));

//            var inputJSON = ParseInputMessage(message)
//                , isValid = ValidateData(inputJSON)
//                , data = {}
//                , obj = {};
//            obj.inputJSON = inputJSON;
//            obj.socket = socket;
//            obj.curTime = new Date();
//
//            if (isValid === null) {
//                if (inputJSON.cmd === 'auth') {
//                    auth(socket, inputJSON);
//                } else {
//                    rs.get({app: rsapp, token: inputJSON.token}, function(err, resp) {
//                        if (err) {
//                            data = {'code': 403};
//                            return SendResponse(socket, err, inputJSON, data);
//                        }
//
//                        if (_.isEmpty(resp)) {
//                            data = {'code': 204};
//                            return SendResponse(socket, Error('token not found'), inputJSON, data);
//                        }
//
//                        obj.resp = resp;
//                        pg.connect(connString, function(err, client, done) {
//                            if (err) {
//                                data = {'code': 500};
//                                return SendResponse(socket, err, inputJSON, data);
//                            }
//
//                            obj.client = client;
//                            switch(inputJSON.cmd){
//                                case 'get_cars':
//                                    GetCars(obj, done);
//                                    break;
//                                case 'track_start':
//                                    TrackStart(obj, done);
//                                    break;
//                                case 'location':
//                                    Location(obj, done);
//                                    break;
//                                case 'ecu':
//                                    Ecu(obj, done);
//                                    break;
//                                case 'track_stop':
//                                    TrackStop(obj, done);
//                                    break;
//                                case 'no_more_data':
//                                    NoMoreData(obj, done);
//                                    break;
//                                case 'get_pins':
//                                    GetPins(obj, done);
//                                    break;
//                                default:
//                                    break;
//                            }
//                        });
//                    });
//                }
//            } else {
//                data = {'code': 400};
//                SendResponse(socket, Error(isValid), inputJSON, data);
//            }
        }
    });
});

var app = express(); /* express.createServer will not work here */
var server = require('http').createServer(app); /*create a nodejs http server */
sockjs_server.installHandlers(server, {prefix:'/echo'}); /*use http server instead of express app */
server.listen('11222'); /*listen on http server instead of express app */
app.use(express.static(path.join(__dirname, 'public')));


/**
 * @return {boolean}
 */
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}