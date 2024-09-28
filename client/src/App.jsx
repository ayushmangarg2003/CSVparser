import React, { useState } from 'react';
import ServiceSelection from './components/ServiceSelection';
import Chatbot from './components/Chatbot';
import './App.css'

function App() {
  const [categoryId, setCategoryId] = useState(null);

  return (
    <div className="App">
      {!categoryId ? (
        <ServiceSelection onSelectCategory={setCategoryId} />
      ) : (
        <Chatbot categoryId={categoryId} />
      )}
    </div>
  );
}

export default App;
