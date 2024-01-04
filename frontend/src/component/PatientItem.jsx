import { Link } from 'react-router-dom'

function PatientItem({ patient }) {
  return (
    <div className='ticket'>
      <div>{new Date(patient.createdAt).toLocaleString('en-US')}</div>
      <div>{patient.name}</div>
      <div>{patient.dob}</div>
          <div>{patient.age}</div>
          <div>{patient.email}</div>
          <div>{patient.address}</div>
          <div>{patient.sex}</div>
          <div>{patient.phone}</div>
          <div>{patient.marital}</div>
          <div>{patient.hmo}</div>
          <div>{patient.notes}</div>
          <div>{patient.prescriptions}</div>
          <div>{patient.image}</div>
          <div>{patient.NName}</div>
          <div>{patient.NAddress}</div>
          <div>{patient.Nphone}</div>
          <div>{patient.NRelationship}</div>
      <div className={`status status-${patient.status}`}>{patient.status}</div>
      <Link to={`/viewpat/${patient._id}`} className='btn btn-reverse btn-sm'>
        View
      </Link>
    </div>
  )
}

export default PatientItem
