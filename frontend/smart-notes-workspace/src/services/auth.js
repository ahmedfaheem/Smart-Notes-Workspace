import axios from "axios";

 async function createUser(data) {
    
   const response =  await axios.post('http://localhost:5000/auth/register', data)
   return response.data;
  }


async function loginUser(data) {
  const response = await axios.post('http://localhost:5000/auth/login', data)
  return response.data;
}


  export { createUser, loginUser };