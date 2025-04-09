const cron = require('node-cron');
const redisClient = require("../config/redisConfig");
const SongLog = require("../Models/SongLog");

const cronJob = cron.schedule('0 */6 * * *', async ()=> {
    const oneWeekAgo = new Date( Date.now() - 7*24*60*60*1000);

    const topSongs = await SongLog.aggregate([
        {
            $match:{
                timeStamp:{$gte:oneWeekAgo}
            }
        },
        {
            $group:{
                _id:"$song",
                count:{$sum:1}
            }
        },
        {
            $match:{
                count:{$gt:1}
            }
        },
        {$limit:50}
    ]);
    if(topSongs.length>0) {
        const songIds = topSongs.map((song)=>song._id);
        await redisClient.set("top 50 songs",JSON.stringify(songIds));
        console.log('top 50 songs cached in redis');
    }else {
        console.log("No top songs found to cache");
    }
});
module.exports = cronJob;