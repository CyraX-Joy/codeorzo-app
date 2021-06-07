// Requiring all necessary libraries.
const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');

// Use Express Router
app.use('/', require('./routes'));
app.use(express.static('assets'));

//setting up the view engine (ejs)
app.set('view engine', 'ejs');
app.set('views', './views');

//Listening to the port
app.listen(port, function(err){
    if(err) {
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});