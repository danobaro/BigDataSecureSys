import axios from 'axios'

const API_URL = '/api/kin/'

// Register patient
const createKin = async (patientData, token) =>{
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, patientData, config)
   return response.data
}

// Get patients
const getKins = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL, config)
  
    return response.data
  }
  
  // Get patient
  const getKin = async (patientId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL + patientId, config)
  
    return response.data
  }


   // update patient
   const updateKin = async (patientId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.put(API_URL + patientId, config)
  
    return response.data
  }

  // Delete Patient
const deleteKins = async (patientId, token) => {
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

const kinsService ={
    createKin,
    getKins,
    getKin,
    updateKin,
    deleteKins,
}

export default kinsService