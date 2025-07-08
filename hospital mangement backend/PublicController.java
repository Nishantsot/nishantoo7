package park.com.parking;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public")
public class PublicController {

    @GetMapping("/test")
    public String testPublic() {
        return "This is a public endpoint, no auth needed!";
    }
}
