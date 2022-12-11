const mongoose = require('mongoose');

const noteSchema =({
    title:String,
    about:String,
    status:Boolean
})

const NoteModel = mongoose.model("note",noteSchema);
module.exports = {NoteModel}