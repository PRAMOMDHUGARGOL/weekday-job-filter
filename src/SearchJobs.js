import React, { useEffect } from "react";
import "./App.css";
import Grid from "@mui/material/Grid";
import JobCard from "./components/JobCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "./Features/Jobs";

const SearchJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const { jobs, loading, error } = useSelector((state) => state.jobs);
  console.log(jobs);
  return (
    <div className="container" style={{ marginTop: "25px" }}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <>
          <div className="filters">
            <select>
              {["Select min experience", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                (value, index) => {
                  if (index === 0) {
                    return (
                      <option key={index} value={""}>
                        {value}
                      </option>
                    );
                  } else {
                    return (
                      <option key={index} value={value}>
                        {value} Years
                      </option>
                    );
                  }
                }
              )}
            </select>
            <input type="text" placeholder="Company Name" />
            <input type="text" placeholder="Location" />
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
                    companyName={"Weekday"}
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
