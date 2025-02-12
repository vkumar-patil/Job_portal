import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import "./Seekers.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Seekers() {
  const navigate = useNavigate();
  const [job, setJob] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
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
      <Navbar />
      <div>
        <Link to={"/ApplyedFoms"}>
          <button className="btn btn-info ml-2 mb-2">
            view Applyed Applications
          </button>
        </Link>
      </div>
      <div>
        {job.map((e) =>
          e._id ? (
            <div key={e.id} className="job-card">
              <Link to={`/Jobdetails/${e._id}`}>
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

export default Seekers;
