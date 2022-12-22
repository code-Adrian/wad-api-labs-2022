import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

const NotAuthRoute = () => {
  const {currentUser} = useContext(AuthContext);
  console.log(currentUser)
  return !!currentUser ? ( <Navigate to={"/"}/> ) : <Outlet/> 
};


export default NotAuthRoute