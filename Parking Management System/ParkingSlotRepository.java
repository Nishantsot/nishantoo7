package park.com.parking;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ParkingSlotRepository extends JpaRepository<ParkingSlot, Long> {
    List<ParkingSlot> findByAvailableTrue();
}
