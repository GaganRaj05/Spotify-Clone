const mongoose = require('mongoose');
async function connectToDb(url) {
    try {
        await mongoose.connect(url);
        console.log("Mongo DB connection successfull");
    }
    catch(err) {
        console.log(err.message);
        console.log("Some error connecting to the db");
    }
}
module.exports = connectToDb;