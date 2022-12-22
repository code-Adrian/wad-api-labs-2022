import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

const AuthRoute = () => {
  const {currentUser} = useContext(AuthContext);
  console.log(currentUser)
  return currentUser ? <Outlet/> : ( <Navigate to={"/login"}/> )
};


export default AuthRoute