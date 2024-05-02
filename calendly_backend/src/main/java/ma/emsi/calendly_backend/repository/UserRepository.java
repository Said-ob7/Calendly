package ma.emsi.calendly_backend.repository;

import ma.emsi.calendly_backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
