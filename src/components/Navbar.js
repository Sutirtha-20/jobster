import React from 'react'
import Wrapper from '../assets/wrappers/Navbar';
// import {FaHome} from 'react-icons/fa'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Logo from './Logo';
import { useState } from 'react';   //this usestate will handle if user is logged in locally
import {useDispatch,useSelector} from 'react-redux'

function Navbar() {
  const {user} = useSelector((store)=> store.user)
  console.log(user);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" type='button' onClick={() => console.log("toggle sidebar")}>
          <FaAlignLeft/></button>
          <div>
            <Logo/>
            <div className="logo-text">Dashboard</div>
          </div>
          <div className="btn-container">
            <button type='button' className='btn' onClick={() => console.log("toggle logout dropdown")}>
              <FaUserCircle/>
              {user ? user.name : "Guest"}
              <FaCaretDown/>
            </button>
            <div className='dropdown show-dropdown'>
            <button
              type='button'
              className='dropdown-btn'
              onClick={() => {
                console.log('logout user');
              }}
            >
              logout
            </button>
          </div>
          </div>
      </div>
    </Wrapper>
  )
}

export default Navbar