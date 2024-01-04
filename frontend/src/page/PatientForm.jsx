import React from "react";

const PatientForm = ({ patient, onSubmit, onChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        value={patient.name}
        onChange={onChange}
      />

      <label htmlFor="age">Age:</label>
      <input
        type="number"
        name="age"
        id="age"
        value={patient.age}
        onChange={onChange}
      />

      <label htmlFor="gender">Gender:</label>
      <input
        type="text"
        name="gender"
        id="gender"
        value={patient.gender}
        onChange={onChange}
      />

      <label htmlFor="medicalConditions">Medical Conditions:</label>
      <input
        type="text"
        name="medicalConditions"
        id="medicalConditions"
        value={patient.medicalConditions}
        onChange={onChange}
      />

      <button type="submit">Save</button>
    </form>
  );
};

export default PatientForm;
