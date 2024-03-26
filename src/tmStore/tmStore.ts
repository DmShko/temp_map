import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import Notiflix from 'notiflix';

import putData from '../API/putData';

// type for one pill element
interface Pill {
    name?: string
    id: string
    status?: boolean
    prescription?: string
    quality?: number
    perDay?: number
    duration?: number
    description?: string
};

// type for itialState
interface TmInitialState {
  pills: Pill[]
  isLoading: boolean
};

const tmInitialState: TmInitialState = {

  pills: [],
  isLoading: false,
 
};

const tmSlice = createSlice({
    name: 'tmStorage',
    initialState: tmInitialState,
    reducers: {

        changePills(state, action: PayloadAction<Pill>) {
            switch (action.type) {
              case 'clearPills':
                state.pills = [];
                break;
              case 'addPill':       
                state.pills = [...state.pills, action.payload];
                break;
              case 'deletePill':
                state.pills = state.pills.filter(element => element.id !== action.payload.id);
                break;
              default: break;
            }
        },
        
    },

    extraReducers: 

    builder => {

      builder.addCase(putData.pending, (state) => {
        state.isLoading = true; 
      });
            
      builder.addCase(putData.fulfilled, (state) => {

        state.isLoading = false;
        
      });
            
      builder.addCase(putData.rejected, (state, action) => {
                    
        state.isLoading = false;
      
        Notiflix.Notify.warning(`${action.payload}`, {width: '450px', position: 'center-top', fontSize: '24px',});
        
      });
      
    },
    
    }
);

export const {
    changePills
} = tmSlice.actions;
export default tmSlice.reducer;