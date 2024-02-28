import React from 'react'
import { useEffect } from 'react';
import Jobs from './Jobs';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading';
import { getAllJobs } from '../features/alljobs/allJobsSlice';

function JobsContainer() {
  const { jobs, isLoading } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getAllJobs());
  },[])

  if(isLoading){
    return (
    <Wrapper>
        <Loading position="center"/>
    </Wrapper>
    )
  }

  if(jobs.length === 0){
    return(
    <Wrapper>
        <h2>No Jobs to display.....</h2>
    </Wrapper>
    )
  }

  return (
    <Wrapper>
        <h5>Jobs info</h5>
        <div className="jobs">
            {jobs.map((job)=> {
                console.log(job);
                return <Jobs key={job._id} {...job}/>
            })}
        </div>
    </Wrapper>
  )
}

export default JobsContainer