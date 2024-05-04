import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state for the jobs slice
const initialState = {
  jobs: [], // List of jobs
  loading: false, // Indicates if jobs are being fetched
  error: null, // Stores any error occurred during fetching
  response: "", // Response message after fetching jobs
  originalJobs: [], // Store the original list of jobs
  totalJobs: 0, // Total number of jobs available
  filters: {
    // Initial filter values
    minExp: "",
    companyName: "", // Initialize companyName filter
    location: "",
    type: "",
    role: "",
    minBasePay: "",
    // Add other filters as needed
  },
  offset: 0, // Offset for pagination
};

const API_URL = "https://api.weekday.technology/adhoc/getSampleJdJSON";

// Async thunk to fetch jobs
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

    // Return fetched jobs list and total count
    return [response.data["jdList"], response.data["totalCount"]];
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
});

// Reducer slice for jobs
const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    // Action to update state
    updateState(state, action) {
      state.updateState = action.payload;
    },
    // Action to clear response message
    clearResponse(state) {
      state.response = "";
    },
    // Action to set filter values
    setFilter(state, action) {
      const { filterName, value } = action.payload;
      state.filters[filterName] = value;
      applyFilters(state); // Apply filters after updating
    },
    // Action to increment offset for pagination
    incrementOffset: (state) => {
      state.offset += 10; // Increment offset by 10
    },
    // Action to clear all filters
    clearAllFilters: (state) => {
      // Reset all filter values to their initial state
      state.filters = initialState.filters;
      // Reapply filters to jobs based on the reset filter values
      applyFilters(state);
    },
  },
  extraReducers: (builder) => {
    builder
      // Action when fetching jobs is pending
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      // Action when fetching jobs is fulfilled
      .addCase(fetchJobs.fulfilled, (state, action) => {
        if (state.offset > 0)
          state.jobs = [...state.jobs, ...action.payload[0]];
        else state.jobs = action.payload[0];
        state.originalJobs = state.jobs;
        state.totalJobs = action.payload[1];
        state.loading = false;
        state.response = "Jobs successfully fetched.";
      })
      // Action when fetching jobs is rejected
      .addCase(fetchJobs.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch jobs.";
        state.loading = false;
      });
  },
});

// Function to apply filters to jobs
const applyFilters = (state) => {
  const { minExp, companyName, location, type, role, minBasePay } =
    state.filters;
  let filteredJobs = [...state.originalJobs];

  if (minExp) {
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

  if (minBasePay !== null && minBasePay !== "") {
    // Filter jobs based on minimum base pay only if it's a number
    const numericMinBasePay = parseFloat(minBasePay);
    if (!isNaN(numericMinBasePay)) {
      filteredJobs = filteredJobs.filter(
        (job) => job.minJdSalary <= numericMinBasePay
      );
    }
  }

  state.jobs = filteredJobs; // Update filtered jobs in state
};

// Export actions
export const {
  updateState,
  clearResponse,
  setFilter,
  incrementOffset,
  clearAllFilters,
} = jobSlice.actions;

// Export reducer
export default jobSlice.reducer;
