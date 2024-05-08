package ma.emsi.calendly_backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import org.hibernate.annotations.IdGeneratorType;

@AllArgsConstructor @NoArgsConstructor @Getter @Setter @Builder
@Entity
public class Events {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String Title;
    String Description;
    String Link;
    String location;
    String startTime;
    String endTime;
}
