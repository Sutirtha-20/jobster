import {Landing,Register,Error} from "./pages";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  AllJobs,
  Profile,
  ShareLayout,
  Stats,
  AddJob,
} from './pages/dashboard';
import React from "react";

// import styled from 'styled-components';

// const Button = styled.button`
//   background: red;
//   color: white;
//   font-size: 2rem;
// `;

// const SecondButton = styled.button`
//   background: blue;
//   color: yellow;
//   font-size: 2rem;
// `;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ShareLayout />}>
          <Route index element={<Stats />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='landing' element={<Landing />} />
        <Route path='register' element={<Register />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <ToastContainer position="top-center"/>
    </BrowserRouter>
  );
}

export default App;
