import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useContext } from "react";
import { Usercontext } from "./Employers/useContext";
function Login() {
  const { setUsername } = useContext(Usercontext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handlelogin = async (e) => {
    e.preventDefault();
    if ((!email, !password)) {
      alert("envalid data fill");
    }
    try {
      const response = await axios.post(
        "http://localhost:8003/api/user/Login",
        {
          email,
          password,
        }
      );
      if (response.data.token) {
        setUsername(response.data.username);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        console.log(response.data.username);
        console.log(response.data.token);
        if (response.data.Employer === true) {
          navigate("/");
        }
      }
    } catch (error) {
      console.log("login fail", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handlelogin}>
        <h4 className="loginheding">Login</h4>
        <div className="form-group ">
          <label for="exampleInputEmail1">Email ID</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <p>if you are not registerd</p>
        <Link to={"/Register"}>Register</Link>
      </form>
    </div>
  );
}

export default Login;
