package park.com.parking;



import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentRepository appointmentRepo;
    private final DoctorRepository doctorRepo;
    private final PatientRepository patientRepo;

    // ✅ Book a new appointment
    @PostMapping("/book")
    public ResponseEntity<String> bookAppointment(@RequestBody AppointmentRequest request) {
        Optional<Doctor> doctorOpt = doctorRepo.findById(request.getDoctorId());
        Optional<Patient> patientOpt = patientRepo.findById(request.getPatientId());

        if (doctorOpt.isEmpty() || patientOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid doctor or patient ID");
        }

        Appointment appointment = new Appointment();
        appointment.setDoctor(doctorOpt.get());
        appointment.setPatient(patientOpt.get());
        appointment.setDateTime(request.getDateTime());

        appointmentRepo.save(appointment);
        return ResponseEntity.ok("Appointment booked successfully!");
    }

    // ✅ Get all appointments
    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentRepo.findAll();
    }

    // ✅ Get appointments by doctor ID
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByDoctor(@PathVariable Long doctorId) {
        return ResponseEntity.ok(appointmentRepo.findByDoctorId(doctorId));
    }

    // ✅ Get appointments by patient ID
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByPatient(@PathVariable Long patientId) {
        return ResponseEntity.ok(appointmentRepo.findByPatientId(patientId));
    }
}
