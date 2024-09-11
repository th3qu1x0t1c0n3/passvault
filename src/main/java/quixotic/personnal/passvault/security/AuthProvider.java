package quixotic.personnal.passvault.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import quixotic.personnal.passvault.exception.badRequestException.UserNotFoundException;
import quixotic.personnal.passvault.exception.forbiddenRequestExceptions.InvalidJwtException;
import quixotic.personnal.passvault.model.User;
import quixotic.personnal.passvault.repository.UserRepository;


@Component
@RequiredArgsConstructor
public class AuthProvider implements AuthenticationProvider {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        User user = loadUserByUsername(authentication.getPrincipal().toString());
        validateAuthentication(authentication, user);
        return new UsernamePasswordAuthenticationToken(
                user.getUsername(),
                user.getPassword(),
                user.getAuthorities()
        );
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }

    private User loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(UserNotFoundException::new);
    }

    private void validateAuthentication(Authentication authentication, User user) {
        if (!passwordEncoder.matches(authentication.getCredentials().toString(), user.getPassword()))
            throw new InvalidJwtException("Incorrect username or password");
    }
}
