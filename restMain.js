
//Imports 
const express = require('express'); 
const firebase = require('firebase') 

//Server initialization
const restServer = express(); 

// Database Initialization
const database = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
}) 

const questionList = document.getElementById('questionPosts'); 

const dbRefQuestionList = firebase.database().ref().child('questionPosts'); 

dbRefQuestionList.on('value', values => {
    questionList.innerText = JSON.stringify(values.val(), null, 3);
}); 

restServer.get('/questions', (request, response) => { 
    response.send(request.query.SortBy); 
});  

//Port Variable
const port = process.env.PORT || 3000; 

//Listen on Port
restServer.listen(port, () => {console.log(`Listening on ${port}...`)}); 
