package quixotic.personnal.passvault.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import quixotic.personnal.passvault.dto.SignInDTO;
import quixotic.personnal.passvault.dto.SignUpDTO;
import quixotic.personnal.passvault.dto.UserDTO;
import quixotic.personnal.passvault.service.UserService;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {
    private final UserService userService;

    @PostMapping("/signin")
    public ResponseEntity<UserDTO> authenticateCook(@RequestBody SignInDTO signInDTO){
        return ResponseEntity.accepted().contentType(MediaType.APPLICATION_JSON)
                .body(userService.authenticateUser(signInDTO));
    }

    @PostMapping("/signup")
    public ResponseEntity<UserDTO> signupCook(@RequestBody SignUpDTO signUpDTO){
        return ResponseEntity.accepted().contentType(MediaType.APPLICATION_JSON)
                .body(userService.createUser(signUpDTO));
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getMe(HttpServletRequest request){
        return ResponseEntity.accepted().contentType(MediaType.APPLICATION_JSON).body(
                userService.getMe(request.getHeader("Authorization")));
    }
}
