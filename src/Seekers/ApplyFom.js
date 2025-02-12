import axios from "axios";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
function ApplyFom() {
  const { id } = useParams();
  const [userName, setUserName] = useState();

  const [email, setemail] = useState();
  const [mobile_number, setMobileNo] = useState();
  const [resume, setResume] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("mobile_number", mobile_number);
    formData.append("resume", resume);
    formData.append("jobid", id);

    const response = await axios.post(
      "http://localhost:8003/api/Applys/Apply",

      formData,

      {
        headers: {
          "Content-type": "multipart/ form-data",
        },
      }
    );
    if (response.data) {
      console.log("Apply Fom done");
      alert("Apply fom done");
    } else {
      console.log("data not found");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="exampleInputEmail1">User Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">MobileNo</label>
          <input
            type="tel"
            class="form-control"
            id="exampleInputPassword1"
            value={mobile_number}
            onChange={(e) => setMobileNo(e.target.value)}
          />
        </div>

        <div class="form-group">
          <label for="exampleFormControlFile1">Atach Resume Only pdf</label>
          <input
            type="file"
            class="form-control-file"
            id="exampleFormControlFile1"
            onChange={(e) => setResume(e.target.files[0])}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ApplyFom;
