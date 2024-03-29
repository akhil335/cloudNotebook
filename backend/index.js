const dotenv = require('dotenv');
dotenv.config({path:".env"});

const connectToMongo = require('./db');
const express = require('express');

connectToMongo();

//cors 
var cors = require('cors')
const app = express()
const port = process.env.PORT || 5000;


//getting response in json 
app.use(express.json())

app.use(cors())

//available routes
app.use('/api/auth', require('./route/auth'));
app.use('/api/notes', require('./route/notes'))


app.get('/', (req, res) => {
    console.log('url')
    res.send(200, { message: 'ok' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})