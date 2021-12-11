import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  id: "",
  qs: [],
  answer: [
    {
      index: "",
      answer: "",
    },
    {
      index: "",
      answer: "",
    },
    {
      index: "",
      answer: "",
    },
  ],
};

export const getDailyQs = createAsyncThunk(
  "dailyQuestions/fetchQs",
  async () => {
    const res = await axios.get("/api/send/dailyQuestion");
    return res.data.question;
  }
);

export const postDailyQs = createAsyncThunk(
  "dailyQuestions/postQs",
  async (data) => {
    try {
      const res = await axios.post("/api/register/addDaily", data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
);

export const DailyQsSlice = createSlice({
  name: "dailyQuestions",
  initialState,
  reducers: {
    addAnswer: (state, action) => {
      const idx = action.payload.index;
      const answer = action.payload.answer;
      state.answer[idx].index = idx;
      state.answer[idx].answer = answer;
    },
  },
  extraReducers: {
    [getDailyQs.fulfilled]: (state, { payload }) => {
      state.qs = payload.data;
      state.id = payload._id;
    },
    [postDailyQs.pending]: (state, action) => {
      console.log(action);
    },
    [postDailyQs.fulfilled]: (state, { payload }) => {
      console.log(payload);
    },
    [postDailyQs.rejected]: (state, { payload }) => {
      console.log(payload);
    },
  },
});

export const { addAnswer } = DailyQsSlice.actions;

export default DailyQsSlice.reducer;
