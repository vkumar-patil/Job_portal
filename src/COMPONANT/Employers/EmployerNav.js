import React from "react";
import { useContext } from "react";
import {Usercontext} from "./useContext";
function MainNavbar() {
  const { username } = useContext(Usercontext);
  // const handleLogout = () => {
  //   // Clear localStorage to remove the token
  //   localStorage.removeItem("token");
  //   // Redirect to login page
  //   navigate("/");
  // };
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
            <p>{username ? username : "guest"}</p>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default MainNavbar;
