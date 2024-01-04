import axios from 'axios'

const API_URL = '/api/patients/'

// Get patient notes
const getNotes = async (patientId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + patientId + '/notes', config)

  return response.data
}

// Create patient note
const createNote = async (noteText, patientId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(
    API_URL + patientId + '/notes',
    {
      text: noteText,
    },
    config
  )

  return response.data
}

const noteService = {
  getNotes,
  createNote,
}

export default noteService
