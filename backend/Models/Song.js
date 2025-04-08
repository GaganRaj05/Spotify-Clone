const mongoose = require('mongoose');

const songsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    artist:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"users",
        required:true,
        
    },
    thumbnail: {
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true,
    },
    fileUrl: {
        type:String,
        required:true
    }
})
const Song = mongoose.model("songs",songsSchema);

module.exports = Song;