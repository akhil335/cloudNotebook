const mongoose = require('mongoose');
const { Schema } = mongoose;


//Creating Structure of the Collection
const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "Genral"
    },
    data: {
        type: Date,
        default: Date.now
    }

});

//creating model and exporting it
module.exports = mongoose.model('notes', NotesSchema)