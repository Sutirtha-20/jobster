import axios from 'axios';

//axios custom instance  the provided url is created to handle the backend using node
const customFetch = axios.create({
  baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit',
});

export default customFetch;