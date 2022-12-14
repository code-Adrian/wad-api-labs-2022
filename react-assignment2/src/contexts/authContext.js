import React, { useState, createContext} from "react";
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
    console.log("Welcome, the auth token is: " + authToken);
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
    if(result.code === 201){
      setToken(result.token)
      setUserName(username);
      setIsAuthenticated(true);
      
    }
    return (result.code === 201) ? true : false;
  };

  const signout = () => {
    setTimeout(() => setIsAuthenticated(false), 100);
  }


const deleteaccount = async () => {
  signout()
  await deleteUser(userName)
  setIsAuthenticated(false);
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