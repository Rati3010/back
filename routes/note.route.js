const express = require('express');
const { authenicate } = require('../middleware/authentication');
const { NoteModel } = require('../models/notes.model');

const noteRouter = express.Router();


noteRouter.get("/",async (req,res)=>{
      try {
        const notes = await NoteModel.find()
        res.send(notes);
      } catch (error) {
        res.send({'err':"something went wrong"});
      }
})
noteRouter.post("/create", authenicate,async(req,res)=>{
    const payload = req.body;
    try {
        const note = new NoteModel(payload);
        await note.save();
        res.send("added successfully")
    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
})
noteRouter.patch("/edit/:userID", authenicate,async (req,res)=>{
    const payload = req.body;
    const userId = req.body.userId
    const userID = req.params.userID
    const note = await NoteModel.findOne({_id:userID});
    if(userId !== note.userID){
        res.send("not authorized");
    }else{
        try {
            await NoteModel.findByIdAndUpdate({_id : noteID},payload)
            res.send({"msg" : "Note updated successfully"})
        } catch (error) {
            console.log(error);
            res.send("something went wrong");
        }
    }
})
noteRouter.delete("/delete/:noteID", authenicate,async (req, res) => {
    const noteID = req.params.noteID
    const userID = req.body.userID
    const note = await NoteModel.findOne({_id:noteID})
    if(userID !== note.userID){
        res.send("Not authorised")
    }
    else{
        await NoteModel.findByIdAndDelete({_id : noteID})
        res.send({"msg" : "Note deleted successfully"})
    }
})

module.exports = {noteRouter}