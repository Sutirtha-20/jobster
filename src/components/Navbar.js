import React from 'react'
import Wrapper from '../assets/wrappers/Navbar';
// import {FaHome} from 'react-icons/fa'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Logo from './Logo';
import { useState } from 'react';   //this usestate will handle if user is logged in locally
import {useDispatch,useSelector} from 'react-redux'
import { toggleSidebar, logoutUser } from '../features/user/userSlice';

function Navbar() {
  const [showLogout, setShowLogout] = useState(false);
  const {user} = useSelector((store)=> store.user)
  console.log(user);
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleSidebar())
  }
  
  const logout = () => {
    dispatch(logoutUser())
  }
  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" type='button' onClick={toggle}>
          <FaAlignLeft/></button>
          <div>
            <Logo/>
            {/* <div className="logo-text">Dashboard</div> */}
          </div>
          <div className="btn-container">
            <button type='button' className='btn' onClick={() => setShowLogout(!showLogout)}>
              <FaUserCircle/>
              {user ? user.name : "Guest"}
              <FaCaretDown/>
            </button>
            <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button
              type='button'
              className='dropdown-btn'
              onClick={logout}
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