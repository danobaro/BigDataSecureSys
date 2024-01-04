import React, { useState, useEffect } from 'react'; 
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import useFetch from "./useFetch";

const StaffDetails = () => {

  const [staffs, setStaffs] = useState([]);
  const { _id } = useParams();
  const { data: staff, error, isPending } = useFetch(`http://localhost:5000/api/staffs/${_id}`);
  const navigate = useNavigate();

  useEffect(() => { 
    axios
    .get(`http://localhost:5000/api/staffs/${_id}`)
    .then(res => { setStaffs(res.data); 
    }); 
}, [_id]);

  const handleClick = () => {
    fetch('http://localhost:5000/api/staffs/' + staff._id, {
      method: 'DELETE'
    }).then(() => {
      navigate('/');
    }) 
  }

  return (
    <div className="blog-details">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error } error {_id}</div> }
      { staff && (
        <article>
          <h2>Patient Name: { staff.name }</h2>
          <p>Patient Email{ staff.email }</p>
          <div>Patient Phone No.:{ staff.phone }</div>
          <button onClick={handleClick}>delete</button>
        </article>
      )}
    </div>
  );
}
 
export default StaffDetails;