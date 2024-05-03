import React, { useState, useEffect } from "react";
import "./App.css";
import Grid from "@mui/material/Grid";
import JobCard from "./components/JobCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, setFilter } from "./Features/Jobs";

const SearchJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const [minExp, setMinExp] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");

  const handleMinExpChange = (value) => {
    const parsedValue = parseInt(value); // or parseFloat(value) for a floating-point number
    setMinExp(parsedValue);
    dispatch(setFilter({ filterName: "minExp", value: parsedValue }));
  };

  const handleCompanyNameChange = (value) => {
    setCompanyName(value);
    dispatch(setFilter({ filterName: "companyName", value }));
  };

  const handleLocationChange = (value) => {
    setLocation(value);
    dispatch(setFilter({ filterName: "location", value }));
  };

  return (
    <div className="container" style={{ marginTop: "25px" }}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <>
          <div className="filters">
            <select
              value={minExp === null ? "" : minExp} // Bind input value to minExp from state
              onChange={(e) => handleMinExpChange(e.target.value)}
            >
              <option value="">Select min experience</option>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <option key={value} value={value}>
                  {value === 0 ? value : `${value} Years`}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={companyName}
              placeholder="Company Name"
              onChange={(e) => handleCompanyNameChange(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => handleLocationChange(e.target.value)}
            />
            <select>
              <option value="">Select Remote/on-site</option>
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
            </select>

            <input type="text" placeholder="Role" />
            <select>
              <option value="">Select Min Base Pay</option>
              <option value="10000">$10,000</option>
              <option value="20000">$20,000</option>
              <option value="30000">$30,000</option>
            </select>
          </div>

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
                    companyName={job?.["companyName"] || "Weekday"}
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
        </>
      )}
    </div>
  );
};

export default SearchJobs;
