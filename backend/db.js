// getting-started.js
const mongoose = require('mongoose');

const connectToMongo = async() => {
  await mongoose.connect('mongodb://localhost:27017/cloudNote', ()=>{
    console.log("Connected to Mongo")
  });
  
}

module.exports = connectToMongo;