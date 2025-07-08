import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
   
    axios.get('/api/patients', {
      auth: {
        username: 'patient1',      
        password: 'pat123'    
      }
    })
    .then(res => {
      setPatients(res.data);
      setError('');
    })
    .catch(err => {
      console.error("Error fetching patients:", err);
      if (err.response) {
        if (err.response.status === 401 || err.response.status === 403) {
          setError(" Unauthorized access. Please check your login credentials.");
        } else {
          setError(" Server error: " + err.response.statusText);
        }
      } else {
        setError(" Network error. Backend may be down.");
      }
    });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Patient List</h2>

      {error && (
        <div className="alert alert-danger text-center">{error}</div>
      )}

      {!error && (
        <div className="row">
          {patients.length === 0 ? (
            <p className="text-center text-muted">No patients found.</p>
          ) : (
            patients.map(patient => (
              <div className="col-md-4 mb-4" key={patient.id}>
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{patient.name}</h5>
                    <p className="card-text">📧 {patient.email}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default PatientList;
