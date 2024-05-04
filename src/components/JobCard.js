import React, { useState } from "react";
import { Paper } from "@mui/material";
import ElectricBoltTwoToneIcon from "@mui/icons-material/ElectricBoltTwoTone";
import "../styles/jobCard.css";

const JobCard = ({
  title,
  companyName,
  logo,
  location,
  jobDescription,
  minExp,
  maxExp,
  jdLink,
  jdUid,
}) => {
  // State to handle expansion of job description
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to format experience
  function formatExperience(minExp, maxExp) {
    if (minExp === null && maxExp === null) {
      return 0;
    } else if (maxExp === null) {
      return minExp + "+";
    } else if (minExp === null) {
      return 1;
    } else if (minExp === maxExp) {
      return minExp;
    } else {
      return minExp;
    }
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: "1rem",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid black",
        display: "flex", // Duplicate line removed
        flexDirection: "column", // Duplicate line removed
        justifyContent: "spaceBetween",
      }}
      onClick={(e) => {
        e.preventDefault();
        // Open job link in a new tab
        window.open(jdLink, "_blank");
      }}
    >
      <div className="job-card-content" style={{ flexGrow: 1 }}>
        {/* Company details */}
        <h1 className="job-card-company">
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={logo}
              alt="Company Logo"
              style={{ width: "48px", height: "48px", marginRight: "1rem" }}
            />
            <span>{companyName}</span>
          </div>
        </h1>
        {/* Job details */}
        <h2 className="job-card-title">{title}</h2>
        <p className="job-card-location">{location}</p>
        {/* Experience */}
        <p>
          <span style={{ fontWeight: "bold" }}>
            {formatExperience(minExp, maxExp)}{" "}
          </span>{" "}
          years of minimum experience
        </p>
        {/* Job description */}
        <p className="job-card-description">
          {isExpanded ? jobDescription : jobDescription.slice(0, 300)}
        </p>
        {/* Read more button */}
        {jobDescription.length > 300 && (
          <button
            className="read-more-button"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
      {/* Easy Apply button */}
      <div className="job-card-button-container" style={{ marginTop: "auto" }}>
        <button className="job-card-button">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ElectricBoltTwoToneIcon style={{ marginRight: "0.5rem" }} />
            Easy Apply
          </div>
        </button>
      </div>
    </Paper>
  );
};

export default JobCard;
