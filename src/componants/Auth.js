import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import NoteContext from "../context/notes/NotesContext";

const Auth = () => {
    const context = useContext(NoteContext);
    const {authToken} = context;

    return(
        authToken ? <Outlet/> : <Navigate to="/sign-in" replace={true} />
    )
}

export default Auth;