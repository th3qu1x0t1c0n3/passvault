package quixotic.personnal.passvault.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import quixotic.personnal.passvault.model.Account;
import quixotic.personnal.passvault.model.Application;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AccountDTO {
    private Long id;
    private Long applicationId;
    private String email;
    private String username;
    private String password;

    public AccountDTO(Account account) {
        this.id = account.getId();
        this.applicationId = account.getApplication().getId();
        this.email = account.getEmail();
        this.username = account.getUsername();
        this.password = account.getPassword();
    }

    public Account toEntity() {
        return Account.builder()
                .id(id)
                .email(email)
                .username(username)
                .password(password)
                .build();
    }
}
