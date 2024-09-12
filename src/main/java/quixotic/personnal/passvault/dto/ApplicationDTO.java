package quixotic.personnal.passvault.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import quixotic.personnal.passvault.model.Application;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApplicationDTO {
    private Long id;
    private String name;
    private UserDTO owner;
    private List<AccountDTO> accounts;

    public ApplicationDTO(Application application) {
        this.id = application.getId();
        this.name = application.getName();
        this.accounts = application.getAccounts().stream()
                .map(AccountDTO::new)
                .collect(Collectors.toList());
    }

    public Application toEntity() {
        return Application.builder()
                .id(id)
                .name(name)
                .accounts(accounts != null ? accounts.stream()
                        .map(AccountDTO::toEntity)
                        .collect(Collectors.toList()) : new ArrayList<>())
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
