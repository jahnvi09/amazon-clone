import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import './App.css';
import "./Header.css";
import Orders from "./Orders";
import { useStateValue } from "./StateProvider";
import { db,auth } from './firebase';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

function App() {
  const promise = loadStripe("pk_test_51O2bfkSIbTDARj5T7X92keRYv1IzhdLklnPHWbLkPxD8LLWYpdH6QvJb9VqwUFUnU1PgSMpTmtcfyTeVBFzHPSoh00pEG2iilt");
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
        dispatch({
          type: "EMPTY_BASKET",
        });
      }
    });
    return () => {
      unsubscribe();
    }
  }, [dispatch]);


  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/orders">
            <Header />
           <Orders />
          </Route>
          <Route path="/payment">
            <Header />

            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/login">
            <Header />
            <Login />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;