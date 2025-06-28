package park.com.parking;

import static org.springframework.security.config.Customizer.withDefaults;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.core.userdetails.User; // ✅ CORRECT


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    // ✅ Main Security Filter Chain Configuration
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(withDefaults())
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.POST, "/public/register").permitAll()
                .requestMatchers("/public/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/slots/add").hasRole("ADMIN")
                .requestMatchers("/booking/**").hasRole("USER")
                .anyRequest().authenticated()
            )
            .httpBasic(withDefaults());

        return http.build();
    }

    // ✅ Use DB-Based Users Only (No In-Memory Users)
      @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user = User.withUsername("user")
            .password("{noop}123456")
            .roles("USER")
            .build();

        UserDetails admin = User.withUsername("admin")
            .password("{noop}admin123")
            .roles("ADMIN")
            .build();

        return new InMemoryUserDetailsManager(user, admin);
    }
}
