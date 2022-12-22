import { Outlet, Navigate } from "react-router-dom";

const Auth = () => {
    let loggedIn = sessionStorage.getItem('authToken') !== null;
    return(
        loggedIn ? <Outlet/> : <Navigate to="/signIn" replace={true} />
    )
}

export default Auth;