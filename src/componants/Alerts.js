import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { useState } from "react";

export default function Alerts(props) {

      // success alert closing state
  const [open, setOpen] = useState(true);
  setTimeout( ()=>{
    open && setOpen(false)
  }, 3000) 

  return(
// alert will be shown by this componant
<Stack sx={{ width: '100%' }} spacing={2}>
<Collapse in={open}>
     <Alert action={
           <IconButton
             aria-label="close"
             color="inherit"
             size="small"
             onClick={() => {
               setOpen(false);
             }}>
             <CloseIcon fontSize="inherit" />
             </IconButton>}
           sx={{ fontSize: '1.2rem', alignItems: 'center' }}>{props.message}</Alert>
 </Collapse>
 </Stack>
  )
}