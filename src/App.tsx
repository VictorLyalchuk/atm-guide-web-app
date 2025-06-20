import { useState } from 'react'
import Login from './components/login'
import './App.css'
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
