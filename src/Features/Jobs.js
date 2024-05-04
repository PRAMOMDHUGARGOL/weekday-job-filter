import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  jobs: [],
  loading: false,
  error: null,
  response: "",
  originalJobs: [], // Store the original list of jobs
  filters: {
    minExp: null,
    companyName: "", // Initialize companyName filter
    location: "",
    type: "",
    role: "",
    minBasePay: null,
    // Add other filters as needed
  },
  offset: 0,
};

const API_URL = "https://api.weekday.technology/adhoc/getSampleJdJSON";

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async (offset) => {
  const requestData = {
    limit: 10,
    offset,
  };

  try {
    const response = await axios.post(API_URL, requestData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    return response.data["jdList"];
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
});

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    updateState(state, action) {
      state.updateState = action.payload;
    },
    clearResponse(state) {
      state.response = "";
    },
    setFilter(state, action) {
      const { filterName, value } = action.payload;
      state.filters[filterName] = value;
      applyFilters(state);
    },
    incrementOffset: (state) => {
      state.offset += 10; // Increment offset by 10
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        if (state.offset > 0) state.jobs = [...state.jobs, ...action.payload];
        else state.jobs = action.payload;
        state.originalJobs = state.jobs;
        state.loading = false;
        state.response = "Jobs successfully fetched.";
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch jobs.";
        state.loading = false;
      });
  },
});

const applyFilters = (state) => {
  const { minExp, companyName, location, type, role, minBasePay } =
    state.filters;
  let filteredJobs = [...state.originalJobs];

  if (minExp !== null) {
    filteredJobs = filteredJobs.filter((job) => job.minExp <= minExp);
  }

  if (companyName) {
    filteredJobs = filteredJobs.filter((job) =>
      job.companyName.toLowerCase().includes(companyName.toLowerCase())
    );
  }

  if (location) {
    filteredJobs = filteredJobs.filter((job) =>
      job.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  if (type) {
    filteredJobs = filteredJobs.filter((job) => {
      if (type.toLowerCase() === "remote") {
        return job.location.toLowerCase() === "remote";
      } else {
        return job.location.toLowerCase() !== "remote";
      }
    });
  }

  if (role) {
    filteredJobs = filteredJobs.filter(
      (job) => job?.jobRole.toLowerCase() === role.toLowerCase()
    );
  }

  if (minBasePay !== null) {
    // Filter jobs based on minimum base pay only if it's not null
    filteredJobs = filteredJobs.filter((job) => job.minJdSalary <= minBasePay);
  }

  state.jobs = filteredJobs;
};

export const { updateState, clearResponse, setFilter, incrementOffset } =
  jobSlice.actions;

export default jobSlice.reducer;
