import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import Notiflix from 'notiflix';

// API function
import postData from '../API/postData';

// type for itialState
interface TmInitialState {
  isUpload: boolean
  isLoading: boolean
};

const tmInitialState: TmInitialState = {

  isUpload: false,
  isLoading: false,

};

const tmSlice = createSlice({
    name: 'tmStorage',
    initialState: tmInitialState,
    reducers: {

    },

    extraReducers: 

    builder => {

      /**####################################### post ########################################### */

      builder.addCase(postData.pending, (state) => {
        state.isLoading = true; 
      });
            
      builder.addCase(postData.fulfilled, (state, action: PayloadAction<number>) => {

        state.isLoading = false;

        if(action.payload === 201) {

          state.isUpload = true;
          Notiflix.Notify.success('File uploaded successfully', {width: '450px', position: 'center-top', fontSize: '24px',});

        };
        
      });
            
      builder.addCase(postData.rejected, (state, action) => {
                    
        state.isLoading = false;
    
        Notiflix.Notify.warning(`${action.payload}`, {width: '450px', position: 'center-top', fontSize: '24px',});
        
      });
      
    },
    
    }
);

// export const {
//     changePills
// } = tmSlice.actions;
export default tmSlice.reducer;