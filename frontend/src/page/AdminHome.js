import { Outlet } from 'react-router-dom'
import AdminSideNav from "../component/AdminSideNav"
import VideoBanner from '../component/VideoBanner'

const AdminHome = () =>{        
    return(
      <div className='bg-emerald-500 bg-no-repeat bg-right-bottom bg-fixed' >
        <div className='flex'>
          <AdminSideNav /> 
          <Outlet />
          <VideoBanner />
        </div>       
      </div>    
    )  
}
export default AdminHome