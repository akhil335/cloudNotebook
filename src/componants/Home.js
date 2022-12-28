import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Notes from "./Notes"

export const Home = () => {
  
  return (
    <>
      <Box
        sx={{
          width: "100%",
          mx: "auto",
          pt: 2
        }}
        textAlign="center"
      >
        <Typography variant="h4" gutterBottom sx={{fontSize: {xs: '1.5rem', sm: '2.2rem'}}}>
          Your Cloud Notebook
        </Typography>
        <Notes/>
      </Box>
    </>
  );
};
