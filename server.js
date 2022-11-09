require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');


const app = express();

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true});

const quoteSchema = new mongoose.Schema({
    text: String,
    author: String
});


const Quote = mongoose.model('Quote', quoteSchema);

app.get('/all', (req, res)=>{
    Quote.find((err, foundQuote)=>{
        !err ? res.json(foundQuote) : console.log(err);
    })
    
})

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('bootst/build'));
    app.get('*', function(req, res) {
        res.sendFile(path.resolve(__dirname, 'bootst', 'build', 'index.html'));
    })
}


let port = process.env.PORT || 3001
app.listen(port, () => {console.log(`Server started on port ${port}`);})