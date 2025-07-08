package park.com.parking;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/register", "/public/**").permitAll()
                    // 🔐 Protect endpoints
                .requestMatchers("/api/doctors/**").hasRole("DOCTOR")
                .requestMatchers("/api/patients/**").hasRole("PATIENT")
                .requestMatchers("/api/appointments/**").hasAnyRole("DOCTOR", "PATIENT")
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .httpBasic(withDefaults());
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // ✅ THE REQUIRED BEAN
    @Bean
    public InMemoryUserDetailsManager inMemoryUserDetailsManager(PasswordEncoder encoder) {
        UserDetails doctor = User.builder()
            .username("doctor1")
            .password(encoder.encode("doc123"))
            .roles("DOCTOR")
            .build();

        UserDetails patient = User.builder()
            .username("patient1")
            .password(encoder.encode("pat123"))
            .roles("PATIENT")
            .build();

        return new InMemoryUserDetailsManager(doctor, patient);
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
