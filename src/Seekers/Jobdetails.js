import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "./jobdetails.css";
import axios from "axios";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState([]);
  const [loding, setLoding] = useState(true);

  useEffect(() => {
    const fechdata = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8003/api/Posts/${id}`
        );
        if (response.data && response.data.data) {
          setJob(response.data.data);
        } else {
          console.log("data not found");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoding(false);
      }
    };
    if (id) {
      fechdata();
    } else {
      console.log("id not found");
    }
  }, [id]);
  if (loding) {
    return <p>loding.....</p>;
  }

  return (
    <>
      <Navbar />
      <div className="job-details">
        <h2>{job.title}</h2>
        <p>
          <strong>Company:</strong> {job.company}
        </p>
        <p>
          <strong>Location:</strong> {job.location}
        </p>
        <p>
          <strong>Salary:</strong> {job.salary}
        </p>
        <p>
          <strong>Description:</strong> {job.description}
        </p>
        <p>
          <strong>Posted on:</strong> {job.posted_date}
        </p>
      </div>
      <Link to={`/ApplyFom/${id}`}>
        <button className="btn btn-success">Apply</button>
      </Link>

      <Link to={"/Seekers"}>
        <button className="btn btn-warning ml-3">Go Back</button>
      </Link>
    </>
  );
}

export default JobDetails;
