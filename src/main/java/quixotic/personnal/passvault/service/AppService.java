package quixotic.personnal.passvault.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import quixotic.personnal.passvault.dto.ApplicationDTO;
import quixotic.personnal.passvault.model.Application;
import quixotic.personnal.passvault.repository.AccountRepository;
import quixotic.personnal.passvault.repository.ApplicationRepository;
import quixotic.personnal.passvault.repository.UserRepository;
import quixotic.personnal.passvault.security.JwtTokenProvider;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppService {
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final ApplicationRepository applicationRepository;

    public ApplicationDTO createApp(String token, ApplicationDTO applicationDTO) {
        Application application = applicationDTO.toEntity();
        application.setOwner(userRepository.findByUsername(jwtTokenProvider.getUsernameFromJWT(token)).orElseThrow());

        return new ApplicationDTO(applicationRepository.save(application));
    }

    public List<ApplicationDTO> getAllAppsByUser(String token) {
        String username = jwtTokenProvider.getUsernameFromJWT(token);

        return applicationRepository.findAllByOwner_Username(username).stream()
                .map(ApplicationDTO::new)
                .collect(Collectors.toList());
    }

    public ApplicationDTO getAppById(Long id) {
        return new ApplicationDTO(applicationRepository.findById(id).orElseThrow());
    }

    public ApplicationDTO getAppByName(String token, String name) {
        String username = jwtTokenProvider.getUsernameFromJWT(token);

        return new ApplicationDTO(applicationRepository.findByNameAndOwner_Username(name, username).orElseThrow());
    }

    public ApplicationDTO updateNameApp(ApplicationDTO applicationDTO) {
        Application application = applicationRepository.findById(applicationDTO.getId()).orElseThrow();
        application.setName(applicationDTO.getName());
        return new ApplicationDTO(applicationRepository.save(application));
    }

    public void deleteAppById(Long id) {
        applicationRepository.deleteById(id);
    }

}
