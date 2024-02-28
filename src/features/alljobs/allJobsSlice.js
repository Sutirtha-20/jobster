import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';

//WORKING ON ALL JOBS PAGE

const initialFiltersState = {    //search parmeter initial values
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
  };
  
  const initialState = {        //what jobs will be shown initial values
    isLoading: false,
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
    stats: {},
    monthlyApplications: [],
    ...initialFiltersState,
  };

  export const getAllJobs = createAsyncThunk(
    '/allJobs/getJobs',
    async (_,thunkAPI) => {
        let url = '/jobs'
        try {
            const res = await customFetch(url,{
                headers: {
                    authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
                }
            })
            console.log(res.data);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
  )

const allJobsSlice = createSlice({
    name: 'allJobs',
    initialState,
    reducers: {
      showLoading: (state) => {
        state.isLoading = true;
      },
      hideLoading: (state) => {
        state.isLoading = false;
      },
    },
    extraReducers:{
        [getAllJobs.pending]: (state) => {
            state.isLoading = true;
          },
          [getAllJobs.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.jobs = payload.jobs;
          },
          [getAllJobs.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
          },
    }
})

export const {showLoading,hideLoading} = allJobsSlice.actions;
export default allJobsSlice.reducer;