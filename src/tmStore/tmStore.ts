import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import Notiflix from 'notiflix';

// API function
import postData from '../API/postData';

// type for itialState
interface TmInitialState {
  
  isLoading: boolean
  fileName: string,
};

interface Res {
  status: number
  path: string
}

const tmInitialState: TmInitialState = {

  isLoading: false,
  fileName: '',

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
        state.isLoading = false; 
      });
            
      builder.addCase(postData.fulfilled, (state, action: PayloadAction<Res>) => {

        state.isLoading = true;

        if(action.payload.status === 201) {

          state.fileName = action.payload.path;
          Notiflix.Notify.success('File uploaded successfully', {width: '450px', position: 'center-top', fontSize: '24px',});

        };
        
      });
            
      builder.addCase(postData.rejected, (state, action) => {
                    
        state.isLoading = true;
    
        Notiflix.Notify.warning(`${action.payload}`, {width: '450px', position: 'center-top', fontSize: '24px',});
        
      });
      
    },
    
    }
);

// export const {
//     changePills
// } = tmSlice.actions;
export default tmSlice.reducer;