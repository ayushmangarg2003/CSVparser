import React, { useState } from 'react';

const PersonalInfoForm = ({ responses }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Collected Responses:', responses);
    console.log('Personal Info:', { name, email, phone });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <label>Phone:</label>
      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />

      <button type="submit">Submit</button>
    </form>
  );
};

export default PersonalInfoForm;
