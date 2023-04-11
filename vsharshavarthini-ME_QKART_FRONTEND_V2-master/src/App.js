import Register from "./components/Register";
import Login from "./components/Login";
import ipConfig from "./ipConfig.json";
import {Route, Switch} from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";
// import { withStyles } from '@mui/material/styles';
import Products from "./components/Products";
import Checkout from "./components/Checkout";
import Thanks from "./components/Thanks";


export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
  //  endpoint:`65.1.251.155:8081/api/v1/auth/register`,
};

function App() {
  return (
    <Route>
    <div className="App">
          {/* <Register />
          <Login />  */}
         
          <Switch>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/register">
              <Register/>
            </Route>
            <Route exact path="/">
              <Products />
            </Route>
            <Route path="/checkout">
              <Checkout />
            </Route>
            <Route path="/thanks">
              <Thanks />
            </Route>
          </Switch>
    </div>
    </Route>
  );
}

export default App;
