import axios from 'axios'

const API_URL = '/api/labs2/'

// Register patient
const createLabs = async (patientData, token) =>{
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, patientData, config)
   return response.data
}

// Get patients
const getLabs = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL, config)
  
    return response.data
  }
  
  // Get patient
  const getLab = async (patientId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL + patientId, config)
  
    return response.data
  }

  // Delete Patient
const deleteLabs = async (patientId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(
    API_URL + patientId,
    { status: 'deleted' },
    config
  )

  return response.data
}

const labsService ={
    createLabs,
    getLabs,
    getLab,
    deleteLabs,
}

export default labsService