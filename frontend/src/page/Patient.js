import React from "react";

const Patient = ({ patient, onDelete }) => {
  return (
    <div>
      <h3>{patient.name}</h3>
      <p>Age: {patient.age}</p>
      <p>Gender: {patient.sex}</p>
      <p>Phone: {patient.phone}</p>
      <p>Emmail: {patient.email}</p>
      <p>Medical Conditions: {patient.medicalConditions}</p>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default Patient;
