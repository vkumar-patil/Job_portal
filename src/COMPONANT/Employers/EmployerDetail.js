import React from "react";
import { useState, useEffect } from "react";
import EmployerNav from "./EmployerNav";
import { Getallwod } from "../Getallwod";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import axios from "axios";
function EmployDetail() {
  const navigate = useNavigate();

  const [job, setJob] = useState([]);
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        
        const token = localStorage.getItem("token");
        const role = Getallwod();
        if (role !== "Employer") {
          console.log("not allwod viw");
          navigate("/");
        }

        const response = await axios.get(
          "http://localhost:8003/api/Posts/getAll",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data && response.data.data) {
          setJob(response.data.data);
          console.log(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error.message);
        alert("Failed to fetch jobs. Please try again later.");
      }
    };
    fetchData();
  }, [navigate]);

  return (
    <>
      <EmployerNav />

      <Link to={"/JobpostFom"}>
        <button className="btn btn-warning mb-2">POST JOBS</button>
      </Link>
      <h3 style={{ backgroundColor: "yellowgreen" }}>Posted Jobs</h3>
      <div>
        {job.map((e) =>
          e._id ? (
            <div key={e.id} className="job-card">
              <Link to={`/Ejobdetails/${e._id}`}>
                <h3>{e.title}</h3>
              </Link>
              <p>
                <strong>Company:</strong> {e.company}
              </p>
            </div>
          ) : null
        )}
      </div>
    </>
  );
}

export default EmployDetail;
