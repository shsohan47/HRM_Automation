const { model } = require("mongoose");
const Note = require("../models/note")



async function CreateNotes (req, res)  {
    //Get the data from request body
    const title = req.body.title;
    const body = req.body.body;
    const type = req.body.type;
    try {
      //create a note with it
      const note = await Note.create({
        title: title,
        body: body,
        type: type,
      });
  
      //response with created note
      res.json({ note });
    } catch (err) {
      console.error("Error with creating note: ", err);
      if (!title) {
        return res.status(400).json({
          error_message: "Please Give a title first!",
        });
      } else {
        res
          .status(500)
          .json({
            error_message: "failed to create Note , Internal server Error",
          });
      }
    }
  }


  //Update Note
  async function UpdateNote(req, res)  {
    //get the id
    const noteId = req.params.id;
  
    //get the data for update from req body
    const title = req.body.title;
    const body = req.body.body;
    const type = req.body.type;
    //find and update the record
    await Note.findByIdAndUpdate(noteId, {
      title: title,
      body: body,
      type: type,
    });
  
    const note = await Note.findById(noteId)
  
    //respond
    res.json({note: note})
  }


  //Delete note
  async function DeleteNote (req,res)
{
    //get id
    const noteId = req.params.id;
    try{

    
    //find and delete id
    const result =  await Note.deleteOne({ _id: noteId });

    //respond
    res.json({
        success_message: "Record Deleted Successfully"
    })
}catch(err)
{
   
    
        res.status(200).json({
            error_message:"No note found based on the Id" ,
            error: err.message
        })
        
    
}
}
//Fetch Notes
async function fetchNote  (req, res)  {
    //find the notes
    try{
      
    const notes = await Note.find();
    //respond on them
    res.json({ notes: notes });
    }catch(err)
    {
      if(err)
      {
         return console.log(err)
      }
      return res.status(500,{error_message:"Internal server error"})
    }
  
  }

  //Fetch note by id
  async function FetchNoteID (req, res) {
    //Get it from the url
    const note_id = req.params.id;
    //find individual notes
    const note = await Note.findById(note_id);
    //respond on it
    res.json({
      note: note,
    });
  }

 module.exports = {
    CreateNotes,
    UpdateNote,
    DeleteNote,
    fetchNote,
    FetchNoteID
 }
  