import React, { useState, useEffect } from 'react'; 
import { useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import FileBase from 'react-file-base64'


const PatientBioPage = () => {
  
  const [toggleBio, setToggleBio] = useState(false);
  const OpenBioUpdate=()=>{
    setToggleBio(!toggleBio)
    }
  const closeBioUpdate=()=>{
    setToggleBio(false)
    }

  const [patients, setPatients] = useState({
    patId:"", name:"", phone:"", address:"", dob:"", sex:"", age: 0
  });
  
   const [formData, setFormData] = useState({
    patId:'', name: '', dob: '', age:0, email: '', address: '', sex: '', phone: '', marital: '', image:'', 
  })
  const { patId, name, dob, age, email, address, sex, phone, marital, image, } = formData

  const { _id } = useParams();
  const navigate = useNavigate();
  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  useEffect(() => { 
    axios
    .get(`http://localhost:5000/api/patients/${_id}`)
    .then(res => { 
      setPatients(res.data); 
      setFormData(res.data);
    }); 
}, [_id]);

 const handleUpdate = () => {
  // Update component data in the MongoDB database
  if (window.confirm("Update Patient Record?")) {
  fetch(`http://localhost:5000/api/patients/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(() => {
      // Redirect to the component list page
      navigate(`/adminpatientdetails/${_id}`)
    });}else{
      navigate(`/adminpatientdetails/${_id}`)
    }
};

  const handleDelete = () => {
    if (window.confirm("Delete Patient Record?")) {
       fetch('http://localhost:5000/api/patients/' + patients._id, {
      method: 'DELETE'
    }).then(() => {
      navigate('/adminpatientdetails');
    })  
    }else{
      window.open("Delete Cancel")
    }   
    
  }

//Patient Update Modal Section
const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };


  return (
  <>
<nav className="bg-transparent border-gray-200 px-2 w-11/12 sm:px-4 py-2.5 rounded dark:bg-gray-900">
<div className="container bg-transparent flex flex-wrap items-center justify-between mx-auto space-y-10">

{/* Patient Bio Secton */}    
<div className='w-full p-2 bg-white'> 
<div className='flex justify-end gap-2 pt-1 pr-2'>
<h1 className='w-full text-purple-900 font-sans text-2xl pl-60 pt-2'><b>Patient Bio Information</b></h1>

<div>
<button className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-1 text-xs font-medium uppercase text-white rounded" onClick={handleDelete}> Delete </button>
</div>
<div>
<button className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-1 text-xs font-medium uppercase text-white rounded" onClick={() => OpenBioUpdate(true)}> Edit</button>
</div>
<div>
<button className='bg-purple-500 hover:bg-purple-700 text-white py-2 px-1 text-xs font-medium uppercase text-white rounded' onClick={() => closeBioUpdate(true)}>CLose</button>
</div>          
</div>   

<div className='flex space-between'>
<img className=" w-32 h-10 md:h-auto pr-2 object-cover md:w-38 rounded-t-lg md:rounded-none md:rounded-l-lg" src={patients.image}  alt="avatar" />

<div className="w-full grid grid-cols-3 gap-4 place-items-stretch h-38">
<div className='gap-5'>
    <p className=" text-purple-900 font-sans text-xl " > <b>Patient Name</b></p>
    <p className=" text-rose-600 font-sans text-xl " > <b>{ patients.name }</b></p>
  </div>
  <div className='gap-10'>
    <p className=" text-purple-900 font-sans text-xl " > <b>Date of Birth</b></p>
    <p className=" text-rose-600 font-sans text-xl " > <b>{ patients.dob }</b></p>
  </div>
  <div className='gap-10'>
    <p className=" text-purple-900 font-sans text-xl " > <b>Phone Number</b></p>
    <p className=" text-rose-600 font-sans text-xl " > <b>{ patients.phone }</b></p>
  </div>
  <div className='gap-10'>
    <p className=" text-purple-900 font-sans text-xl " > <b>Age</b></p>
    <p className=" text-rose-600 font-sans text-xl " > <b>{ patients.age }</b></p>
  </div>
  <div className='gap-10'>
    <p className=" text-purple-900 font-sans text-xl " > <b>Gender</b></p>
    <p className=" text-rose-600 font-sans text-xl " > <b>{ patients.sex }</b></p>
  </div>
  <div className='gap-10'>
    <p className=" text-purple-900 font-sans text-xl " > <b>Contact Address</b></p>
    <p className=" text-rose-600 font-sans text-xl " > <b>{ patients.address }</b></p>
  </div>
  <div className='gap-10'>
    <p className=" text-purple-900 font-sans text-xl " > <b>Contact Email</b></p>
    <p className=" text-rose-600 font-sans text-xl " > <b>{ patients.email }</b></p>
  </div>
  <div className='gap-10'>
    <p className=" text-purple-900 font-sans text-xl " > <b>Marital Status</b></p>
    <p className=" text-rose-600 font-sans text-xl " > <b>{ patients.marital }</b></p>
  </div>
</div>
<div>



</div>  
                    
</div>
<br/>

{toggleBio? 
<div className='flex w-full justify-center ' onClick={handleCloseModal}>
<form onSubmit={handleUpdate} className="w-98 justify-center">
    <div className=" w-98 flex md:flex-row  rounded-lg bg-white shadow-lg">
    <div className="w-full p-1 space-y-1 grid grid-cols-2 gap-x-2 place-items-stretch h-56 justify-start">
        <label className="input-group">
            <span className="uppercase text-purple-900 font-sans text-base w-32" ><b>Name</b></span>
              <input 
                className="appearance-none block w-full text-rose-600 font-sans text-lg border border-gray-200 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 uppercase" 
                id="name" 
                name='name'
                value={name}
                onChange={onChange}
                type="text" 
                placeholder="John Doe" 
                required/>
        </label>
        
        <label className="input-group">
            <span className="uppercase text-purple-900 font-sans text-base w-32" ><b>DoB</b></span>
              <input 
                className="appearance-none block w-full text-rose-600 font-sans text-lg border border-gray-200 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 uppercase" 
                id="dob" 
                name='dob'
                value={dob}
                onChange={onChange}
                type="date" 
                placeholder="dd-mm-yyyy" 
                required/>
        </label>
            
        <label className="input-group">
            <span className="uppercase text-purple-900 font-sans text-base w-32" ><b>Phone</b></span>
              <input 
                className="appearance-none block w-full text-rose-600 font-sans text-lg border border-gray-200 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 uppercase" 
                id="phone" 
                name='phone'
                value={phone}
                onChange={onChange}
                type="text" 
                placeholder="07012345678" 
                required/>
        </label>

        <label className="input-group">
          <span className="uppercase text-purple-900 font-sans text-base w-32" ><b>Age</b></span>
            <input 
              className="appearance-none block w-full text-rose-600 font-sans text-lg border border-gray-200 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 uppercase" 
              id="age" 
              name='age'
              value={age}
              onChange={onChange}
              type="number"  
              required/>
        </label>

        <label className="input-group">
            <span className="uppercase text-purple-900 font-sans text-base w-32" > <b>Address</b></span>
              <input 
                className="appearance-none block w-full text-rose-600 font-sans text-lg border border-gray-200 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 uppercase" 
                id="adress" 
                name='address'
                value={address}
                onChange={onChange}
                type="text" 
                placeholder="10 dowin street London" 
                required/>
        </label>

        <label className="input-group">
            <span className="uppercase text-purple-900 font-sans text-base w-32" ><b>Email</b></span>
              <input 
                className="appearance-none block w-full text-rose-600 font-sans text-lg border border-gray-200 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 uppercase" 
                id="email" 
                name='email'
                value={email}
                onChange={onChange}
                type="email" 
                placeholder="Johnmqdoe.com" 
                required/>
        </label>

        <label className="input-group">
          <span className="uppercase text-purple-900 font-sans text-base w-32" ><b>Sex</b></span>
            <select id="sex" name='sex' value={sex} onChange={onChange} required 
              className="appearance-none block w-full text-rose-600 font-sans text-lg border border-gray-200 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 uppercase" >
              <option>Select Gender</option>
              <option >Male</option>
              <option >Female</option>
          </select>
        </label>
            <label className="input-group w-full">
            <span className="uppercase text-purple-900 font-sans text-base w-32" > <b>Marital Status</b></span>
                <select id="marital" name='marital' value={marital} onChange={onChange} required 
                className="appearance-none block w-full text-rose-600 font-sans text-lg border border-gray-200 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 uppercase" >
                <option >Select Status</option>
                <option >Single</option>
                <option >Married</option>
            </select>
            </label>
    
        <label className="input-group input-group-vertical">
                <span className="uppercase text-purple-900 font-sans text-base w-32" > <b>Picture</b></span>
            <FileBase
            type='file'
            className="input input-bordered input-sm w-full max-w-xs"
            multiple ={false}
            id='image'
            name='image'
            value={image}
            placeholder='Pick an image'
            accept=".jpeg, .png, .jpg"
            onDone={({base64}) => setFormData({...formData, image:base64})}
            /></label>
            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 border border-dark-purple-700 rounded" onClick={handleUpdate}> Update </button>
    
    </div>
    </div>
</form>
</div>                
:""}
</div> 


</div>
</nav>
    
   
 </> 
 );
}

export default PatientBioPage