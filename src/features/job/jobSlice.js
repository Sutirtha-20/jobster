import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { logoutUser } from '../user/userSlice';
import { showLoading,hideLoading,getAllJobs } from '../alljobs/allJobsSlice';

//THIS WORKING ON THE ADD JOB PAGE

const initialState = {
    isLoading: false,
    position: '',
    company: '',
    jobLocation: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    isEditing: false,
    editJobId: '',
  };

  export const createJob = createAsyncThunk(
    '/job/createJob',
    async ( job,thunkAPI ) => {
      try {
        const res = await customFetch.post('/jobs',job,{
          headers: {
            authorization: `Bearer ${thunkAPI.getState().user.user.token}`,  //sedning this as this is a protected route
          },
        })
        thunkAPI.dispatch(clearValues())
        return res.data;  
      } catch (error) {

        if(error.response.status === 401){
          thunkAPI.dispatch(logoutUser())
          return thunkAPI.rejectWithValue("unauthorized user, logout...........")
        }

      return thunkAPI.rejectWithValue(error.response.data.msg)
      }
      
    }
  )

  export const deleteJob = createAsyncThunk(
    'job/deleteJob',
    async (jobId, thunkAPI) => {
      thunkAPI.dispatch(showLoading())
      try {
        const res = await customFetch.delete(`/jobs/${jobId}`,{
          headers:{
            authorization: `Bearer ${thunkAPI.getState().user.user.token}`
          }
        })
        toast.success('job deleted');
        thunkAPI.dispatch(getAllJobs());
        return res.data;
      } catch (error) {
        thunkAPI.dispatch(hideLoading());
        return thunkAPI.rejectWithValue(error.respopnse.data.msg);
      }
    }
  )

  export const editJob = createAsyncThunk(
    'job/jobId',
    async({jobId,job},thunkAPI) => {
      try {
        const res = await customFetch.patch(`/jobs/${jobId}`,job,{
          headers:{
            authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
          }
        })
        thunkAPI.dispatch(clearValues())
        return res.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
      }
      
    }
  )

  const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        handleChange : (state,{payload: {name,value}}) => {
            state[name] = value;
        },
        clearValues: (state,action) => {
          return initialState;
        },
        setEditJob: (state,{payload}) => {
          console.log("payload"+payload);
          return{
            ...state, isEditing: true, ...payload
          }
        }
    },
    extraReducers: {
      [createJob.pending]: (state) => {
        state.isLoading = true;
      },
      [createJob.fulfilled]: (state, action) => {
        state.isLoading = false;
        toast.success('Job Created');
      },
      [createJob.rejected]: (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      },
      [editJob.pending]: (state) => {
        state.isLoading = true;
      },
      [editJob.fulfilled]: (state) => {
        state.isLoading = false;
        toast.success('Job Modified...');
      },
      [editJob.rejected]: (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      },
    }
  })

export const {handleChange,clearValues,setEditJob} = jobSlice.actions;
export default jobSlice.reducer;