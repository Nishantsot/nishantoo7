
// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Doctors from './Doctors';
import Patients from './Patients';
import Appointments from './Appointments';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container py-4 d-flex justify-content-center">
        <div className="w-100" style={{ maxWidth: '960px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
  <Route path="/doctors" element={<Doctors />} />

            <Route path="/patients" element={<Patients />} />
<Route path="/appointments" element={<Appointments />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;