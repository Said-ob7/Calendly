package ma.emsi.calendly_backend.Controller;

import ma.emsi.calendly_backend.entities.User;
import ma.emsi.calendly_backend.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class UserController {
    private UserRepository userRepository;

    public UserController(UserRepository userRepository){
        this.userRepository = userRepository;
    }


    @GetMapping("/users")
    public String users(Model model){
        List<User> userList = userRepository.findAll();
        model.addAttribute("users", userList);
        return "users";
    }

    @GetMapping("/auth")
    @ResponseBody
    public Authentication authentication(Authentication authentication){
        return authentication;
    }
}
