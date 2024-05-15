package ma.emsi.calendly_backend.repository;

import ma.emsi.calendly_backend.entities.Events;
import ma.emsi.calendly_backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventsRepository extends JpaRepository<Events, Long> {
    List<Events> findByUser(User currentUser);
    List<Events> findByUserEmail(String email);
}
