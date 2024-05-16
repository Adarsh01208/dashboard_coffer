// Importing express module 
const express = require("express");
const port = 8000
const app = express();
const db = require('./config/connection');

// Handling GET / request 
app.use("/", (req, res, next) => { 
    res.send("express server"); 
}) 

// Handling GET /hello request 
app.get("/hello     ", (req, res, next) => { 
    res.send("hello response"); 
}) 

// Server setup 
app.listen(port, (err) => { 
    if (err) { 
        console.log("Error in running server"); 
    }
    console.log("Yup! My Express Server is running on port", port);
})