import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { deletePatient, updateData } from '../features/authSlice'


const Settings = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [salary, setSalary] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get('http://localhost:3000/api/patients')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }

  const deleteData = (id) => {
    axios.delete(`http://localhost:3000/api/patients/${id}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

    setData(data.filter(item => item._id !== id));
  }

  const updateData = (id) => {
    axios.put(`http://localhost:3000/api/patients/${id}`, { name, age, salary })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

    setName('');
    setAge('');
    setSalary('');
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.salary}</td>
              <td>
                <button onClick={() => deleteData(item._id)}>Delete</button>
                <button onClick={() => { setId(item._id); setName(item.name); setAge(item.age); setSalary(item.salary) }}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <form onSubmit={updateData.bind(this, id)}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input type="text" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} />
        <input type="text" placeholder="Salary" value={salary} onChange={e => setSalary(e.target.value)} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default Settings
