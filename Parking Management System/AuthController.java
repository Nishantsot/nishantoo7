package park.com.parking;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/public")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository repo;

  @PostMapping("/register")
public ResponseEntity<String> register(@RequestBody User user) {
    if (user.getRole() == null || user.getRole().isEmpty()) {
        user.setRole("USER"); // default role
    }
    repo.save(user);
    return ResponseEntity.ok("User registered!");
}

    // ✅ Add this method
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(repo.findAll());
    }
}
