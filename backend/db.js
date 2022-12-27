// getting-started.js
const mongoose = require('mongoose');

let uri = process.env.MONGO_DB_URI || "mongodb://Sakhil335:Sakhil335@ac-4cegqpa-shard-00-00.hb3yhfn.mongodb.net:27017,ac-4cegqpa-shard-00-01.hb3yhfn.mongodb.net:27017,ac-4cegqpa-shard-00-02.hb3yhfn.mongodb.net:27017/cloudNote?ssl=true&replicaSet=atlas-a255to-shard-0&authSource=admin&retryWrites=true&w=majority";

const connectToMongo = () => {
  mongoose.connect(uri, (err)=>{
   if(err) console.log(err)
   else console.log("Connected to MongoDB")
  });
}

module.exports = connectToMongo;