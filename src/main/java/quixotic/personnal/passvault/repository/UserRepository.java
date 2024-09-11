package quixotic.personnal.passvault.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import quixotic.personnal.passvault.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
