import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FileBase from 'react-file-base64'
import { toast } from 'react-toastify'
import { FaAddressBook, FaCalendar, FaCalendarTimes, FaCity, FaEnvelope, FaFemale, 
         FaFlag, FaPhone, FaRing, FaUpload, FaUser, FaUserSecret } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { regPatient } from '../features/patSlice'
import Tryer from '../page/admin/Tryer'

function SubMenu () {

    //Patient Registeration 
  const [toggleState, setToggleState] = useState(true);
  const[showModalReg, setShowModalReg] = useState(false)   
       
  return (
    
<>
<div className='text-white bg-dark-purple h-24 w-full'>
          <h1 className='heading uppercase text-2xl text-center pb-10 pt-5'>Patient</h1>
        <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
  <div class="container flex flex-wrap items-center justify-between mx-auto">
      
      <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <button class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white break-words overflow-wrap: break-word;" aria-current="page" 
          onClick={ () => { setShowModalReg(true)}}>Registration</button>
        </li>
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Vitals</a>
        </li>
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Billings</a>
        </li>
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Laboratory</a>
        </li>
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Next of Kin</a>
        </li>
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
        </li>
      </ul>
    
  </div>
</nav> 
{showModalReg && <Tryer setModalOpen ={setShowModalReg} />}
</div>
<div  className='w-3/4 h-36 bg-grey'>
    
    <button onClick={() => setToggleState(false)}> hid</button>
    <button onClick={() => setToggleState(true)}> show</button>
{
          toggleState ? 
    <>    
          <h2>Content 1</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            praesentium incidunt quia aspernatur quasi quidem facilis quo nihil
            vel voluptatum?
          </p>
    </>  
          : null
}

</div>

</>

  )
}

export default SubMenu