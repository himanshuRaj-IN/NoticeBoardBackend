const express = require('express');
const cookieParser = require('cookie-parser');
require('./src/config/DatabaseConfig');
require('dotenv').config();


//Rotues imports 
const notice = require('./src/routes/notices');
const admin = require('./src/routes/admin');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/notice',notice);
app.use('/api/admin',admin);

app.use('/', (req, res)=>{
    res.send("Hello from express :)");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is up on port ${PORT}`);
});