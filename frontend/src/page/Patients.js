import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'


const Patients = () => { 
    const navigate = useNavigate()
    const [patients, setPatients] = useState([]);
    useEffect(() => { 
    axios
    .get('/api/patients')
    .then(res => { setPatients(res.data); 
    }); 
}, []);
    
    const [open, setOpen] = useState(true)
    const [submenuOpen, setSubmenuOpen] = useState(false)
    const [currentMenu, setCurrentMenu] = useState("")
    
return ( 
    
        <div className='p-7'>
            <h1 className='text-2xl font-semibold'>Patients Page</h1>
            <div className="container mx-auto px-4 flex justify-center ">
    <section class="overflow-hidden text-gray-700 ">
        <div class="flex flex-wrap -m-1 md:-m-2">
        <div className="grid w-full grid-cols-1 bg-gray-300 text-center gap-5 md:grid-cols-2 lg:grid-cols-4">
                {patients.map(patient =>(
                    <div className='flex w-full'>
                    <figure><img className='w-36 h-20 m-5 p-5' src={patient.image} alt="image"/></figure>
                    <div className="card-body w-24">
                        <h2 className="card-title">{patient.name}</h2>
                        <p>{patient.email}</p>
                        <p>{patient.phone}</p>
                        <div className="card-actions justify-end">
                        <button className="btn btn-primary btn-sm " onClick={() => {navigate(`/patientdetails/${patient._id}`)}}>
                            Details
                        </button>
                        </div>
                    </div>
                    </div>
                ))}
        </div>
        </div>
    </section>
    </div>  
    </div>
     
    )
}  
export default Patients;
