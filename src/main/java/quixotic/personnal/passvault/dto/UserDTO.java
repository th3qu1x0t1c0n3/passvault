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
public class UserDTO {
    private Long id;
    private String username;
    private String password;
    private Role role;
    private String groupe;
    private String token;

    public UserDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.role = user.getRole();
        this.groupe = user.getGroupe();
    }

    public UserDTO(User user, String token) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.role = user.getRole();
        this.groupe = user.getGroupe();
        this.token = token;
    }

    public User toUser() {
        return User.builder()
                .id(this.id)
                .username(this.username)
                .password(this.password)
                .role(this.role)
                .groupe(this.groupe)
                .build();
    }
}
