package quixotic.personnal.passvault.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import quixotic.personnal.passvault.model.Application;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
}
