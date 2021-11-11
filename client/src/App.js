import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Home from "./components/userComponents/Home";
import Sell from "./components/userComponents/Sell";
import Placeorder from "./components/userComponents/Placeorder";
import Orders from "./components/userComponents/Orders";
import Boughtstatus from "./components/userComponents/Boughtstatus";
import Soldstatus from "./components/userComponents/Soldstatus";
import Register from "./components/authComponents/Register";
import Login from "./components/authComponents/Login";
import ResetPassword from "./components/authComponents/Resetpassword";
import ForgotPassword from "./components/authComponents/Forgotpassword"
import Payment from "./components/userComponents/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector, useDispatch } from "react-redux";
import {useEffect,useState} from "react";
import AllUsers from "./components/adminComponents/AllUsers"
import AllBooks from "./components/adminComponents/AllBooks"
import AllOrders from "./components/adminComponents/AllOrders"
import { LOGIN_SUCCESS } from "./constants/authConstants";
import AdminHome from "./components/adminComponents/AdminHome";
function App() {
  let dispatch=useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
const stripeApiKey="pk_test_51Ja1UGSFkqJZGOrfsOxNfWt7p6hlf0Ugfp50OLXBWRRcnJUimj4S7vWpc8laOqPeEs0pi4XZFvDnjsAD1PIx2D9d00r5KO6AV8";

 useEffect(()=>{
        if(window.localStorage.getItem("user")){
        dispatch({type:LOGIN_SUCCESS,payload:JSON.parse(window.localStorage.getItem("user"))});
        }
  },[])
  return (
    <>
      <Router>
          <Switch>
           <Route path="/login">
            <Login/>
          </Route>
           <Route path="/register">
            <Register/>
          </Route>
          <Route path="/passwordreset/:resetToken">
            <ResetPassword/>
          </Route>
          <Route path="/forgotpassword">
            <ForgotPassword/>
          </Route>
          <Route path="/sell">
            <Sell/>
          </Route>
          <Route path="/placeorder">
            <Placeorder/>
          </Route>
          <Route path="/boughtstatus">
            <Boughtstatus/>
          </Route>
          <Route path="/soldstatus">
            <Soldstatus/>
          </Route>
          <Route path="/orders">
            <Orders/>
          </Route>
          <Route path="/allorders">
            <AllOrders/>
          </Route>
          <Route path="/allusers">
            <AllUsers/>
          </Route>
          <Route path="/allbooks">
            <AllBooks/>
          </Route>
          <Route path="/admin">
            <AdminHome/>
            </Route>
            <Route path="/payment">
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Payment/>
        </Elements>
          </Route> 
        <Route path="/">
            <Home/>
          </Route>
        </Switch>
    </Router>
    </>
  );
}
export default App;
