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
      )}
    </div>
  );
};

export default SearchJobs;
