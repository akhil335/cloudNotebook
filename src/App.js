import "./App.css";
import { Home } from "./componants/Home";
import { Navbar } from "./componants/Navbar";
import { About } from "./componants/About";
import SignIn from "./componants/SignIn";
import SignUp from "./componants/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";

function App() {

  return (
    <>
    <NoteState>
      <BrowserRouter>
          <Navbar />
        <Routes>
          {/* { sessionStorage.getItem('authToken') === null ?  <Route path="/" element={<Home />} /> : <Route path="/" element={<Home />} /> } */}
          <Route path="/" element={<SignIn />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="SignIn" element={<SignIn />} />
          <Route path="SignUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
