const redis = require('redis');

const redisClient = redis.createClient({
    url:process.env.REDIS_URL
});

redisClient.on('error',(err)=> {
    console.log(err.message);
    console.log("Some error occured while connecting to redis");
})
redisClient.connect().then(()=> {
    console.log("Redis client connected successfully");
})

module.exports = redisClient;