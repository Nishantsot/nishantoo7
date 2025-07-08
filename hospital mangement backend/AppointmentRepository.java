package park.com.parking;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByDoctorId(Long doctorId);
        List<Appointment> findByPatientId(Long patientId); // 
}