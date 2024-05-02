package ma.emsi.calendly_backend;

import ma.emsi.calendly_backend.entities.User;
import ma.emsi.calendly_backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CalendlyBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(CalendlyBackendApplication.class, args);
    }


    @Bean
    CommandLineRunner commandLineRunner(UserRepository userRepository){
        return args -> {
            userRepository.save(User.builder().name("said").email("said@gmail.com").build());
            userRepository.save(User.builder().name("nawfal").email("nawfal@gmail.com").build());
            userRepository.save(User.builder().name("imane").email("imane@gmail.com").build());

        };
    }
}
