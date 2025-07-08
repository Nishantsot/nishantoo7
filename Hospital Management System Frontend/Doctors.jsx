import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get('/api/doctors') 
      .then(res => setDoctors(res.data))
      .catch(err => console.error("Failed to load doctors", err));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Doctor Directory</h2>

      <div className="row">
        {doctors.map((doctor) => (
          <div className="col-md-4 mb-4" key={doctor.id}>
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">{doctor.name}</h5>
                <p className="card-text text-muted">
                  Specialization: {doctor.specialization}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorList;
