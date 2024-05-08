package ma.emsi.calendly_backend.repository;

import ma.emsi.calendly_backend.entities.Events;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventsRepository extends JpaRepository<Events, Long> {
}
