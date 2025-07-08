package park.com.parking;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/doctors")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorRepository doctorRepo;

    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id) {
        return doctorRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Doctor> addDoctor(@RequestBody Doctor doctor) {
        return ResponseEntity.ok(doctorRepo.save(doctor));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable Long id, @RequestBody Doctor updatedDoctor) {
        return doctorRepo.findById(id)
                .map(doc -> {
                    doc.setName(updatedDoctor.getName());
                    doc.setSpecialization(updatedDoctor.getSpecialization());
                    return ResponseEntity.ok(doctorRepo.save(doc));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDoctor(@PathVariable Long id) {
        if (doctorRepo.existsById(id)) {
            doctorRepo.deleteById(id);
            return ResponseEntity.ok("Doctor deleted.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
