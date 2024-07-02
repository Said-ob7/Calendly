package ma.emsi.calendly_backend.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.IdGeneratorType;

@AllArgsConstructor @NoArgsConstructor @Getter @Setter @Builder
@Entity
public class Events {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String Title;
    String Description;
    String location;
    String date;
    String duration;
    String link;
    String time;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}

