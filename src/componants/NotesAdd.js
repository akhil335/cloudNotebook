import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import NoteContext from "../context/notes/NotesContext";
import { useContext, useState } from "react";


const NotesAdd = (props) => {

  const context = useContext(NoteContext);
  const {addNote} = context;
  const[note, setNote] = useState({title: "", description: "", tag: "general"});
  //setting error for notes fields
  const [error, setError] = useState({
    title: false,
    description: false
  });

  //submit note to noteState note addNote function
  const handleSubmit = () =>{
    addNote(note.title, note.description, note.tag);
    props.altertMessage(true, "your note has been added !");
    setNote({title: "", description: "", tag: "general"})
  }


  //changing Input values of notes data using state
  const onChange = (e) =>{
    setNote({
      ...note,
      [e.target.name] : e.target.value
    })

    // ****************************  error checking  *************************************
    if(e.target.name === "title"){
      if(e.target.value.length > 0 && e.target.value.length < 3){
        setError({...error, title: true})
      }else{
        setError({...error, title: false})
      }
    }
    if(e.target.name === "description"){
      if(e.target.value.length > 0 && e.target.value.length < 5){
        setError({...error, description: true})
      }else{
        setError({...error, description: false})
      }
    }
    // ****************************  /error checking  *************************************
  }

  return (
    <>

    {/****************************** Notes Adding Componant ******************************************/}
      <Box
        sx={{
          width: "100%",
          mx: "auto",
          pt: 3,
          display: 'flex',
         'justifyContent': 'flex-start'
        }}
        textAlign="center"
      >
      <Card sx={{ minWidth: 253, maxWidth: 253, border: '1px solid #0000007a', margin: 2 }}>
        <CardContent>
        <TextField error={error.title} helperText={error.title && "title should be more then 2 letters."} id="title" label="Title" variant="standard" name="title" onChange={onChange} value={note.title}/>
        <TextField error={error.description} helperText={error.description && "title should be more then 5 letters."} id="desc" label="Description" variant="standard" sx={{ my: 2}} name="description" onChange={onChange} value={note.description}/>
        </CardContent>
        <CardActions sx ={{padding: '10px 16px'}}>
          <Button size="small" sx={{fontSize : '1rem'}} onClick= {handleSubmit} disabled = {!(note.title.length > 2) ||
          !(note.description.length > 4)}>Add <AddIcon /></Button>
        </CardActions>
      </Card>
      </Box>
    {/****************************** Notes Adding Componant ******************************************/}
    
    </>
  );
};


export default NotesAdd;