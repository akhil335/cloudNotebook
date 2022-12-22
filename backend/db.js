// getting-started.js
const mongoose = require('mongoose');

let uri = process.env.MONGO_DB_URI;

const connectToMongo = () => {
  mongoose.connect(uri, (err)=>{
   if(err) console.log(err)
   else console.log("Connected to MongoDB")
  });
}

module.exports = connectToMongo;