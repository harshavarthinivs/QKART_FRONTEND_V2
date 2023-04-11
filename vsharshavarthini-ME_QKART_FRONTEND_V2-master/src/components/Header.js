import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

import { useHistory } from "react-router-dom";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {

  const history=useHistory();
  let logoutfunc=()=>
  {
    localStorage.clear();
    window.location.reload();
  }
  // console.log("ccc",childern);
  // console.log("hhh",hasHiddenAuthButtons);
  // const routeChange=()=><
  // {
   
  //   history.push("./products");

  // }
  
    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        {children}
        {hasHiddenAuthButtons?(
        <Button onClick={()=>history.push("/",{from:"Header"})}
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
        >
          Back to explore
        </Button>):(
          localStorage.getItem('username')!==null?(
            <Stack direction = "row" sx = {{alignItems:'center',justifyContent:'center'}}spacing ={2}>
            
              <Avatar alt = "Crio.do" src = "avatar.png" />
              {localStorage.username}
              <Button  onClick={()=>logoutfunc()}>Logout</Button>
              </Stack>
          ):(
          <Box>
          <Button onClick={()=>history.push("/login")}>Login</Button>
          <Button variant="contained" onClick={()=>history.push("/register")}>Register</Button>
          </Box>)
        )
      }
      </Box>
    );
};

export default Header;
