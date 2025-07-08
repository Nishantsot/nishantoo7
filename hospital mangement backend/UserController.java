package park.com.parking;


import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final InMemoryUserDetailsManager inMemoryUserDetailsManager;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        // Check if user already exists in DB
        if (userRepo.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        // Encode password
        String encodedPassword = passwordEncoder.encode(user.getPassword());

        // Save user to database
        user.setPassword(encodedPassword);
        user.setRole("PATIENT"); // Assign default role
        userRepo.save(user);

        // Register user in in-memory auth manager
        UserDetails newUser = org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(encodedPassword)
                .roles("PATIENT") // Important: must match access control in SecurityConfig
                .build();

        inMemoryUserDetailsManager.createUser(newUser);

        return ResponseEntity.ok("User registered and added to memory auth");
    }
}



  


   


