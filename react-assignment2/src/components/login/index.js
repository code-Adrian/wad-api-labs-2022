import React, { useCallback, useContext, useState } from "react";
import { Navigate } from "react-router";
import fireapp from "../../firebase";
import { AuthContext } from "../../contexts/auth"
import * as auth from "firebase/auth"
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = () => {
    const [textColor, setColor] = useState("white")
    const [text, setText] = useState("Login");

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await auth.signInWithEmailAndPassword(fireapp,email.value, password.value);
      } catch (error) {
       
        setText(error.toString())
        setColor("red");
      }
    },
    []
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div style={{textAlign:"center",backgroundColor: "rgba(255,255,255,0.05)",paddingBottom: "15vh", borderRadius: "2em"}}>
        <div style={{textAlign:"center", overflow:"hidden",whiteSpace: "nowrap",textOverflow: "ellipsis"}}>
        <h1 style={{color: textColor}}>{text}</h1>
        </div>
      
      <form onSubmit={handleLogin}>
        <div style={{marginTop: "2em",textAlign:"center" }}>
        <TextField variant="outlined" label="Email" name="email" type="text" InputLabelProps={{style: {color: 'white'}}} sx={{ input: { color: 'white' } }} placeholder="Email"></TextField>
        </div>
        <div style={{marginTop: "2em",textAlign:"center" }}>
        <TextField label="Password" variant="outlined" name="password" type="password" InputLabelProps={{style: {color: 'white'}}} sx={{ input: { color: 'white' } }} placeholder="Password"></TextField>
            </div>
            <div style={{marginTop: "2em", textAlign:"center" }}>
            <Button type="submit" variant="contained" color="primary" >Submit</Button>
            </div>
      </form>
    </div>
  );
};

export default Login;