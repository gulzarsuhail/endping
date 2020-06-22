const PORT = 3002;
require("dotenv").config();

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const { loginRequired, ensureCorrectUser } = require("./middleware/auth");

const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chats");

// app and middleware
const app = express({ mergeParams : true });
app.use (morgan('tiny'));
app.use (bodyParser.json());
app.use (cors());

// set up route handlers
app.use("/api/auth", authRoutes);
app.use("/api/chats", loginRequired, ensureCorrectUser, chatRoutes);

// handle 404
app.use ((req, res, next) => {
    const err = new Error('Invalid endpoint');
    err.status = 404;
    next (err);
});

// handle errors
app.use ((err, req, res, next) => {
    // console.log(err);
    const statusCode = err.status || 500;
    res.status(statusCode).json({error: err.message});
});


// start listening
app.listen(PORT, ()=>console.log(`Server started on port ${PORT}...`));