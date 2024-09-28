import React, { useState } from 'react';

const ServiceSelection = ({ onSelectCategory }) => {
  const [categoryId, setCategoryId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSelectCategory(categoryId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter Category ID:</label>
      <input
        type="text"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        placeholder="Enter Category ID"
      />
      <button type="submit">Start</button>
    </form>
  );
};

export default ServiceSelection;
