package quixotic.personnal.passvault;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import quixotic.personnal.passvault.dto.SignUpDTO;
import quixotic.personnal.passvault.service.UserService;

@RequiredArgsConstructor
@SpringBootApplication
public class PassvaultApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(PassvaultApplication.class, args);
	}

	private final UserService userService;

	@Override
	public void run(String... args) {
		createUser();
	}

	private void createUser() {
		userService.createUser(SignUpDTO.builder()
				.username("tester")
				.password("admin")
				.build());
	}
}
