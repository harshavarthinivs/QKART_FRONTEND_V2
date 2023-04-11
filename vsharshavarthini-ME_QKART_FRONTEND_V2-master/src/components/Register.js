import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Link } from "react-router-dom"
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState,useEffect } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import { useHistory } from "react-router-dom";
// import { CircularProgress } from '@mui/material';
import "./Register.css";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const history=useHistory();

  const[formData,setformData]=useState(
    {
      username:"",
      password:"",
      confirmPassword:""
    }
  );
  const [loading, setLoading] = useState(false);


  // const {enqueueSnackbar,closeSnackbar}=useSnackbar();
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  


  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const onChangeFunction = (event, key) => {
     
    let obj = {
      [key]:event.target.value
    }

    setformData((prev) => ({...prev,...obj}));
  }
   
  const register = async (formData) => {
    console.log(formData);
    if(!validateInput(formData))
    {
      return;
    }
    try
    {
    setLoading(true);
    let data= await axios.post(config.endpoint+"/auth/register",{
      username:formData.username,
      password:formData.password
    });
    // console.log(data);
    setLoading(false);
    if(data.status===201)
    {
      enqueueSnackbar("Registered successfully",
      {variant:"success"}
      );
    }
    history.push("/login");
  }


  catch(err)
  {
    setLoading(false);
    console.log("error:",err.response);
    if(err.response.status===400)
    {
      // console.log("404 error");
      enqueueSnackbar(err.response.data.message,{
        variant:'error'
      });

    }
    else
    {
      setLoading(false);
      console.log("went wrong");
      enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.",{
        variant:"error"
      });
    }
  }

    // let datares=data.json();
  
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    // console.log("vinp",data);
    // console.log("vinp",data.username);
    // console.log("len",data.username.length);
    if(data.username.length===0)
    {
      enqueueSnackbar("Username is a required field",{variant:'failure'});
      return false;
    }
    if(data.username.length<6)
    {
      enqueueSnackbar("Username must be at least 6 characters",{variant:'failure'});
      return false;

    }
    if(data.password.length===0)
    {
      enqueueSnackbar("Password is a required field",{variant:'failure'});
      return false;
    }
    if(data.password.length<6)
    {
      enqueueSnackbar("Password must be at least 6 characters",{variant:'failure'});
      return false;

    }
    if(data.password!==data.confirmPassword)
    {
      enqueueSnackbar(" Passwords do not match",{variant:'failure'});
      return false;
    }
    
    return true;

  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   */
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
           
            onChange = {(e) => onChangeFunction(e,'username')}
           

          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"

            onChange = {(e) => onChangeFunction(e,'password')}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth

            onChange = {(e) => onChangeFunction(e,'confirmPassword')}
          />
        <div style = {{display:'flex',justifyContent:'center' }} width ="100%" >
          {loading ? (
            <CircularProgress />
        
      ) : (

           <Button className="button" variant="contained" onClick={() => register(formData)}>
            Register Now
           </Button>
      )}
      </div>
          <p className="secondary-action">
            Already have an account?{" "}
             {/* <a className="link" href="./login"> */}
             <Link to="/login" className="link">Login here</Link>
             
             {/* </a> */}
          </p>
        </Stack>
      </Box>
  
      <Footer />
    </Box>
  );
};

export default Register;
