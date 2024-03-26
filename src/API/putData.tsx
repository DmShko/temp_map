import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = 'http://localhost:3000';

const putData = createAsyncThunk(
    'tmStorage/putData', 
    async function (data: { table: string; }, { rejectWithValue }) {
       
        return await axios.post('/api/temps', data).then((responce) => {
           
            // console.log(userCredential)
            return responce;
            
        })
        .catch((error) => {

            return rejectWithValue(error.message);

        });

    // try {
    //    return await axios.post('/temps', data);
    // }
    // catch {
    //     return rejectWithValue('Something went wrong'); 
    // };
});

export default putData