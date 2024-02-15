import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState(null);
  useEffect(() => {
    fetchNotes();
  }, []);
  const fetchNotes = async () => {
    //fetch notes
    const res = await axios.get("http://localhost:3000/notes");
    //set it to useState
    setNotes(res.data.notes);
  };
  return (
    <div className="App">
      <div>
        <h2>==Notes==</h2>
        <hr></hr>
        {notes &&
          notes.map((note) => {
            return (
              <div>
                <h3>{note.title.toUpperCase()}</h3>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
