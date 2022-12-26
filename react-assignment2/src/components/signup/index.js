import React, { useCallback,useState,useContext} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AuthContext } from "../../contexts/authContext"
const SignUp = () => {
  const context = useContext(AuthContext);

    const [textColor, setColor] = useState("white")
    const [text, setText] = useState("Register");

  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
    const validPassword = passwordRegEx.test(password.value);
    if(validPassword){
    try {
      await context.register(email.value,password.value)
    } catch (error) {
        setText(error.toString())
        setColor("red");
    }}else{
      setText("Password must be atleast 5 characters long in length.")
      setColor("red");
    }
     // eslint-disable-next-line
  }, []);

  return (
    <div style={{textAlign:"center",backgroundColor: "rgba(255,255,255,0.05)",paddingBottom: "15vh", borderRadius: "2em"}}>
        <div style={{textAlign:"center", overflow:"hidden",whiteSpace: "nowrap",textOverflow: "ellipsis"}}>
        <h1 style={{color: textColor}}>{text}</h1>
        </div>
      
      <form onSubmit={handleSignUp}>
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

export default SignUp;