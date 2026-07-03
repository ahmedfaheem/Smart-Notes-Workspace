import axios from "axios";

 async function createUser(data) {
    
   const response =  await axios.post('http://localhost:5000/auth/register', data)
   return response.data;
  }


async function loginUser(data) {
  const response = await axios.post('http://localhost:5000/auth/login', data)
  return response.data;
}


async function getUserProfile(token) {
  const response = await axios.get('http://localhost:5000/auth/me', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
}

async function editUserName(token, newName) {
  const response = await axios.put('http://localhost:5000/auth/me', { name: newName }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
}

export { createUser, loginUser, getUserProfile, editUserName };