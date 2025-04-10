const Song = require("../Models/Song");
const bufferToStream = require('../config/bufferToStream');
const cloudinary = require("../config/cloudinaryConfig");
const SongLog = require("../Models/SongLog");
const redisClient = require("../config/redisConfig");
async function getSongs(req, res) {
    try {
        const result = await Song.find().populate({
            path:"artist",
            select:"name"
        });
        console.log(result);
        return res.status(200).json(result);
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later");
    }
}
async function getParticularSongs(req, res) {
    try {
        const song_id = req.params.id;
        const song = await Song.find({_id:song_id},{fileUrl:1}).populate({
            path:"artist",
            select:"name profile_pic"
        });
        console.log(req.user_id)
        await SongLog.create({
            user:req.user_id,
            song:song_id,
            timeStamp:Date.now()
        });
        return res.status(200).json(song);
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later");
    }
}

async function uploadSong(req, res) {
    try {
        const thumbnailFile = req.files.thumbnail[0];
        const audioFile = req.files.audio[0];
        const {title, duration} = req.body;
        const artist = req.user_id;
        console.log(artist)

        const thumbnailUpload = await new Promise((resolve,reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder:'spotify/thumbnails',
                    resource_type:'image',
                },
                (error, result) => {
                    if(error) reject(error);
                    else resolve(result);
                }
            );
            bufferToStream(thumbnailFile.buffer).pipe(stream);
        })
        const audioUpload = await new Promise((resolve, reject)=> {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder:"spotify/audio",
                    resource_type:"video"
                },
                (error, result) => {
                    if(error) reject(error);
                    else resolve(result);
                }
            )
            bufferToStream(audioFile.buffer).pipe(stream);
        });
        await Song.create({
            title,
            artist,
            thumbnail:thumbnailUpload.secure_url,
            duration,
            fileUrl:audioUpload.secure_url
        })
        return res.status(201).json("Song uploaded successfully");
    }
    catch(err) {
        console.log(err);
        return res.status(500).json("Some error occured please try again later");
    }
}

async function getTopFiftySongs(req, res) {
    try {
        const data = await redisClient.get("top 50 songs");
        if(data) return res.status(200).json(data);
        return res.status(200).json("No data in cache");
    }
    catch(err) {
        console.log(err);
        return res.status(501).json("Some error occured please try again later");
    }
}

module.exports = {getSongs, getParticularSongs, uploadSong,getTopFiftySongs};