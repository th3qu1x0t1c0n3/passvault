package quixotic.personnal.passvault.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import quixotic.personnal.passvault.dto.SignInDTO;
import quixotic.personnal.passvault.dto.SignUpDTO;
import quixotic.personnal.passvault.dto.UserDTO;
import quixotic.personnal.passvault.exception.forbiddenRequestExceptions.WrongUserException;
import quixotic.personnal.passvault.model.User;
import quixotic.personnal.passvault.repository.UserRepository;
import quixotic.personnal.passvault.security.JwtTokenProvider;
import quixotic.personnal.passvault.security.Role;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    public UserDTO authenticateUser(SignInDTO signInDTO) {

        return new UserDTO(
                userRepository.findByUsername(signInDTO.getUsername()).orElseThrow(),
                generateToken(signInDTO.getUsername(), signInDTO.getPassword())
        );
    }

    public UserDTO createUser(SignUpDTO signUpDTO) {
        User user = signUpDTO.toUser();
        user.setPassword(passwordEncoder.encode(signUpDTO.getPassword()));

        user = saveUser(user);

        String token = generateToken(user.getUsername(), signUpDTO.getPassword());
        return new UserDTO(user, token);
    }

    public void createAdmin(SignUpDTO signUpDTO) {
        User user = signUpDTO.toUser();
        user.setPassword(passwordEncoder.encode(signUpDTO.getPassword()));
        user.setRole(Role.ADMIN);

        user = saveUser(user);

        String token = generateToken(user.getUsername(), signUpDTO.getPassword());
        new UserDTO(user, token);
    }

    public UserDTO getMe(String token) {
        String username = jwtTokenProvider.getUsernameFromJWT(token);
        return new UserDTO(userRepository.findByUsername(username).orElseThrow());
    }

    private User saveUser(User user) {
        return userRepository.save(user);
    }

    private String generateToken(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password));
        return jwtTokenProvider.generateToken(authentication);
    }

    public UserDTO updatePassword(String token, UserDTO userDTO) {
        String username = jwtTokenProvider.getUsernameFromJWT(token);
        if (!username.equals(userDTO.getUsername())) {
            throw new WrongUserException();
        }
        User user = userRepository.findByUsername(username).orElseThrow();
        passwordEncoder.matches(userDTO.getPassword(), user.getPassword());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        return new UserDTO(userRepository.save(user));
    }
}
