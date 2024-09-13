package quixotic.personnal.passvault.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    @ManyToOne(cascade = CascadeType.ALL)
    private User owner;
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Account> accounts;

    public void addAccount(Account account) {
        accounts.add(account);
    }

    public void removeAccount(Account account) {
        if (accounts.isEmpty()){
            return;
        }
        account.setApplication(null);
        accounts.remove(account);
    }

}
