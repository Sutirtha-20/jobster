import React from 'react'
import { useState, useEffect } from 'react';
import { Logo,FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { toast } from 'react-toastify';
import { useSelector,useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const initState = {
  name: '',
  email: '',
  password: '',
  isMember: true
}

function Register() {
  const {user,isLoading} = useSelector((store) => store.user)
  const dispatch = useDispatch();
  const [values,setValues] = useState(initState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setValues({ ...values, [name]: val });   
    // above one will copy existing state values and dynamically and
    // whatevr formRow is selected its state value will be updated
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const {name,email,password,isMember} = values;
    if(!email || !password || (!isMember && !name)){
      toast.error('Please Fill Out All Fields');
      return;
    }
    //if its a member already
    if(isMember){
      dispatch(loginUser({email:email,password:password}));
      return;
    }
    dispatch(registerUser({email,name,password}))
    console.log(e.target);
  }

  const toggleMember = () => {
    setValues({...values, isMember: !values.isMember})
  }

  useEffect(() => {
    if(user){
      setTimeout(()=> {
        navigate('/')
      },3000)
    }
  }, [user,navigate])
  

  return (
    <Wrapper className='full-page'>
      <form className="form" onSubmit={onSubmit}>
        <Logo/>
        <h3>{values.isMember ? "Login" : "Register"}</h3>

        {/* name field  */}
        {!values.isMember && <FormRow name="name" type="text" value={values.name}
        handleChange={handleChange} labeltext="name"/>}
        
        {/* email field  */}
        <FormRow name="email" type="email" value={values.email}
        handleChange={handleChange} labeltext="email"/>

        {/* password field  */}
        <FormRow name="password" type="password" value={values.password}
        handleChange={handleChange} labeltext="password"/>

        <button className="btn btn-block" type='submit' disabled={isLoading}>{isLoading ? 'loading..' : 'submit'}</button>
      
        <p>{!values.isMember ? "Already a member" : "Not a member yet?"}
        <span>
          <button className='member-btn' onClick={toggleMember} type='button'>
            {!values.isMember ? "Login" : "Register"}
          </button>
        </span>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register