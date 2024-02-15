//Load env
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

//import dependencies
const express = require("express");
const connectToDB = require("./config/ConnectDB");
const routeController = require("./controllers/notesControllers");
const cors = require("cors")

//configure express app
const app = express();
app.use(express.json());
app.use(cors())

//connect to database
connectToDB();

//Fetch note
app.get("/notes",routeController.fetchNote);

//fetch Single notes
app.get("/notes/:id",routeController.FetchNoteID);
//creating Note api
app.post("/create", routeController.CreateNotes);

//update notes
app.put("/update-notes/:id",routeController.UpdateNote );

//delete notes
app.delete('/delete-note/:id',routeController.DeleteNote)

//start our server
app.listen(process.env.port);
