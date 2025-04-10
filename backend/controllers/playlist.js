const PlayList = require("../Models/PlayLists")
async function uploadPlaylist(req,res) {
    try {
        const user_id = req.user_id;
        const {name,songs} = req.body;
        await PlayList.create({
            user:user_id,
            name,
            songs
        });
        return res.status(201).json("Playlist created successfully");
    }
    catch(err) {
        console.log(err.message);
    }
}

async function getPlayLists(req, res) {
    try {
        const user_id = req.user_id;
        const result = await PlayList.findOne({user:user_id}).populate({
            path:"songs"
        });
        return res.status(201).json(result);
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json("Some error occured please try again later");
    }
}
module.exports = {getPlayLists, uploadPlaylist};
