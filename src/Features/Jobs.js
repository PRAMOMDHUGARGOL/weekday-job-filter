import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  jobs: [],
  loading: false,
  error: null,
  response: "",
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.loading = false;
        state.response = "Jobs successfully fetched.";
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch jobs.";
        state.loading = false;
      });
  },
});

export const { updateState, clearResponse } = jobSlice.actions;

export default jobSlice.reducer;
