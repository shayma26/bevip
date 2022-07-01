const Note = require("../models/note.model");
const mongoose = require("mongoose");

//get all notes
const getAllNotes = async (req, res) => {
    const notes = await Note.find().sort({createdAt: -1});//-1 means descending order
    console.log("calling getAllnotes function...");
    res.status(200).json(notes)
}

//get a single note
const getNote = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such type of note id !"});
    }

    const note = await Note.findById(id)

    if(!note){
        return res.status(404).json({error: "No such note !"});
    }
    console.log("calling getnote function of the id "+id);
    res.status(200).json(note);
}

//create new note
const createNote = async (req, res) => {
    const {title, content} = req.body;
    
    //add doc to DB
    try{
      const newNote = await Note.create({title, content});
      res.status(200).json(newNote);
    }catch (error){
      res.status(400).json({error: error.message})
    }
  
}

//delete a note
const deleteNote = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such type of note id !"});
    }

    const note = await Note.findOneAndDelete({_id: id});
    if(!note){
        res.status(400).json({error: "Delete cannot be done"})
    }

    res.status(200).json(note);
}

//update a note
const updateNote = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such type of note id !"});
    }

    const note = await Note.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!note){
        res.status(400).json({error: "Update cannot be done"})
    }

    res.status(200).json(note);
}


module.exports = {
    createNote,
    getAllNotes,
    getNote,
    deleteNote,
    updateNote
}