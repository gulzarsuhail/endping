const PORT = 3001;
require("dotenv").config();

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require("./routes");

// app and middleware
const app = express();
app.use (morgan('tiny'));
app.use (bodyParser.json());
app.use (cors());

// set up route handlers
app.use("/api/auth", routes.auth);

// handle 404
app.use ((req, res, next) => {
    const err = new Error('Invalid endpoint');
    err.status = 404;
    next (err);
});

// handle errors
app.use ((err, req, res, next) => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({error: err.toString()});
});


// start listening
app.listen(PORT, ()=>console.log(`Server started on port ${PORT}...`));