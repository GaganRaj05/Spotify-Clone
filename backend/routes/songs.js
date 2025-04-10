const express = require('express');
const upload = require("../config/multerConfig");
const {getSongs,getParticularSongs,uploadSong,getTopFiftySongs} = require("../controllers/songs")
const multerErrorHandler = require("../middlewares/multerErrorHandler")
const checkAuth = require("../middlewares/checkAuth")
const router = express.Router();

router.post("/upload-song",checkAuth,upload,multerErrorHandler,uploadSong);
router.get("/songs",getSongs);
router.get("/songs/:id",checkAuth,getParticularSongs);
router.get("/top-50-songs",getTopFiftySongs)
module.exports = router;