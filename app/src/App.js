import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import VaccineAppointment from "./VaccineAppointment";

const App = () => {
  const token = localStorage.getItem("token");
  const logOut = () => {
    localStorage.removeItem("token");
  };
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>
              Vaccine Appointment site
            </Link>
            {/* Logout button */}
            <button onClick={logOut} type="button">
              Log out
            </button>
          </div>
        </nav>
        <div className="auth-wrapper">
          <div className="auth-inner">
            {!token && <Login />}
            {token && (
              <Routes>
                <Route
                  exact
                  path="/vaccine-info"
                  element={<VaccineAppointment />}
                />
              </Routes>
            )}
          </div>
        </div>
      </div>
    </Router>
  );
};
export default App;
