package quixotic.personnal.passvault.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import quixotic.personnal.passvault.repository.AccountRepository;
import quixotic.personnal.passvault.repository.ApplicationRepository;

@Service
@RequiredArgsConstructor
public class AppService {
    private final ApplicationRepository applicationRepository;
    private final AccountRepository accountRepository;


}
