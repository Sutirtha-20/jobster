import { configureStore } from '@reduxjs/toolkit';
import jobSlice from './features/job/jobSlice';
import userSlice from './features/user/userSlice';
import allJobsSlice from './features/alljobs/allJobsSlice';

export const store = configureStore({
    reducer:{
        user: userSlice,
        job: jobSlice,
        allJobs: allJobsSlice,
    }
})