import NoteContext from "./NotesContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "https://cloudnote-api.onrender.com";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const [edit, setEdit] = useState({
    edit_note: false,
    id: "",
    title: "",
    description: "",
    tag: "genral",
  });

  //FETCH Notes
  const getAllNotes = async () => {
    //fetching all notes from api
    const response = await fetch(`${host}/api/notes/getallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem('authToken'),
      },
    });

    const json = await response.json();
    setNotes(notesInitial.concat(json));
  };

  // ADD Note
  const addNote = async (title, description, tag) => {
    // Calling addNote api
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem('authToken'),
      },
      body: JSON.stringify({
        title,
        description,
        tag,
      }),
    });

    const newNote = await response.json();
    setNotes(notes.concat(newNote));
  };

  // Delete Note
  const deleteNote = async (id, altertMessage) => {
    // Calling deleteNote api
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": sessionStorage.getItem('authToken'),
      },
    });
    const deleteNote = await response.json();
    const newNotes = notes.filter((note) => note._id !== deleteNote.id);
    //updating notes
    setNotes(newNotes);
    //showing delete message
    altertMessage(true, "your note has been deleted !");
  };

  // Edit Note
  const editNote = async (id, title, description, tag, altertMessage) => {
    // Calling updateNote api
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem('authToken'),
      },
      body: JSON.stringify({ title, description }),
    });
    const updateNoteID = await response.json();
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      //updating the note which id match to the notes id
      if (element._id === updateNoteID) {
        element.title = title;
        element.description = description;
      }
    }
    //updating notes
    altertMessage(true, "your note has been updated !");
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        addNote,
        deleteNote,
        editNote,
        getAllNotes,
        setEdit,
        edit,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
