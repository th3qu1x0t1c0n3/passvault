package quixotic.personnal.passvault.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import quixotic.personnal.passvault.repository.AccountRepository;
import quixotic.personnal.passvault.repository.ApplicationRepository;
import quixotic.personnal.passvault.repository.UserRepository;
import quixotic.personnal.passvault.security.JwtTokenProvider;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final ApplicationRepository applicationRepository;
    private final AccountRepository accountRepository;



}
