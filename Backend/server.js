const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const port = process.env.URL_PORT; // Use process.env.PORT or a default port like 4000


// Creating an app listening and directing to mongoDB
const urimongoDB = process.env.ATLAS_URI;
mongoose
    .connect(urimongoDB)
    .then(() => {
        app.listen(port, () => {
            console.log(`Congratulations! Now you are live on MongoDB service at port: ${port}`);
          });
    })


