import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import NoteContext from "../context/notes/NotesContext";
import { useContext } from "react";
import * as React from "react";
import Dialog from "@mui/material/Dialog";

const EditNote = (props) => {
  const context = useContext(NoteContext);
  const { setEdit, edit, editNote } = context;

  //submit note to noteState note addNote function
  const handleSubmit = () => {
    editNote(
      edit.id,
      edit.title,
      edit.description,
      edit.tag,
      props.altertMessage
    );
    setOpen(false);
    setEdit({
      ...edit,
      edit_note: false,
    });
  };

  // edit model open/close state
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
    setEdit({
      ...edit,
      edit_note: false,
    });
  };

  //changing Input values of notes data using state
  const onChange = (e) => {
    setEdit({
      ...edit,
      [e.target.name]: e.target.value,
    });
  };

  return (
    // {/****************************** Notes Adding Componant ******************************************/}
    <Dialog open={open} onClose={handleClose}>
      <Box
        sx={{
          width: "100%",
          mx: "auto",
          pt: 3,
          display: "flex",
          justifyContent: "flex-start",
        }}
        textAlign="center"
      >
        <Card
          sx={{
            minWidth: 253,
            maxWidth: 253,
            border: "1px solid #0000007a",
            margin: 2,
          }}
        >
          <CardContent>
            <TextField
              label="Title"
              variant="standard"
              name="title"
              onChange={onChange}
              value={edit.title}
              minLength={3}
              required
            />
            <TextField
              label="Description"
              variant="standard"
              sx={{ my: 2 }}
              name="description"
              onChange={onChange}
              minLength={5}
              value={edit.description}
              required
            />
          </CardContent>
          <CardActions sx={{ padding: "10px 16px" }}>
            <Button
              size="small"
              sx={{ fontSize: "1rem" }}
              onClick={handleSubmit}
              disabled={edit.title.length < 3 || edit.description.length < 5}
            >
              Save
              <SaveIcon sx={{ marginLeft: "0.5rem" }} />
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Dialog>
    // {/****************************** Notes Adding Componant ******************************************/}
  );
};

export default EditNote;
