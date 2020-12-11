
// Imports 
const express = require('express'); 
const firebase = require('firebase'); 
const mysql = require('mysql'); 

// Server initialization
const restServer = express(); 

// Creating a MySQL connection
const main = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Dovahkiin@0405'
  });

// Connect 
main.connect((error) => {
    if (error) {
        throw error; 
    } 
    else {
        console.log('Connection successful!');
    }
})

// Queries
restServer.get('/database', (req, res) => {
    let query = "";
    main.query(query, (error, result) => {
        
    })
    let query = "CREATE DATABASE main";
        main.query(query, (error, result) => {
            if (error) throw error; 
            console.log(result);
            res.send(`Query ${query} successful! Database created.`)
        });
})

restServer.get('/database/questions', (req, res) => {
    let query = "CREATE TABLE questions (question_ID INT AUTO_INCREMENT, title VARCHAR (175), body VARCHAR (255), vote_up_count SMALLINT, vote_down_count SMALLINT PRIMARY KEY (question_ID))";
    main.query(query, (error, result) => {
        if (error) throw error; 
        console.log(result); 
        res.send(`Query ${query} was successful! Questions table created.`); 
    })
})

// Port Variable
const port = process.env.PORT || 3000; 

// Listen on Port
restServer.listen(port, () => {console.log(`Listening on ${port}...`)}); 
