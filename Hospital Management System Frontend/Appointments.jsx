import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/appointments', {
      auth: {
        username: 'patient1',
        password: 'pat123'
      }
    })
    .then(res => {
      console.log("Appointments:", res.data);
      setAppointments(res.data);
      setError('');
    })
    .catch(err => {
      console.error("Error fetching appointments:", err);
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        setError("❌ Unauthorized: Please login.");
      } else {
        setError("⚠️ Failed to fetch appointments.");
      }
    });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Appointments</h2>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      {!error && (
        <div className="row">
          {appointments.map((app, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">🗓 {app.dateTime?.split('T')[0]} at {app.dateTime?.split('T')[1]}</h5>
                  <p className="card-text">
                    👤 Patient: {app.patient?.name}<br />
                    🩺 Doctor: {app.doctor?.name}<br />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AppointmentList;
