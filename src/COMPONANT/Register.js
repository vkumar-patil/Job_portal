import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile_number, setNumber] = useState("");
  const navigate = useNavigate();

  const handleregister = async (e) => {
    e.preventDefault();

    // Validate if all fields are filled
    if (!username || !email || !password || !mobile_number) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      // Send registration data to the backend
      const response = await axios.post(
        "http://localhost:8003/api/user/Register",
        {
          username,
          email,
          password,
          mobile_number,
          // Ensure role is being sent
        }
      );

      // If registration is successful
      if (response.data) {
        localStorage.setItem("token", response.data.token); // Store token if received
        console.log(response.data);
        navigate("/"); // Redirect to login page after successful registration
      } else {
        alert("Registration failed, please try again.");
      }
    } catch (error) {
      console.error(
        "Error during registration:",
        error.response ? error.response.data : error.message
      );
      alert("There was an error with the registration. Please try again.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleregister} id="RegistrationForm">
        <h3 className="heading">Registration</h3>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">UserName</label>
            <input
              type="text"
              className="form-control"
              id="inputEmail4"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Email ID</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputCity">MobileNo</label>
            <input
              type="tel"
              className="form-control"
              id="inputCity"
              value={mobile_number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword4">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group"></div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <p>If you're already registered,</p>
        <Link to={"/"}>Login</Link>
      </form>
    </div>
  );
}

export default Register;
