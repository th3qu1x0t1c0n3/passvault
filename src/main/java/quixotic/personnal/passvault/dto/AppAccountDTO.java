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
public class AppAccountDTO {
    private String name;
    private String url;
    private String email;
    private String username;
    private String password;

    public Application toApp() {
        return Application.builder()
                .name(name)
                .url(url)
                .build();
    }
    public Account toAccount() {
        return Account.builder()
                .email(email)
                .username(username)
                .password(password)
                .build();
    }
}
