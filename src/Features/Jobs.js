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
    location: "", // Initialize location filter
    // Add other filters as needed
  },
};

const API_URL = "https://api.weekday.technology/adhoc/getSampleJdJSON";

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const requestData = {
    limit: 102,
    offset: 0,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.originalJobs = action.payload; // Store the original list of jobs
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
  const { minExp, companyName, location } = state.filters;
  let filteredJobs = state.originalJobs;

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

  state.jobs = filteredJobs;
};

export const { updateState, clearResponse, setFilter } = jobSlice.actions;

export default jobSlice.reducer;
