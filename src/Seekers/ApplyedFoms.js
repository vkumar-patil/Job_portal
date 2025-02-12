import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ApplyedFoms() {
  const [form, setform] = useState([]);
  console.log(form);
  useEffect(() => {
    const fetchform = async () => {
      const response = await axios.get(
        `http://localhost:8003/api/Applys/applyed?userId=testUserId`
      );
      
      if (response.data && response.data.data) {
        setform(response.data.data);
       // console.log(response.data.data);
      }
    };
    fetchform();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <Link to={"/Seekers"}>
          <button className="btn btn-info ml-2 mb-2">Back</button>
        </Link>
      </div>
      <div>
        <h4 className="heading bg-success"> Aplications Status view</h4>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Sr</th>
              <th scope="col"> ID</th>
              <th scope="col">Email Address</th>
              <th scope="col">Contact Number</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {form.map((e, index) => {
              return (
                <tr>
                  <th scope="row" key={e._id}>
                    *
                  </th>
                  <td>
                    {e.job.company}
                    {e.job}
                  </td>
                  <td>{e.email}</td>
                  <td>{e.mobile_number}</td>

                  <td>{e.status || "Pending"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ApplyedFoms;
