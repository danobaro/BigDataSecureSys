import axios from 'axios'

const API_URL = '/api/bills/'

// Register patient
const createBill = async (patientData, token) =>{
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, patientData, config)
   return response.data
}

// Get patients
const getBills = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL, config)
  
    return response.data
  }
  
  // Get patient
  const getBill = async (patientId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL + patientId, config)
  
    return response.data
  }

  // Delete Patient
const deleteBill = async (patientId, token) => {
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

const billService ={
    createBill,
    getBills,
    getBill,
    deleteBill,
}

export default billService