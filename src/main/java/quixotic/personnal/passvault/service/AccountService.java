package quixotic.personnal.passvault.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import quixotic.personnal.passvault.dto.AccountDTO;
import quixotic.personnal.passvault.exception.forbiddenRequestExceptions.WrongUserException;
import quixotic.personnal.passvault.model.Account;
import quixotic.personnal.passvault.model.Application;
import quixotic.personnal.passvault.repository.AccountRepository;
import quixotic.personnal.passvault.repository.ApplicationRepository;
import quixotic.personnal.passvault.security.JwtTokenProvider;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final JwtTokenProvider jwtTokenProvider;
    private final ApplicationRepository applicationRepository;
    private final AccountRepository accountRepository;
//    private final PasswordEncoder passwordEncoder;


    public AccountDTO addAccount(String token, AccountDTO accountDTO) {
        checkUser(token, applicationRepository.findById(accountDTO.getApplicationId()).orElseThrow());
        Account account = accountDTO.toEntity();
//        account.setPassword(passwordEncoder.encode(account.getPassword()));

        Application application = applicationRepository.findById(accountDTO.getApplicationId()).orElseThrow();
        account.setApplication(application);
        application.addAccount(account);

        return new AccountDTO(accountRepository.save(account));
    }

    public List<AccountDTO> getAccountByApplicationId(Long id) {
        return accountRepository.findAllByApplication_Id(id).stream()
                .map(AccountDTO::new)
//                .map((Account account) -> {
//                    AccountDTO accountDTO = new AccountDTO(accountRepository.findById(id).orElseThrow());
//                    accountDTO.setPassword(passwordEncoder.encode(accountDTO.getPassword()));
//                    return accountDTO;
//                })
                .collect(Collectors.toList());
    }

    public AccountDTO updateAccount(String token, AccountDTO accountDTO) {
        Account account = accountRepository.findById(accountDTO.getId()).orElseThrow();
        checkUser(token, account.getApplication());
        account.update(accountDTO);
//        account.setPassword(passwordEncoder.encode(account.getPassword()));
        return new AccountDTO(accountRepository.save(account));
    }

    public void deleteAccount(String token, Long id) {
        Account account = accountRepository.findById(id).orElseThrow();
        checkUser(token, account.getApplication());
        account.getApplication().removeAccount(account);

        accountRepository.deleteById(id);
    }



    private void checkUser(String token, Application application) {
        String username = jwtTokenProvider.getUsernameFromJWT(token);
        if (!application.getOwner().getUsername().equals(username)) {
            throw new WrongUserException();
        }
    }
}
