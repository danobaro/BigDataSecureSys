import axios from 'axios'

const API_URL = '/api/patients/'

// Register patient
const regPatient = async (patientData, token) =>{
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, patientData, config)
   return response.data
}

// Get patients
const getPatients = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL, config)
  
    return response.data
  }
  
  // Get patient
  const getPatient = async (patientId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL + patientId, config)
  
    return response.data
  }

  // Delete Patient
const deletePatient = async (patientId, token) => {
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

const patService ={
    regPatient,
    getPatients,
    getPatient,
    deletePatient,
}

export default patService
