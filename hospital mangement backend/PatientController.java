package park.com.parking;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientRepository patientRepo;

    @GetMapping
    public List<Patient> getAllPatients() {
        return patientRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        return patientRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Patient> addPatient(@RequestBody Patient patient) {
        return ResponseEntity.ok(patientRepo.save(patient));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestBody Patient updatedPatient) {
        return patientRepo.findById(id)
                .map(pat -> {
                    pat.setName(updatedPatient.getName());
                    pat.setEmail(updatedPatient.getEmail());
                    return ResponseEntity.ok(patientRepo.save(pat));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePatient(@PathVariable Long id) {
        if (patientRepo.existsById(id)) {
            patientRepo.deleteById(id);
            return ResponseEntity.ok("Patient deleted.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}