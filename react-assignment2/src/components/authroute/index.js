import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
const AuthRoute = () => {
  const context = useContext(AuthContext);
  return context.isAuthenticated ? <Outlet/> : ( <Navigate to={"/login"}/> )
};


export default AuthRoute