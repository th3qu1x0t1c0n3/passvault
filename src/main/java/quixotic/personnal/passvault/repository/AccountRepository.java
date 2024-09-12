package quixotic.personnal.passvault.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import quixotic.personnal.passvault.model.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {
}
