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

    public User toUser() {
//        Validation.validateSignIn(this);
        return User.builder()
                .username(username)
                .role(Role.USER)
                .build();
    }
}
