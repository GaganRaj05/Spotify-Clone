const express = require('express');
const {uploadPlaylist,getPlayLists} = require("../controllers/playlist");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth")
router.post("/create-playlist",checkAuth,uploadPlaylist);
router.get("/get-playlists",getPlayLists);

module.exports = router;