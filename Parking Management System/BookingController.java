package park.com.parking;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/booking")
@RequiredArgsConstructor
public class BookingController {

    private final BookingRepository bookingRepo;
    private final UserRepository userRepo;
    private final ParkingSlotRepository slotRepo;

    @PostMapping("/{slotId}")
    public ResponseEntity<String> bookSlot(@PathVariable Long slotId, Authentication auth) {
        Optional<User> userOpt = userRepo.findByUsername(auth.getName());
        Optional<ParkingSlot> slotOpt = slotRepo.findById(slotId);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body("User not found: " + auth.getName());
        }

        if (slotOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Slot ID " + slotId + " not found");
        }

        ParkingSlot slot = slotOpt.get();
        if (!slot.isAvailable()) {
            return ResponseEntity.badRequest().body("Slot not available");
        }

        slot.setAvailable(false);
        slotRepo.save(slot);

        Booking booking = new Booking(null, userOpt.get(), slot, LocalDateTime.now());
        bookingRepo.save(booking);

        return ResponseEntity.ok("Slot booked!");
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyBookings(Authentication auth) {
        Optional<User> userOpt = userRepo.findByUsername(auth.getName());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body("User not found: " + auth.getName());
        }

        List<Booking> bookings = bookingRepo.findByUser(userOpt.get());
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingRepo.findAll());
    }

    @GetMapping("/test")
    public String test() {
        return "Booking controller is active";
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<String> cancelBooking(@PathVariable Long bookingId, Authentication auth) {
        Optional<User> userOpt = userRepo.findByUsername(auth.getName());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body("User not found: " + auth.getName());
        }
        User user = userOpt.get();

        Booking booking = bookingRepo.findById(bookingId).orElseThrow(() ->
            new RuntimeException("Booking not found")
        );

        if (!booking.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body("You are not allowed to cancel this booking");
        }

        ParkingSlot slot = booking.getSlot();
        slot.setAvailable(true);
        slotRepo.save(slot);

        bookingRepo.delete(booking);

        return ResponseEntity.ok("Booking cancelled successfully");
    }
}
