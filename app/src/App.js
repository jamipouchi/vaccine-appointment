import React, {useState} from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  useMatch,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./Login";
import VaccineAppointment from "./VaccineAppointment";

const App = () => {
  const logOut = () => {
    localStorage.removeItem("token");
    document.location.href = "/login";
  };
  const LogOutButton = () => {
    const login = useMatch("/login");
    if (login)
      return
    return <button className="log-out-bt" onClick={logOut} type="button">Log out</button>
  }
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <h1 className="navbar-brand">
              Vaccine Appointment site
            </h1>
            <LogOutButton/>
          </div>
        </nav>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<VaccineAppointment />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};
export default App;
