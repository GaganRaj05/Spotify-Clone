const express = require('express');
require("dotenv").config();
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const connectToDb = require("./config/db");
const authRoutes = require("./routes/auth");
const songsRoutes = require("./routes/songs");
const checkAuth = require("./middlewares/checkAuth");
const cronJob = require("./utils/cronJog");

const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/app/songs",checkAuth,songsRoutes);
app.use("/app/auth",authRoutes);
connectToDb(process.env.MONGODB_URL);

app.listen(process.env.PORT,()=>console.log("Server started at PORT:",process.env.PORT));