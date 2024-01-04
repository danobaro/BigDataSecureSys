import React, { useState, useEffect } from 'react'; 
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import useFetch from "./useFetch";

const PatientDetails = () => {

  const [patients, setPatients] = useState([]);
  const { _id } = useParams();
  const { data: patient, error, isPending } = useFetch(`http://localhost:5000/api/patients/${_id}`);
  const navigate = useNavigate();

  useEffect(() => { 
    axios
    .get(`http://localhost:5000/api/patients/${_id}`)
    .then(res => { setPatients(res.data); 
    }); 
}, [_id]);

  const handleClick = () => {
    fetch('http://localhost:5000/api/patients/' + patient._id, {
      method: 'DELETE'
    }).then(() => {
      navigate('/');
    }) 
  }

  return (
    <div className="blog-details">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error } error {_id}</div> }
      { patient && (
        <article>
          <h2>Patient Name: { patient.name }</h2>
          <p>Patient Email: { patient.email }</p>
          <div>Patient Phone No.:{ patient.phone }</div>
          <button onClick={handleClick}>delete</button>
        </article>
      )}
    </div>
  );
}
 
export default PatientDetails;