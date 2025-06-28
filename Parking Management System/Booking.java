package park.com.parking;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private ParkingSlot slot;

    private LocalDateTime bookingTime;
}
