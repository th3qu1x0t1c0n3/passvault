package quixotic.personnal.passvault.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import quixotic.personnal.passvault.model.Account;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AccountDTO {
    private String email;
    private String username;
    private String password;

    public AccountDTO(Account account) {
        this.email = account.getEmail();
        this.username = account.getUsername();
        this.password = account.getPassword();
    }

    public Account toEntity() {
        return Account.builder()
                .email(email)
                .username(username)
                .password(password)
                .build();
    }
}
