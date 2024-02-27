import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { logoutUser } from '../user/userSlice';

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

  const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        handleChange : (state,{payload: {name,value}}) => {
            state[name] = value;
        },
        clearValues: (state,action) => {
          return initialState;
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
    }
  })

export const {handleChange,clearValues} = jobSlice.actions;
export default jobSlice.reducer;