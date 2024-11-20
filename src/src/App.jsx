import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import MultiStepForm from './components/MultiStepForm.jsx';
import Dashboard from './components/Dashboard.jsx';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<MultiStepForm />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
