import React from 'react'
import Wrapper from '../assets/wrappers/JobInfo';

function JobInfo(props) {
    const {icon,text} = props
  return (
    <Wrapper>
      <span className='icon'>{icon}</span>
      <span className='text'>{text}</span>
    </Wrapper>
  )
}

export default JobInfo