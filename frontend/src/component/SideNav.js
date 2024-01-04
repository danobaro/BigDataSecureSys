import { useState } from 'react'
import { v4 as uuidv4} from 'uuid'
import {Link} from 'react-router-dom'

import { BsArrowLeftShort, BsChevronDown, BsFillImageFill, BsSearch, BsJournalMedical, BsPerson } from 'react-icons/bs'
import { RiDashboardFill } from 'react-icons/ri'
import {FaHospital, FaNotesMedical} from 'react-icons/fa'
import { AiFillEnvironment, AiOutlineFileText, AiOutlineLogout, AiOutlineSetting } from 'react-icons/ai'

function SideNav () {
    const [open, setOpen] = useState(true)
    const [submenuOpen, setSubmenuOpen] = useState(false)
    const [currentMenu, setCurrentMenu] = useState("")
   
    const Menus = [
        {title: "Dashboard",src:"chart",id:uuidv4()},
        {title: "Media", src:"/mediadisplay", spacing: true, icon:<BsFillImageFill />,id:uuidv4()},

        {title: "Staff", icon: <BsPerson />, submenu: true,
        submenuItems: [
        {title: "Register Staff", icon: <BsJournalMedical />, src:"/register",id:uuidv4()},
        {title: "Staff Info", icon: <FaNotesMedical />, src:"/viewstaffs",id:uuidv4()},
        ]},

        {title: "Patients", icon: <BsJournalMedical />, submenu: true,
        submenuItems: [
        {title: "Register Patient", icon: <BsJournalMedical />, src:"patientreg",id:uuidv4()},
        {title: "Create Billing", icon: <BsJournalMedical />, src:"billsForm",id:uuidv4()},
        {title: "Create Vitals", icon: <BsJournalMedical />, src:"createvitals",id:uuidv4()},
        {title: "Create Labs", icon: <BsJournalMedical />, src:"createlabs",id:uuidv4()},
        {title: "Create Next of Kin", icon: <BsJournalMedical />, src:"createkin",id:uuidv4()},
        {title: "Patient List", icon: <FaNotesMedical />, src:"adminpatients",id:uuidv4()},
        ]},

        {title: "Setting", icon: <AiOutlineSetting/>,id:uuidv4()},
        {title: "Logout", icon: <AiOutlineLogout />,src:"logout", id:uuidv4()}
    ]
    
    return(
        <div className= "flex">
        <div className={`bg-dark-purple h-screen p-5 pt-8 ${open ? "w-72" : "w-20"} duration-300 relative`}> 
        <BsArrowLeftShort className ={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${!open && "rotate-180"}`}  onClick={() => setOpen(!open)} />

        <div className='inline-flex'>
            <FaHospital className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-500  ${open && "rotate-[360deg]"}`} />
            <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!open && "scale-0"}`}> DELSUTH</h1>
        </div>

        <div className={`flex items-center rounded-md bg-light-white mt-6 px-4 py-2 ${!open ? "px-1" : "px-4"}`}>
            <BsSearch className={`text-white text-lg block float-left cursor-pointer mr-2 ${open && "mr-2"}`}  />
            <input type={"Search"} placeholder="Search" className={`text-base bg-transparent w-full text-white focus:outline-none <${!open && "hidden"}`} />
        </div>

        <ul className='pt-2'>
            {Menus.map((menu) => (
            <>
            
              <li key={uuidv4()} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2    hover:bg-light-white rounded-md ${menu.spacing ? "mt-9" :"mt-2"}`}>
                  <span className='text-2xl block float-left'>
                     {menu.icon ? menu.icon : <RiDashboardFill />}
                  </span>
                  <span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}> 
                  <Link to={menu.src} >
                   {menu.title} </Link>
                  </span>
                      {menu.submenu &&(
                  <BsChevronDown className='' onClick={() =>{ 
                        setCurrentMenu(menu.title);
                        setSubmenuOpen(!submenuOpen)}
                    } />
)}
              </li>

            {menu.submenu && submenuOpen && currentMenu === menu.title && open && (
              <ul>
                  {menu.submenuItems.map((submenuItem) => (
                      <li key={uuidv4()} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md ${menu.spacing ? "mt-9" :"mt-2"}`}>
                          {submenuItem.icon ? submenuItem.icon : <FaNotesMedical />}
                          <Link to={submenuItem.src} >
                          {submenuItem.title}
                          </Link>
                      </li>
                  ))}
              </ul>
                    )}
                </>
            ))}
        </ul>
        </div>


    </div>
        
    )
    
}
export default SideNav