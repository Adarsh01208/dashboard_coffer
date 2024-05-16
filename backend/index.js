// Importing express module 
const express = require("express");
const db = require('./config/connection');
const dataRouter = require('./routes/data');
const port = process.env.PORT || 8000;
const cors = require('cors');
const app = express();
require('dotenv').config(); 

app.use(cors());

app.use(express.json());


app.use('/', dataRouter);
// Server setup 
app.listen(port, (err) => { 
    if (err) { 
        console.log("Error in running server"); 
    }
    console.log("Yup! My Express Server is running on port", port);
})

