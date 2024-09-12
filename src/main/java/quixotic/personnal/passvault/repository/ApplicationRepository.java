package quixotic.personnal.passvault.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import quixotic.personnal.passvault.model.Application;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findAllByOwner_Username(String username);
}
