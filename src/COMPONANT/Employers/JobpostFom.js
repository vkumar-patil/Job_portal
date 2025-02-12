import axios from "axios";
import React from "react";
import { useState } from "react";
function JobpostFom() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [posted_date, setPosted_date] = useState("");
  const handleapply = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:8003/api/Posts/Post", {
      title,
      company,
      location,
      salary,
      description,
      posted_date,
    });
    if (response.data) {
      console.log("Post Uplode Done");
      alert("Post Uplode Done");
    } else {
      console.log("data not found");
    }
  };
  return (
    <div>
      <form onSubmit={handleapply}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="inputtitle">Job Title</label>
            <select
              className="form-control"
              id="inputtitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            >
              <option value={""}>Select</option>
              <option value={"Software Engineer"}>"Software Engineer"</option>
              <option value={"Data Analyst"}>"Data Analyst"</option>
              <option value={"Project Manager"}>"Project Manager"</option>
              <option value={"UX Designer"}>"UX Designer"</option>
              <option value={"DevOps Engineer"}>"DevOps Engineer"</option>
              <option value={"MERN Devloper"}>"MERN Devloper"</option>
            </select>
          </div>
          <div className="form-group col-md-6">
            <label for="inputPassword4">Company Name</label>
            <input
              type="text"
              className="form-control"
              id="inputCompanyName"
              placeholder="CompanyName"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label for="inputAddress">Location</label>
          <input
            type="text"
            className="form-control"
            id="inputlocation"
            placeholder="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label for="inputSalary">Salary</label>
            <input
              type="text"
              className="form-control"
              id="inputSalary"
              placeholder="Salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="inputdescription">Description</label>
            <input
              type="text"
              className="form-control"
              id="inputdescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group col-md-2">
            <label for="Posted-Date">Posted-Date</label>
            <input
              type="date"
              className="form-control"
              id="Posted-Date"
              value={posted_date}
              onChange={(e) => setPosted_date(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default JobpostFom;
