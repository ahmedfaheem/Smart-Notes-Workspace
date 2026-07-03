import axios from 'axios';


const createNote = async (token, noteData) => {
  const response = await axios.post('http://localhost:5000/notes', noteData, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
};


const getNotes = async (token, filter = {})=>{
    const response = await axios.get('http://localhost:5000/notes', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      params: filter,
    });
    return response.data;
}

const getNote = async (token,noteId) => {
  const response = await axios.get(`http://localhost:5000/notes/${noteId}`, {
    headers: {
        'Authorization': `Bearer ${token}`,
      },
  });
  return response.data;
}

const updateNote = async (token, noteId, noteData) => {
  const response = await axios.patch(`http://localhost:5000/notes/${noteId}`, noteData, {
    headers: {
        'Authorization': `Bearer ${token}`,
      },
  });
  return response.data;
}

const setNotePin = async (token, noteId, isPinned) => {
  const response = await axios.patch(`http://localhost:5000/notes/${noteId}`, { isPinned }, {
    headers: {
        'Authorization': `Bearer ${token}`,
      },
  });
  return response.data;
}

const deleteNote = async (token, noteId) => {
  const response = await axios.delete(`http://localhost:5000/notes/${noteId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
}


export { createNote, getNotes, getNote, updateNote, deleteNote, setNotePin };