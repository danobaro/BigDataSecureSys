import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

function ViewStaffs () {
  const [countryItems, initCountry] = useState([])
  const fetchData = async () => {
    const response = await fetch('http://localhost:5000/api/users/getusers')
    if (!response.ok) {
      throw new Error('Data coud not be fetched!')
    } else {
      return response.json()
    }
  }
  useEffect(() => {
    fetchData()
      .then((res) => {
        initCountry(res)
      })
      .catch((e) => {
        console.log(e.message)
      })
  }, [])
  return (
    <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 gap-5">
      {countryItems.map((staffs) => {
        return (
          <div className="rounded overflow-hidden shadow-lg" key={staffs._id}>
          <img className="w-full" src={staffs.image} alt="img" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{staffs.name} <p>{staffs.designature}</p></div>
            <p className="text-gray-700 text-base">{staffs.email}</p>
            <p className="text-gray-700 text-base">{staffs.phone}</p>
          </div>
        <Link to={`/viewstaff/${staffs._id}`}> View Details</Link>

          </div>
      
        )
      })}
    </div>
  )
}
export default ViewStaffs