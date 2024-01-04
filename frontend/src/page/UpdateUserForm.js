import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateUserForm = ({ userId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
      const user = response.data;
      setName(user.name);
      setEmail(user.email);
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      name,
      email,
    };

    try {
      await axios.put(`http://localhost:3000/api/users/${userId}`, user);
      alert('User updated successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" name="name" value={name} onChange={(event) => setName(event.target.value)} />

      <label>Email:</label>
      <input type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />

      <button type="submit">Update User</button>
    </form>
  );
};

export default UpdateUserForm;
