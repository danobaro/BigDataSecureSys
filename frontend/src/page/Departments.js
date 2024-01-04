import { useState} from 'react'
import Modal from 'react-modal'
import {FaArchive, FaBriefcase, FaHospital, FaUniversalAccess, FaUserNurse, FaUserShield} from 'react-icons/fa'

const Department = () =>{
    
    // Modal section
    const [isOpen, setIsOpen] = useState(false);
    function handleOpen() { setIsOpen(true); }
    function handleClose() { setIsOpen(false); }
  
    return(
    <div className= "flex">
       
        <div className="container flex flex-col mx-auto bg-white">
            <div className="w-full draggable">
                <div className="container flex flex-col items-center gap-12 mx-auto my-32">
                    <div className="grid w-full grid-cols-1 text-center gap-5 md:grid-cols-2 lg:grid-cols-5">
                        <button onClick={handleOpen} className="flex flex-col items-center gap-3 px-8 py-10 bg-cyan-300 rounded-3xl shadow-main">
                           <FaBriefcase className='w-8 h-8' />
                        <p className="text-xl font-bold text-dark-grey-900">Non-Clinical</p>
                        </button>

                        <button onClick={handleOpen} className="flex flex-col items-center gap-3 px-8 py-10 bg-cyan-300 rounded-3xl shadow-main">
                           <FaBriefcase className='w-8 h-8' />
                        <p className="text-xl font-bold text-dark-grey-900">Facilities</p>
                        </button>

                        <button onClick={handleOpen} className="flex flex-col items-center gap-3 px-8 py-10 bg-cyan-300 rounded-3xl shadow-main">
                           <FaBriefcase className='w-8 h-8' />
                        <p className="text-xl font-bold text-dark-grey-900">Nursing Service</p>
                        </button>

                        <button onClick={handleOpen} className="flex flex-col items-center gap-3 px-8 py-10 bg-cyan-300 rounded-3xl shadow-main">
                           <FaBriefcase className='w-8 h-8' />
                        <p className="text-xl font-bold text-dark-grey-900">Health Record</p>
                        </button>

                        <button onClick={handleOpen} className="flex flex-col items-center gap-3 px-8 py-10 bg-cyan-300 rounded-3xl shadow-main">
                           <FaBriefcase className='w-8 h-8' />
                        <p className="text-xl font-bold text-dark-grey-900">Accident & Emergency</p>
                        </button>

                        <button onClick={handleOpen} className="flex flex-col items-center gap-3 px-8 py-10 bg-cyan-300 rounded-3xl shadow-main">
                           <FaBriefcase className='w-8 h-8' />
                        <p className="text-xl font-bold text-dark-grey-900">Anaesthesia</p>
                        </button>

                        <button onClick={handleOpen} className="flex flex-col items-center gap-3 px-8 py-10 bg-cyan-300 rounded-3xl shadow-main">
                           <FaBriefcase className='w-8 h-8' />
                        <p className="text-xl font-bold text-dark-grey-900">Central Sterile Service</p>
                        </button>

                        <button onClick={handleOpen} className="flex flex-col items-center gap-3 px-8 py-10 bg-cyan-300 rounded-3xl shadow-main">
                           <FaBriefcase className='w-8 h-8' />
                        <p className="text-xl font-bold text-dark-grey-900">Community Health</p>
                        </button>

                        <button onClick={handleOpen} className="flex flex-col items-center gap-3 px-8 py-10 bg-cyan-300 rounded-3xl shadow-main">
                           <FaBriefcase className='w-8 h-8' />
                        <p className="text-xl font-bold text-dark-grey-900">Family Health</p>
                        </button>

                        <button onClick={handleOpen} className="flex flex-col items-center gap-3 px-8 py-10 bg-cyan-300 rounded-3xl shadow-main">
                           <FaBriefcase className='w-8 h-8' />
                        <p className="text-xl font-bold text-dark-grey-900">Mental Health</p>
                        </button>



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
export default Department