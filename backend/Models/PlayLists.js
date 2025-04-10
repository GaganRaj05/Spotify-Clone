const mongoose = require('mongoose');

const playListSchema = new mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"users"
    },
    name:{
        type:String,
        required:true,
    },
    songs:{
        type:[mongoose.Schema.Types.ObjectId],
        required:true,
        ref:"songs"
    }
})

const PlayList = mongoose.model("playlists", playListSchema);

module.exports = PlayList;