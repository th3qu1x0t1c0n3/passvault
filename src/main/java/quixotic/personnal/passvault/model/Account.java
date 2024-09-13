package quixotic.personnal.passvault.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import quixotic.personnal.passvault.dto.AccountDTO;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    private Application application;
    private String email;
    private String username;
    private String password;

    public void update(AccountDTO accountDTO) {
        this.email = accountDTO.getEmail();
        this.username = accountDTO.getUsername();
    }
}
