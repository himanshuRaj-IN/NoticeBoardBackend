const express = require('express');
require('./src/config/DatabaseConfig');
require('dotenv').config();

const notice = require('./src/routes/notices')

const app = express();
app.use(express.json());

app.use('/api/notice',notice);

app.use('/', (req, res)=>{
    res.send("Hello from express :)");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is up on port ${PORT}`);
});