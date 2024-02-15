const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
    {
        title:
        {
            type:String,
            required: true
        }, 
        
        body: String,
        type: {
            type:String,
            enum:['note',"paragraph"]
        }
    }
);
//Create a model in database
const Note = mongoose.model("Notes",noteSchema)

module.exports = Note ;