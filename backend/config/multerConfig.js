const multer = require('multer');

const storage = multer.memoryStorage();
const fileFilter = (req, file,cb)=> {
    if(file.fieldname === "audio" && !file.mimetype.startsWith('audio/')) {
        console.log("this is from ",file.mimetype)
        cb(new Error('Only audo files are allowed'), false);
    }
    else if(file.fieldname === "thumbnail" && !file.mimetype.startsWith('image/')) {
        cb(new Error('Only image files are allowed!'), false);
    }
    else {
        cb(null, true);
    }
}

const upload = multer({
    fileFilter:fileFilter,
    storage:storage,
    limits:{fileSize: 30*1024*1024}
}).fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
  ]);

module.exports = upload;