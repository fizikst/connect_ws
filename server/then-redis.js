var redis = require('then-redis');

var db = redis.createClient();


/*db.set('my-key', 1);
db.incrby('my-key', 5);
db.get('my-key').then(function (value) {
	console.log(value);
//  assert.strictEqual(value, 6);
});

db.mset({ a: 'one', b: 'two' });
db.mget('a', 'b').then(function (values) {
	console.log(values);
//  assert.deepEqual(values, [ 'one', 'two' ]);
});

db.sadd('my-set', 1, 2, 3);
db.sismember('my-set', 3).then(function (value) {
	console.log(value);
  //assert.strictEqual(value, 1);
});*/

var originalHash = { a: 'one', b: 'two' };
db.hmset('my-hash', originalHash);
db.hexists('my-hash', 'a1').then(function (h){
	console.log(h);
});
db.hgetall('my-hash').then(function (hash) {
 	console.log(hash);
  //assert.deepEqual(hash, originalHash);
});
