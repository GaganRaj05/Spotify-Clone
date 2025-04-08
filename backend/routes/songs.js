const express = require('express');
const upload = require("../config/multerConfig");
const {getSongs,getParticularSongs,uploadSong} = require("../controllers/songs")
const multerErrorHandler = require("../middlewares/multerErrorHandler")

const router = express.Router();

router.post("/upload-song",upload,multerErrorHandler,uploadSong);
router.get("/songs",getSongs);
router.get("/songs/:id",getParticularSongs);

module.exports = router;