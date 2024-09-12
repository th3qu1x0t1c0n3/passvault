package quixotic.personnal.passvault.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import quixotic.personnal.passvault.dto.ApplicationDTO;
import quixotic.personnal.passvault.repository.AccountRepository;
import quixotic.personnal.passvault.repository.ApplicationRepository;
import quixotic.personnal.passvault.security.JwtTokenProvider;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppService {
    private final JwtTokenProvider jwtTokenProvider;
    private final ApplicationRepository applicationRepository;
    private final AccountRepository accountRepository;

    public ApplicationDTO createApp(ApplicationDTO applicationDTO) {
        return new ApplicationDTO(applicationRepository.save(applicationDTO.toEntity()));
    }

    public List<ApplicationDTO> getAllAppsByUser(String token) {
        String username = jwtTokenProvider.getUsernameFromJWT(token);

        return applicationRepository.findAll().stream()
                .map(ApplicationDTO::new)
                .collect(Collectors.toList());
    }

    public ApplicationDTO getAppById(Long id) {
        return new ApplicationDTO(applicationRepository.findById(id).orElseThrow());
    }

//    public ApplicationDTO getAppByName(String name) {
//        return new ApplicationDTO(applicationRepository.findByName(name).orElseThrow());
//    }

}
