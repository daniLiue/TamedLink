
//modules
const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
//custom


//app
const app = express();
var corsOptions = {
    origin: "http://localhost:3000"
}
app.use(cors(corsOptions));
app.use(express.json({ extended: true }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/link', require('./routes/links'));
app.use('/t', require('./routes/redirect'));


//product
if(process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

async function start(){
    try{
        mongoose.connect(config.get("DB_URI"), {})
        app.listen(config.get("PORT"), () => { 
            console.log('Server is starting');
        })
    }catch(e){
        console.log(e);
    }
}


start();