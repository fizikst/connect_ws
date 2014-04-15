var util = require("util");
var rabbit = require("rabbit-pub-sub");

var logger = {
    info: function(str) {
        console.log(str);
    }
};

var config = {
    server: "localhost",
    queue: "test-queue",
    exchange: "test-exchange"
};

var subscriber = new rabbit.MessageSubscriber(config, logger,
    function(message) {
        logger.info("Received message: " + util.inspect(message));
        //subscriber.end(); // Not doing this will leak connections!
    });

new rabbit.MessagePublisher(config, logger, function(publisher) {
/*    publisher.publish({
        name: "fir3pho3nixx",
        email: "fir3pho3nixx@gmail.com"
    });*/
    publisher.publish({ name: "any beneki" });
    //publisher.end(); // Not doing this will leak connections!
});
