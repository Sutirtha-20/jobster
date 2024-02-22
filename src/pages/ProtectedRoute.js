import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import React from 'react'

//this functionality won't let us see other pages than the landing page if we dont login
function ProtectedRoute({children}) {

  const {user} = useSelector((store)=> store.user)
  if(!user){
    return <Navigate to='/landing'/>
  }
  return children;
}

export default ProtectedRoute