package quixotic.personnal.passvault.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import quixotic.personnal.passvault.model.Application;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApplicationDTO {
    private String name;
    private List<AccountDTO> accounts;

    public ApplicationDTO(Application application) {
        this.name = application.getName();
        this.accounts = application.getAccounts().stream()
                .map(AccountDTO::new)
                .collect(Collectors.toList());
    }

    public Application toEntity() {
        return Application.builder()
                .name(name)
                .accounts(accounts.stream()
                        .map(AccountDTO::toEntity)
                        .collect(Collectors.toList()))
                .build();
    }

    public void addAccount(AccountDTO account) {
        accounts.add(account);
    }

    public void removeAccount(AccountDTO account) {
        if (accounts.isEmpty()){
            return;
        }
        accounts.remove(account);
    }
}