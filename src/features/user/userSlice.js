//React Redux basically crates astatemanagement tool
//multiple states which will be changed frequently cansetup jhere
// eg-> User

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from '../../utils/localStorage';

const initialState = {
    isLoading: false,
    user: getUserFromLocalStorage()
}

// to perform http calls in redux we use asyncthunk
export const registerUser = createAsyncThunk(
    'user/registerUser',   //this is the url that will hit once we call registerUser
    async (user, thunkAPI) => {
      try {
        const res = await customFetch.post('/auth/register',user)    //this url will hit once we make the post req
        // console.log(res.data);
        return res.data;
      } catch (error) {
        // toast.error(error.response.data.msg);   //this validation is coming from server  there is also frontend validation in this one
        return thunkAPI.rejectWithValue(error.response.data.msg)   //thunkapi handles the error submission part
      }
      
  });

  export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (user, thunkAPI) => {
      try {
        // console.log(`Login User : ${JSON.stringify(user)}`)
        const res = await customFetch.post('auth/login',user)
        return res.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
      }
  

  });


const userSlice = createSlice({
    name: 'user',
    initialState,


    //extrareducers are created to handle the promise which is created by the http call done by createasyncthunk 
    // http call has 3 lifecycle methods below is the case which will happen
    extraReducers: {
      [registerUser.pending]: (state) => {
        state.isLoading = true;
      },
      [registerUser.fulfilled]: (state,action) => {
        const {user} = action.payload;
        console.log("register fullfilled" + action.payload);
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`hello there ${user.name}`)
      },
      [registerUser.rejected]: (state,action) => {
        state.isLoading = false;
        toast.error(action.payload)
      },
      [loginUser.pending]: (state) => {
        state.isLoading = true;
      },
      [loginUser.fulfilled]: (state, action) => {
        console.log("login fullfilled"+ action.payload);
        const { user } = action.payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Welcome Back ${user.name}`);
      },
      [loginUser.rejected]: (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      }
    }
})

export default userSlice.reducer;