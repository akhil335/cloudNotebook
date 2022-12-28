import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearDeterminate(props) {
  return (
    <Box sx={{ width: '100%', height: '5px'}}>
      <LinearProgress sx={{ height: '5px', backgroundColor: '#1976d2'}} variant="determinate" value={props.loader} />
    </Box>
  );
}
