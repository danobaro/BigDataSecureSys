import axios from 'axios'

const API_URL = '/api/vitals/'

// Register patient
const createVitals = async (patientData, token) =>{
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, patientData, config)
   return response.data
}

// Get patients
const getVitals = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL, config)
  
    return response.data
  }
  
  // Get patient
  const getVital = async (patientId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL + patientId, config)
  
    return response.data
  }

  // Delete Patient
const deleteVitals = async (patientId, token) => {
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

const vitalsService ={
    createVitals,
    getVitals,
    getVital,
    deleteVitals,
}

export default vitalsService