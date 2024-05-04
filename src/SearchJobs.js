import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Grid from "@mui/material/Grid";
import JobCard from "./components/JobCard";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobs,
  setFilter,
  incrementOffset,
  clearAllFilters,
} from "./Features/Jobs";
import ResponsiveAppBar from "./components/Navbar";

const SearchJobs = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error, offset, originalJobs, totalJobs } = useSelector(
    (state) => state.jobs
  );
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    // Fetch initial set of jobs with the current offset
    dispatch(fetchJobs(offset));
  }, [dispatch, offset]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !loading
    ) {
      // Increment offset before fetching more jobs

      setScrollPosition(window.scrollY);
      dispatch(incrementOffset());
    }

    setShowBackToTop(window.scrollY > 100);
  };

  // Restore scroll position after updating jobs
  useEffect(() => {
    // Scroll to the stored position
    window.scrollTo(0, scrollPosition);
  }, [jobs]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const [minExp, setMinExp] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [role, setRole] = useState("");
  const [minBasePay, setMinBasePay] = useState("");

  const handleInputChange = (filterName, value) => {
    switch (filterName) {
      case "minExp":
        setMinExp(value);
        break;
      case "companyName":
        setCompanyName(value);
        break;
      case "location":
        setLocation(value);
        break;
      case "type":
        setType(value);
        break;
      case "role":
        setRole(value);
        break;
      case "minBasePay":
        setMinBasePay(value);
        break;
      default:
        break;
    }

    dispatch(setFilter({ filterName, value }));
  };

  const handleClearAllFilters = () => {
    // Reset local filter states to their initial values
    setMinExp("");
    setCompanyName("");
    setLocation("");
    setType("");
    setRole("");
    setMinBasePay("");

    // Dispatch clearAllFilters action to reset Redux state
    dispatch(clearAllFilters());
  };

  return (
    <>
      <div className="container" style={{ marginTop: "25px" }}>
        <ResponsiveAppBar
          numberOfJobs={jobs?.length}
          showBackToTop={showBackToTop}
        />

        <Backdrop
          open={loading}
          style={{
            zIndex: "z-50",
            color: "inherit",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(2px)", // Add a backdrop filter for blur effect
            transform: "scale(1.05)", // Add a scaling effect
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <CircularProgress size={50} color="inherit" />
            <p style={{ color: "#333" }}>
              Hang on tight! We're loading your opportunities!
            </p>
          </div>
        </Backdrop>

        {!loading && !error && (
          <>
            <div
              className="filters"
              style={{
                padding: "10px 10px", // Adjusted padding for top and bottom spacing
                background: "linear-gradient(to bottom, #f0f0f0, #e0e0e0)", // Gradient background
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
                marginTop: "20px", // Spacing from the navbar above
                marginBottom: "20px", // Spacing from the content below
                textAlign: "center", // Center align the contents
              }}
            >
              <select
                value={minExp} // Bind input value to minExp from state
                onChange={(e) => handleInputChange("minExp", e.target.value)}
                onClick={() =>
                  setTimeout(() => {
                    window.scrollTo(0, 0);
                  }, 0)
                }
              >
                <option value="">Select min experience</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <option key={value} value={value}>
                    {value === 0 ? value : `${value} Years`}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={companyName}
                placeholder="Company Name"
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
              <select
                value={type} // Bind input value to minExp from state
                onChange={(e) => handleInputChange("type", e.target.value)}
              >
                <option value="">Select Remote/on-site</option>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
              </select>
              <select
                value={role} // Bind input value to role from state
                onChange={(e) => handleInputChange("role", e.target.value)}
              >
                <option value="">Select role</option>
                {[
                  "Backend",
                  "Frontend",
                  "Tech Lead",
                  "Full Stack",
                  "IOS",
                  "Android",
                  "Flutter",
                  "React Native",
                ].map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <select
                value={minBasePay} // Bind input value to minBasePay from state
                onChange={(e) =>
                  handleInputChange("minBasePay", e.target.value)
                }
              >
                <option value="">Select Min Base Pay</option>
                {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(
                  (value, index) => (
                    <option key={index} value={value}>
                      ${value}k
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="miscContainer">
              <button onClick={handleClearAllFilters} className="clearButton">
                Clear All Filters
              </button>
              <div className="jobCount">
                <p>
                  {/* {jobs.length} job{jobs.length !== 1 ? "s" : ""} found
                  {jobs.length !== totalJobs && (
                    <span> (out of {totalJobs} total)</span>
                  )} */}
                  Total Jobs = {totalJobs}
                </p>
              </div>
            </div>

            {jobs.length > 0 ? (
              <Grid container spacing={2}>
                {jobs &&
                  jobs.map((job, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={4}
                      key={index}
                      gap={5}
                      style={{ marginBottom: "3rem" }}
                    >
                      <JobCard
                        title={job?.["jobRole"]}
                        companyName={job?.["companyName"]}
                        logo={job?.["logoUrl"]}
                        jobDescription={job?.["jobDetailsFromCompany"]}
                        location={job?.["location"]}
                        minExp={job?.["minExp"]}
                        maxExp={job?.["maxExp"]}
                        jdLink={job?.["jdLink"]}
                        jdUid={job?.["jdUid"]}
                      />
                    </Grid>
                  ))}
              </Grid>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  marginTop: "50px",
                  animation: "fadeIn 0.5s ease",
                }}
              >
                <img
                  src="/sad.gif"
                  alt="No jobs found"
                  style={{
                    width: "50%",
                    marginBottom: "20px",
                    animation: "fadeIn 0.5s ease",
                  }}
                />
                <h1 style={{ animation: "fadeIn 0.5s ease" }}>
                  No jobs found for this criteria :(
                </h1>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default SearchJobs;
