package park.com.parking;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser(User user);
}