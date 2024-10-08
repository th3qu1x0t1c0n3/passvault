package quixotic.personnal.passvault.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import quixotic.personnal.passvault.model.User;
import quixotic.personnal.passvault.security.Role;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignUpDTO {
    private String username;
    private String password;
    private String confirmPassword;

    public User toUser() {
//        Validation.validateSignIn(this);
        if (!password.equals(confirmPassword)) {
            throw new IllegalArgumentException("Passwords do not match");
        }
        return User.builder()
                .username(username)
                .role(Role.USER)
                .build();
    }
}
