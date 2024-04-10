import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// axios.defaults.baseURL = 'https://temp-map-server.onrender.com';
axios.defaults.baseURL = 'http://localhost:3000';

const postData = createAsyncThunk(
  "tmStorage/putData",
  async function (data: { table: string; file?: File }, { rejectWithValue }) {
    const newData = new FormData();
    if (data.file) newData.append("file", data.file);

    return await axios
      .post("/api/temps", newData)
      .then((responce) => {
        return { status: responce.status, path: responce.data.path };
      })
      .catch((error) => {
        return rejectWithValue(error.message);
      });
  }
);

export default postData;
