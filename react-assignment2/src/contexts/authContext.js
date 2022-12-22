import React, { useState, createContext,useEffect } from "react";
import { login, signup,deleteUser } from "../api/movie-api";

export const AuthContext = createContext(null);

export const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState("");

  
  //Function to put JWT token in local storage.
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
    console.log(authToken);
  }

  const authenticate = async (username, password) => {
    const result = await login(username, password);
    if (result.token) {
      setToken(result.token)
      setIsAuthenticated(true);
      setUserName(username);
    }
  };

  const register = async (username, password) => {
    const result = await signup(username, password);
    console.log(result.code);
    if(result.code === 201){
      setIsAuthenticated(true);
    }
    return (result.code === 201) ? true : false;
  };

  const signout = () => {
    setTimeout(() => setIsAuthenticated(false), 100);
  }


const deleteaccount = async (username) => {
  signout()
  const result = await deleteUser(username)
  
  return (result.code === 201) ? true : false;
}

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        signout,
        deleteaccount,
        userName
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;