import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Invoice from './Invoice';
import InvoiceForm from './InvoiceForm';
import { useState } from 'react';
const App = () => {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  return (
    <div>
      {!formData ? (
        <InvoiceForm onSubmit={handleFormSubmit} />
      ) : (
        <Invoice formData={formData} />
      )}
    </div>
  );
};

export default App;
