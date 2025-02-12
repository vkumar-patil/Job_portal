import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./Ejobdetails.css";


function EjobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [loadingJob, setLoadingJob] = useState(true);
  const [applicants, setApplicants] = useState([]);
  const [loadingApplicants, setLoadingApplicants] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8003/api/Posts/${id}`
        );
        if (response.data && response.data.data) {
          setJob(response.data.data);
        } else {
          console.error("Job not found.");
        }
      } catch (error) {
        console.error("Error fetching job details:", error.message);
      } finally {
        setLoadingJob(false);
      }
    };

    if (id) fetchJobDetails();
  }, [id]);

  useEffect(() => {
    console.log("Job ID for fetching applicants:", id);
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8003/api/Applys/job/${id}`
        );
        console.log("Applicants response:", response.data);
        setApplicants(response.data.data || []); // Ensure array fallback
      } catch (error) {
        console.error("Error fetching applicants:", error.message);
      } finally {
        setLoadingApplicants(false);
      }
    };

    if (id) fetchApplicants();
  }, [id]);
  const handleApplicantStatus = async (applicantId, status) => {
    try {
      // Update the applicant status (accept or reject)
      const response = await axios.patch(
        `http://localhost:8003/api/Applys/${applicantId}`,
        { status: status } // Send status as 'accepted' or 'rejected'
      );
      if (response.data.success) {
        alert(`Applicant status updated to ${status}`);
        // Optionally, send an email or notification to the applicant
        await notifyApplicant(applicantId, status);
        // Refresh the applicants list or update the state locally
        const updatedApplicants = applicants.map((applicant) =>
          applicant._id === applicantId
            ? { ...applicant, status: status }
            : applicant
        );
        setApplicants(updatedApplicants);
      } else {
        console.error("Failed to update applicant status.");
      }
    } catch (error) {
      console.error("Error updating applicant status:", error.message);
    }
  };

  const notifyApplicant = async (applicantId, status) => {
    try {
      const response = await axios.post(
        `http://localhost:8003/api/notifyApplicant`,
        { applicantId, status }
      );
      if (response.data.success) {
        console.log(`Notification sent to applicant about ${status} status.`);
      } else {
        console.error("Failed to notify applicant.");
      }
    } catch (error) {
      console.error("Error sending notification:", error.message);
    }
  };

  if (loadingJob) return <p>Loading job details...</p>;

  return (
    <>
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
      <Link to="/EmployDetail">
        <button className="btn btn-warning ml-3">Go Back</button>
      </Link>
      <div className="applicants-list">
        <h3>Applicants for this Job:</h3>
        {loadingApplicants ? (
          <p>Loading applicants...</p>
        ) : applicants.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Resume</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant, index) => (
                <tr key={applicant._id}>
                  <td>{index + 1}</td>
                  <td>{applicant.userName}</td>
                  <td>{applicant.email}</td>
                  <td>{applicant.mobile_number}</td>
                  <td>
                    <a
                      href={`http://localhost:8003/${applicant.resume}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                    </a>
                  </td>
                  <td>{applicant.status || "Pending"}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        handleApplicantStatus(applicant._id, "accepted")
                      }
                      disabled={applicant.status === "accepted"}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        handleApplicantStatus(applicant._id, "rejected")
                      }
                      disabled={applicant.status === "rejected"}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No applicants have applied for this job yet.</p>
        )}
      </div>
    </>
  );
}

export default EjobDetails;
