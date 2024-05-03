import React, { useState } from "react";
import { Paper } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import ElectricBoltTwoToneIcon from "@mui/icons-material/ElectricBoltTwoTone";
import "../styles/jobCard.css";

const JobCard = ({
  title,
  companyName,
  location,
  jobDescription,
  minExp,
  maxExp,
  jdLink,
  jdUid,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  function formatExperience(minExp, maxExp) {
    if (minExp === null && maxExp === null) {
      return "0";
    } else if (maxExp === null) {
      return minExp + "+";
    } else if (minExp === null) {
      return maxExp;
    } else {
      return `${minExp} - ${maxExp}`;
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
        display: "flex",
        flexDirection: "column",
        justifyContent: "spaceBetween",
      }}
      onClick={(e) => {
        e.preventDefault();
        // window.open(jdLink, "_blank");
      }}
    >
      <div className="job-card-content" style={{ flexGrow: 1 }}>
        <h1 className="job-card-company">
          <div style={{ display: "flex", alignItems: "center" }}>
            <BusinessIcon style={{ marginRight: "0.5rem" }} />
            <span>{companyName}</span>
          </div>
        </h1>
        <h2 className="job-card-title">{title}</h2>
        <p className="job-card-location">{location}</p>
        <span style={{ fontWeight: "bold" }}>
          {formatExperience(minExp, maxExp)}{" "}
        </span>{" "}
        years of experience required
        <p className="job-card-description">
          {isExpanded ? jobDescription : jobDescription.slice(0, 300)}
        </p>
        {jobDescription.length > 300 && (
          <button
            className="read-more-button"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
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
