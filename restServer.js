/*
// Imports 
import express from 'express';

// Server initialization
const restServer = express();

// Port Variable
const port = process.env.PORT || 3000;

// Listen on Port
restServer.listen(port, () => {console.log(`Listening on ${port}...`)});
*/

require('rootpath')(); 
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log('Server listening on port ' + port));