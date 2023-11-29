const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const userRouter = require("./routes/user.route.js");
const authRouter  = require('./routes/auth.route.js');

const app = express();

// Middleware for all  data
app.use(express.json());
app.use((err, req, res , next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal error server...!!!";
    return res.status(statusCode).json({
        success : false,
        statusCode, 
        message,
    });
});

// Creating an app listening and directing to mongoDB
const urimongoDB = process.env.ATLAS_URI;
mongoose
    .connect(urimongoDB)
    .then(() => {
        app.listen(4000, () => {
            console.log("Congratulations! Now you are live on MongoDB service at port :", 4000);
          });
    })

// Adiign api routes
app.use('/api/test', userRouter)
app.use('/api/auth/signup', authRouter)