import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const onDNIChange = (e) => {
    setDni(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const logUserIn = async () => {
    const response = await fetch("login", {
      method: "post",
      body: JSON.stringify({
        dni: dni,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await response.json();
    if (body.token) {
      localStorage.setItem("token", body.token);
      navigate("/");
    } else {
      setError("Could not log in ");
    }
  };

  return (
    <>
      <h3>Sign In</h3>
      <div className="mb-3">
        <label>DNI</label>
        <input
          value={dni}
          className="form-control"
          placeholder="Enter DNI"
          onChange={onDNIChange}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          value={password}
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={onPasswordChange}
        />
      </div>
      <div className="d-grid">
        <button onClick={logUserIn} className="btn btn-primary">
          Submit
        </button>
      </div>
      {error && <p>{error}</p>}
    </>
  );
};

export default Login;
