import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

const NotAuthRoute = () => {
  const context = useContext(AuthContext);

  return !!context.isAuthenticated ? ( <Navigate to={"/"}/> ) : <Outlet/> 
};


export default NotAuthRoute