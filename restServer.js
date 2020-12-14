// Imports 
const express = require('express');

// Server initialization
const restServer = express();

// Port Variable
const port = process.env.PORT || 3000;

// Listen on Port
restServer.listen(port, () => {console.log(`Listening on ${port}...`)});