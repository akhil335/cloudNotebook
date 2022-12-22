const mongoose = require('mongoose');
const { Schema } = mongoose;


//Creating Structure of the Collection
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    data: {
        type: Date,
        default: Date.now
    }

});

//creating model and exporting it
let user = mongoose.model('users', UserSchema);
module.exports = user;