const mongoose = require('mongoose');

const songlogsSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"users"
    },
    song:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"songs",
    },
    timeStamp:{
        type:Date,
        required:true,
    },
})
songlogsSchema.index({timeStamp:-1});
songlogsSchema.index({song:1});

const SongLog = mongoose.model("songlogs",songlogsSchema);

module.exports = SongLog;
