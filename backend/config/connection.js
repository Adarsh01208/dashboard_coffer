const moongose = require('mongoose');
moongose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = moongose.connection;
db.on('error', console.error.bind(console, 'Error in connecting to MongoDB'));
db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;
