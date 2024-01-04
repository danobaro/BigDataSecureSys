
import React, { useState } from 'react'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import FileBase from 'react-file-base64'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { regPatient } from '../features/patSlice'
import Spinner from '../component/Spinner'
import {FaBriefcase} from 'react-icons/fa'


const PatientReg =(props) => {

  // Modal section
  const [isOpen, setIsOpen] = useState(false);
  function handleOpen() { setIsOpen(true); }
  function handleClose() { setIsOpen(false); }

  const [isOpen2, setIsOpen2] = useState(false);
  function handleOpen2() { setIsOpen2(true); }
  function handleClose2() { setIsOpen2(false); }

  //Form section
  const [formData, setFormData] = useState({
    patId:'', name: '', dob: '', age:0, email: '', address: '', sex: '', phone: '', marital: '', image:'' })

  const { patId, name, dob, age, email, address, sex, phone, marital, image,} = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading } = useSelector((state) => state.patient)

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const showToastMessage = (message, type) => {
    toast[type](message);
  };
  
  const onSubmit = (e) => {
    e.preventDefault()

    if (!name) {
      toast.error('Ensure thePatient Id, Name, and Email fields are not empty')
    } else {
      const userData = {
       patId, name, dob, age, email, address, sex, phone, marital, image,
      }

      dispatch(regPatient(userData))
  .then((user) => {
    toast.success(`Registered new patient - ${user.name}`);
    navigate('/patientreg');
    
  })
  .catch((error) => {
    toast.error(error.message); // Handle error message
  });

    }
  }
  
  if (isLoading) {
    return <Spinner />
  }

  return (   
      <div className='flex  justify-center pt-1 w-full'>
        <div className="container flex flex-col mx-auto bg-white items-center">
        <div className='w-full text-white bg-dark-purple mb-4'>
            <h1 className='heading uppercase text-2xl text-left pl-20 pb-10 pt-5'>Register New Patient</h1>
            </div>

            <div className="grid w-full grid-cols-1 text-center gap-5 md:grid-cols-2 lg:grid-cols-3">
                <button onClick={handleOpen} className="flex flex-col items-center gap-3 px-8 py-10 bg-cyan-300 rounded-3xl shadow-main">
                    <FaBriefcase className='w-8 h-8' />
                <p className="text-2xl font-extrabold text-dark-grey-900">Patient Bio</p>
                </button>

                <button onClick={handleOpen2} className="flex flex-col items-center gap-3 px-8 py-10 bg-cyan-300 rounded-3xl shadow-main">
                    <FaBriefcase className='w-8 h-8' />
                <p className="text-2xl font-extrabold text-dark-grey-900">Next of Kin</p>
                </button>

            </div>

            <Modal appElement={document.getElementById('root') || undefined} className="bg-dark-purple m-16 w-5/3 h-5/6 m-0 auto rounded-md" isOpen={isOpen} onClose={handleClose}  >
              <div className='flex flex-row-reverse space-x-4 space-x-reverse bg-white'>
              <button className='btn btn-outline btn-primary m-2' onClick={handleClose} >Close X</button>
                <h1 className='heading uppercase text-2xl text-left pr-10 m-2'>Patient Bio</h1>
              </div>
                
      <div>
      <form onSubmit={onSubmit} className="w-full justify-center">      
      <div className="flex space-x-8 p-10 ">
      <input 
            className="input input-bordered w-full max-w-xs" 
            id="patId" 
            name='patId'
            value={patId}
            onChange={onChange}
            type="text" 
            placeholder="Patient Id No." 
            required/>

      <input 
            className="input input-bordered w-full max-w-xs" 
            id="name" 
            name='name'
            value={name}
            onChange={onChange}
            type="text" 
            placeholder="John Doe" 
            required/>

    <input 
            className="input input-bordered w-full max-w-xs"
            id="address" 
            name='address'
            value={address}
            onChange={onChange}
            type="text" 
            placeholder="Home Address" 
            required/>

<select id="sex" name='sex' value={sex} onChange={onChange} required 
            className="input input-bordered w-full max-w-xs" >
          <option>Select Gender</option>
          <option >Male</option>
          <option >Female</option>
        </select>
    </div>

        <div className="flex space-x-8 p-10 ">
              <select id="marital" name='marital' value={marital} onChange={onChange} required 
              className="input input-bordered w-full max-w-xs">
              <option >Select Status</option>
              <option >Single</option>
              <option >Married</option>
            </select>

            <input 
              className="input input-bordered w-full max-w-xs"
              id="age" 
              name='age'
              value={age}
              onChange={onChange}
              type="number" 
              placeholder="Age" 
              required/>
          <input
              type='date'
              className="input input-bordered w-full max-w-xs" 
              id="dob" 
              name='dob'
              value={dob}
              onChange={onChange}
              placeholder="date of bith" 
              required/>

      <input 
            className="input input-bordered w-full max-w-xs"
            id="email" 
            name='email'
            value={email}
            onChange={onChange}
            type="email" 
            placeholder="name@mail.com" 
            required/>

            </div>

      <div className="flex space-x-8 p-10 ">

          <FileBase
              type='file'
              className="input input-bordered w-full max-w-xs"
              multiple ={false}
              id='image'
              name='image'
              value={image}
              placeholder='Pick an image'
              accept=".jpeg, .png, .jpg"
              onDone={({base64}) => setFormData({...formData, image:base64})}
            />
            </div>

      <div className="flex space-x-8 p-10 ">   
        <button className='btn btn-block'>Submit</button>
      </div>
      </form>
    </div>
            </Modal>

            <Modal className="bg-dark-purple m-16 w-5/3 h-5/6 m-0 auto rounded-md" isOpen={isOpen2} onClose={handleClose2} appElement={document.getElementById('root') || undefined}>
              
              <div className='flex flex-row-reverse space-x-4 space-x-reverse bg-white'>
              <button className='btn btn-outline btn-primary m-2' onClick={handleClose2} >Close X</button>
                <h1 className='heading uppercase text-2xl text-left pr-10 m-2'>Next of Kin</h1>
              </div>
                
                <div>
      <form onSubmit={onSubmit} className="w-full justify-center">      
      <div className="flex space-x-8 p-10 ">
      <input 
            className="input input-bordered w-full max-w-xs" 
            id="patId" 
            name='patId'
            value={patId}
            onChange={onChange}
            type="text" 
            placeholder="Patient Id No." 
            required/>

      <input 
            className="input input-bordered w-full max-w-xs" 
            id="name" 
            name='name'
            value={name}
            onChange={onChange}
            type="text" 
            placeholder="John Doe" 
            required/>

    <input 
            className="input input-bordered w-full max-w-xs"
            id="address" 
            name='address'
            value={address}
            onChange={onChange}
            type="text" 
            placeholder="Home Address" 
            required/>

<select id="sex" name='sex' value={sex} onChange={onChange} required 
            className="input input-bordered w-full max-w-xs" >
          <option>Select Gender</option>
          <option >Male</option>
          <option >Female</option>
        </select>
    </div>

        <div className="flex space-x-8 p-10 ">
              <select id="marital" name='marital' value={marital} onChange={onChange} required 
              className="input input-bordered w-full max-w-xs">
              <option >Select Status</option>
              <option >Single</option>
              <option >Married</option>
            </select>

            <input 
              className="input input-bordered w-full max-w-xs"
              id="age" 
              name='age'
              value={age}
              onChange={onChange}
              type="number" 
              placeholder="Age" 
              required/>
          <input
              type='date'
              className="input input-bordered w-full max-w-xs" 
              id="dob" 
              name='dob'
              value={dob}
              onChange={onChange}
              placeholder="date of bith" 
              required/>

      <input 
            className="input input-bordered w-full max-w-xs"
            id="email" 
            name='email'
            value={email}
            onChange={onChange}
            type="email" 
            placeholder="name@mail.com" 
            required/>

            </div>

      <div className="flex space-x-8 p-10 ">

          <FileBase
              type='file'
              className="input input-bordered w-full max-w-xs"
              multiple ={false}
              id='image'
              name='image'
              value={image}
              placeholder='Pick an image'
              accept=".jpeg, .png, .jpg"
              onDone={({base64}) => setFormData({...formData, image:base64})}
            />
            </div>

      <div className="flex space-x-8 p-10 ">   
        <button className='btn btn-block'>Submit</button>
      </div>
      </form>
    </div>
            </Modal>
 
        </div>
        
      </div>
  )
}

export default PatientReg
