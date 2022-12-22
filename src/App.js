import "./App.css";
import { Home } from "./componants/Home";
import { Navbar } from "./componants/Navbar";
import { About } from "./componants/About";
import SignIn from "./componants/SignIn";
import SignUp from "./componants/SignUp";
import { Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Auth from "./componants/Auth"

function App() {
 
  return (
    <>
    <NoteState>
          <Navbar />
        <Routes>
        <Route path="/" element={<Auth />}>
          <Route path="/" element={<Home />} />
        </Route>
          <Route path="/" element={<Home />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/About" element={<About />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </NoteState>
    </>
  );
}

export default App;
