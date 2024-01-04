import { useState} from 'react'
import Modal from 'react-modal'
import {FaArchive, FaBriefcase, FaHospital, FaUniversalAccess, FaUserNurse, FaUserShield} from 'react-icons/fa'

const Home = () =>{
    
    // Modal section
    const [isOpen, setIsOpen] = useState(false);
    function handleOpen() { setIsOpen(true); }
    function handleClose() { setIsOpen(false); }
  
    return(
    <div className= "flex">
       
        <div className="container flex flex-col mx-auto bg-white">
            <div className="w-full draggable">
                <div className="container flex flex-col items-center gap-16 mx-auto my-32">
                    <div className="grid w-full grid-cols-1 text-center gap-5 md:grid-cols-2 lg:grid-cols-3">
                        <button onClick={handleOpen} className="flex flex-col items-center gap-3 px-8 py-10 bg-cyan-300 rounded-3xl shadow-main">
                           <FaBriefcase className='w-8 h-8' />
                        <p className="text-2xl font-extrabold text-dark-grey-900">Manage Users</p>
                        </button>

                        <div className="flex flex-col items-center gap-3 px-8 py-10 bg-cyan-300 rounded-3xl shadow-main"><FaUniversalAccess className='w-8 h-8' />
                        <p className="text-2xl font-extrabold text-dark-grey-900">Access Control</p>
                       </div>

                        <div className="flex flex-col items-center gap-3 px-8 py-10 bg-cyan-300 rounded-3xl shadow-main">
                        <FaUserShield className='w-8 h-8' />
                        <p className="text-2xl font-extrabold text-dark-grey-900">Security Setting</p>
                        </div>

                        <div className="flex flex-col items-center gap-3 px-8 py-10 bg-cyan-300 rounded-3xl shadow-main"><FaArchive className='w-8 h-8' />
                        <p className="text-2xl font-extrabold text-dark-grey-900">BackUp Recovery</p>
                        </div>

                        <div className="flex flex-col items-center gap-3 px-8 py-10 bg-cyan-300 rounded-3xl shadow-main"><FaUserNurse className='w-8 h-8' />
                        <p className="text-2xl font-extrabold text-dark-grey-900">Staff Profile</p>
                        </div>

                        <div className="flex flex-col items-center gap-3 px-8 py-10 bg-cyan-300 rounded-3xl shadow-main"><FaHospital className='w-8 h-8' />
                        <p className="text-2xl font-extrabold text-dark-grey-900">Patients' profile</p>
                        </div>

                    </div>
            <Modal isOpen={isOpen} onClose={handleClose} style={{ width: "50%", height: "50%", margin: "0 auto", borderRadius: "10px", backgroundColor: "dark-purple", }} >
                <button onClick={handleClose} >Close X</button>
                <div>
                
                </div>
            </Modal>
 </div>
 </div>
        </div>
    </div>
        
    )
    
}
export default Home