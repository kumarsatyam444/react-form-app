import React, { useState } from 'react';
import UserForm from './components/UserForm';
import UserDetails from './components/UserDetails';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('form'); // 'form' or 'details'
  const [userData, setUserData] = useState(null);

  const handleFormSubmit = (formData) => {
    setUserData(formData);
    setCurrentView('details');
  };

  const handleBackToForm = () => {
    setCurrentView('form');
    setUserData(null);
  };

  return (
    <div className="App">
      {currentView === 'form' ? (
        <UserForm onFormSubmit={handleFormSubmit} />
      ) : (
        <UserDetails 
          userData={userData} 
          onBackToForm={handleBackToForm} 
        />
      )}
    </div>
  );
}

export default App;
