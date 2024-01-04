import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { AiOutlineLogout } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/authSlice'
import Spinner from './Spinner'


// eslint-disable-next-line
function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoading, user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    navigate('/login')
  }
  if (isLoading) {
    return <Spinner />
  }

  return (
    <>

<div className="flex p-2 text-xl bg-dark-purple items-center justify-center text-white">
    <h1 className='text-3xl'>Bigdata Security System</h1>
  </div>
< div className="flex w-full static navbar bg-dark-purple justify-end">
  <div className="flex-none ">
  <ul className="menu menu-horizontal p-0">
            {user ? (
              <li>
                <button className='block btn btn-ghost text-white' onClick={onLogout}>
                <span className='block pb-2'>Logout</span>
                   {user.name}
                </button>
                
              </li>
            ) : (
              <>
                  <li >
                  <Link to='/register' className="btn btn-ghost text-white">
                    {/* <FaUser /> Register */}
                  </Link>
                </li>
              </>
            )}
  </ul>
  </div>

</div> 
    </>   
  )
}

export default Header
