import React from "react";
//import { IoIosNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
function MainNavbar() {
  const navigate = useNavigate();
  const [username, setusername] = useState();
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setusername(storedUsername);
    }
  }, []); // Rerun when username changes

  const handlclick = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <span className="navbar-brand">Find-Job</span>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0"></ul>
          <form className="form-inline my-2 my-lg-0">
            {/* <span style={{ fontSize: "x-large" }}>
              <IoIosNotifications />
            </span> */}
            {/* <img
              src={""}
              alt="img"
              style={{ height: "50px", borderRadius: "40%" }}
            /> */}
            <p>{username}</p>
            <button
              className="btn btn-danger rounded-pill"
              onClick={handlclick}
            >
              Log-Out
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default MainNavbar;
