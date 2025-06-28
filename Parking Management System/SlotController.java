package park.com.parking;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/slots")
public class SlotController {
    private final ParkingSlotRepository repo;

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ParkingSlot addSlot(@RequestBody ParkingSlot slot) {
        return repo.save(slot);
    }

    @GetMapping("/available")
    public List<ParkingSlot> getAvailableSlots() {
        return repo.findByAvailableTrue();
    }
}

