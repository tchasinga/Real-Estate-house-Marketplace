const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const userRouter = require("./routes/user.route.js");
const authRouter = require('./routes/auth.route.js');
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());

// CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Error-handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal error server...!!!";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Connecting to MongoDB and starting the server
const urimongoDB = process.env.ATLAS_URI;
mongoose
  .connect(urimongoDB)
  .then(() => {
    app.listen(4000, () => {
      console.log("Congratulations! Now you are live on MongoDB service at port:", 4000);
    });
  });

// Adding API routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
