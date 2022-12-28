import "./App.css";
import { Home } from "./componants/Home";
import { Navbar } from "./componants/Navbar";
import { About } from "./componants/About";
import SignIn from "./componants/SignIn";
import SignUp from "./componants/SignUp";
import { Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Auth from "./componants/Auth";
import Loader from "./componants/Loader"
import { useState } from "react";
import Alerts from "./componants/Alerts";

function App() {
  const [progress, setProgress] = useState(40);
  const handleProgress = (val)=>{
    console.log(val)
    setProgress(val)
  }
 
  // Alert message 
  const [alert, setAlert] = useState({
    messageState: false,
    message: ""
  });

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
    <>
    <NoteState>
     {progress !== 0 && <Loader loader={ progress }/> }
          <Navbar altertMessage = {altertMessage} />
      { alert.messageState && <Alerts alertState = {alert.messageState} message = {alert.message} /> }
        <Routes>
        <Route path="/" element={<Auth />}>
          <Route path="/" element={<Home />} />
        </Route>
          <Route path="/" element={<Home />} />
          <Route path="/SignIn" element={<SignIn loader={ handleProgress } altertMessage = {altertMessage}/>} />
          <Route path="/About" element={<About loader={ handleProgress } altertMessage = {altertMessage}/>} />
          <Route path="/SignUp" element={<SignUp loader={ handleProgress } altertMessage = {altertMessage}/>} />
        </Routes>
      </NoteState>
    </>
  );
}

export default App;
