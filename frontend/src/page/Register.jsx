
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FileBase from 'react-file-base64'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'

import { register } from '../features/authSlice'
import Spinner from '../component/Spinner'

//import hush from '../img/hush.jpg'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    age:0,
    designature: '',
    level: 'low',
    email: '',
    address: '',
    sex: '',
    phone: '',
    marital: '',
    nationality: '',
    state: '',
    lga: '',
    image:'',
    password: '',
    password2: '',
  })

  const { name, dob, age, designature, level, email, 
    address, sex, phone, marital, nationality, state, 
    lga, image, password, password2 } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading } = useSelector((state) => state.auth)

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (!name) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name, dob, age, designature, level, email, address,
        sex,  phone, marital, nationality, state, lga,
        image, password, password2
      }

      dispatch(register(userData))
        .unwrap()
        .then((user) => {
          // NOTE: by unwrapping the AsyncThunkAction we can navigate the user after
          // getting a good response from our API or catch the AsyncThunkAction
          // rejection to show an error message
          toast.success(`Registered new user - ${user.name}`)
          navigate('/')
        })
        .catch(toast.error)
    }
  }

 

  if (isLoading) {
    return <Spinner />
  }

  return (						
				<div className="w-1/2 space-x-2 opacity-80  bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
					<h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">Sign up</h3>
          

<div className='bg-white border border-4 rounded-lg shadow items-center justify-center  m-10'>
<form className="px-4 pt-3 pb-4 mb-2 bg-white dark:bg-gray-800 rounded" onSubmit={onSubmit}>
						<div className="mb-4  md:flex gap gap-x-10">
							<div className="col-span-6 sm:col-span-3">
								<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="firstName">
                                    Name
                                </label>
								<input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="name"
                    name='name'
                    value={name}
                    onChange={onChange}
                    type="text"
                    placeholder="First Name"
                />
							</div>
							<div className="md:ml-2">
								<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="address">
                                Address
                            </label>
            <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="address"
                name='address'
                onChange={onChange}
                type="text"
                placeholder="Address"
            />
							</div>
						</div>
            <div className="mb-4 md:flex md:justify-between">
							<div className="mb-4 md:mr-2 md:mb-0">
								<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="nationality">
                                    Nationality
                                </label>
								<input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="nationality" 
                name='nationality'
                value={nationality}
                onChange={onChange}
                type="text" 
                placeholder="Country" 
                required
                            />
							</div>
							<div className="md:ml-2">
								<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="state">
                                    State
                                </label>
								<input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                  id="state" 
                  name='state'
                  value={state}
                  onChange={onChange}
                  type="text" 
                  placeholder="State" 
                  required
                              />
							</div>
						</div>
            <div className="mb-4 md:flex md:justify-between">
							<div className="mb-4 md:mr-2 md:mb-0">
								<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="sex">
                                    Gender
                                </label>
                                <select id="sex" name='sex' value={sex} onChange={onChange} required 
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                  <option>Select Gender</option>
                  <option >Male</option>
                  <option >Female</option>
                </select>
							</div>
							<div className="md:ml-2">
								<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="marital">
                                    Marital Status
                                </label>
                                <select id="marital" name='marital' value={marital} onChange={onChange} required 
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                  <option >Select Status</option>
                  <option >Single</option>
                  <option >Married</option>
                </select>
							</div>
						</div>
            <div className="mb-4 md:flex md:justify-between">
							<div className="mb-4 md:mr-2 md:mb-0">
								<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="age">
                                    Age
                                </label>
								<input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="age" 
                    name='age'
                    value={age}
                    onChange={onChange}
                    type="number" 
                    placeholder="Age" 
                    required
                />
							</div>
							<div className="md:ml-2">
								<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="dob">
                                    DoB
                                </label>
								<input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="dob" 
                  name='dob'
                  value={dob}
                  onChange={onChange}
                  placeholder="date of bith" 
                  required
                                />
							</div>
						</div>
            <div className="mb-4 md:flex md:justify-between">
							<div className="mb-4 md:mr-2 md:mb-0">
								<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="phone">
                                    Phone
                                </label>
								<input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="phone" 
                  name='phone'
                  value={phone}
                  onChange={onChange}
                  type="text" 
                  placeholder="080" 
                  required
                                />
							</div>
							<div className="md:ml-2">
								<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="designature">
                                    Designature
                                </label>
								<input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="designature" 
                  name='designature'
                  value={designature}
                  onChange={onChange}
                  type="text" 
                  placeholder="Rank" 
                  required
                                />
							</div>
						</div>
            <div className="mb-4 md:flex md:justify-between">
							<div className="mb-4 md:mr-2 md:mb-0">
								<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="level">
                                    Level
                                </label>
								<input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="level" 
                                    name='level'
                                    value={level}
                                    onChange={onChange}
                                    type="text" 
                                    placeholder="Senior" 
                                    required
                                    disabled
                                />
							</div>
							<div className="md:ml-2">
								<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="email">
                                    Email
                                </label>
								<input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="email" 
                  name='email'
                  value={email}
                  onChange={onChange}
                  type="email" 
                  placeholder="john@doe.com" 
                  required
                                />
							</div>
						</div>
            <div className="mb-4 md:flex md:justify-between">
							<div className="mb-4 md:mr-2 md:mb-0">
								<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="lga">
                                    L.G.A
                                </label>
								<input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="lga" 
                    name='lga'
                    value={lga}
                    onChange={onChange}
                    type="text" 
                    placeholder="lGA of Origin" 
                    required
                                />
							</div>
							<div className="md:ml-2">
              <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="email">
                                Image
                            </label>
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
              />
							</div>
						</div>
						<div className="mb-4 md:flex md:justify-between">
							<div className="mb-4 md:mr-2 md:mb-0">
								<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="password">
                                    Password
                                </label>
								<input
                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="password" 
                                    name='password'
                                    value={password}
                                    onChange={onChange}
                                    type="password" 
                                    placeholder="*************" 
                                    required
                                />
								<p className="text-xs italic text-red-500">Please choose a password.</p>
							</div>
							<div className="md:ml-2">
								<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="c_password">
                                    Confirm Password
                                </label>
								<input
                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="password2" 
                    name='password2'
                    value={password2}
                    onChange={onChange}
                    type="password" 
                    placeholder="***************" 
                    required
                                />
							</div>
						</div>
						<div className="mb-6 text-center">
							<button
                                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                                type="button" onClick={onSubmit}
                            >
                                Register Account
                            </button>
						</div>
						<hr className="mb-6 border-t" />
						<div className="text-center">
							<a className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
								href="/register">
								Forgot Password?
							</a>
						</div>
						<div className="text-center">
							<a className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
								href="./login">
								Already have an account? Login!
							</a>
						</div>
					</form>
</div>
					
				</div>
       
    )  
}

export default Register
