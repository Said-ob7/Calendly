package ma.emsi.calendly_backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Entity
@NoArgsConstructor @AllArgsConstructor @Getter @Setter @ToString @Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String oauthProvider; // Example: "Google", "Facebook", etc.
    private String oauthProviderUserId; // Unique ID provided by the OAuth provider
    @OneToMany
    private List<Events> events;

}
