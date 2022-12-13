import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import NotesAdd from "./NotesAdd";
import NoteContext from "../context/notes/NotesContext";
import { useContext } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Alerts from "./Alerts";
import { useState, useEffect } from "react";
import EditNote from "./EditNote";

export const Notes = () => {
  const context = useContext(NoteContext);
  const {notes,  deleteNote, getAllNotes, edit, setEdit} = context;
  const [alert, setAlert] = useState({
    messageState: false,
    message: ""
  });

  // calling getAllNotes in useEffect when note componant is rendering
  useEffect(() => {
    getAllNotes();
    // eslint-disable-next-line
  }, [])

  //alert message function
  const altertMessage = (value, message) =>{
    setAlert({
      ...alert,
      messageState: value,
      message: message
    });

    setTimeout(() =>{
      setAlert({
        ...alert,
        messageState: false,
      });
    }, 3000)
  }

  return (
    <Container>
      {edit.edit_note && <EditNote altertMessage = {altertMessage}/>}
      {/******************************* alert message ******************/}
      { alert.messageState && <Alerts alertState = {alert.messageState} message = {alert.message} /> }
      {/****************************** Notes Adding ******************************************/}
      <NotesAdd altertMessage = {altertMessage}/>
      {/****************************** /Notes Adding ******************************************/}

      {/****************************** All Notes showing using Map ******************************************/}
      <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
      {notes.map((note) => {
        return (
          <div key={note._id}>
          <Card
          sx={{
            minWidth: 253,
            maxWidth: 253,
            border: "1px solid #0000007a",
            margin: 2
          }}
          >
          <CardContent>
            <Typography
              sx={{ fontSize: "2rem", color: "#1976d2" }}
              color="text.secondary"
              gutterBottom
            >
              {note["title"]}
            </Typography>

            <Typography variant="body2" sx={{ width: "80%", margin: "auto" }} type='text'>
              {note["description"]}
            </Typography>
          </CardContent>
          <CardActions
            sx={{ display: "flex", justifyContent: "space-around" }}
          >
            <Button size="small" sx={{ fontSize: "1rem", pointer: "cursor" }} onClick = {(e)=>{
              setEdit({
                ...edit,
                edit_note: true,
                title: note.title,
                description: note.description,
                id: note._id,
              })
            }}>
              Edit <EditIcon />
            </Button>
            <Button size="small" sx={{ fontSize: "1rem", pointer: "cursor" }} onClick = {()=>{
              deleteNote(note._id, altertMessage) 
            }}>
              Delete <DeleteIcon />
            </Button>
          </CardActions>
        </Card>
        </div>
        )}
      )}
      {/****************************** All Notes showing ******************************************/}
      </Box>
    </Container>
  );
};

export default Notes;
