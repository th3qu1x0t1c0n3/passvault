package quixotic.personnal.passvault.controller;

import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import quixotic.personnal.passvault.dto.AccountDTO;
import quixotic.personnal.passvault.dto.ApplicationDTO;
import quixotic.personnal.passvault.service.AccountService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/account")
public class AccountController {
    private final AccountService accountService;

    @PostMapping("/add")
    public ResponseEntity<AccountDTO> addAccount(@RequestHeader("Authorization") String token, @RequestBody AccountDTO accountDTO) {
        return ResponseEntity.accepted().body(accountService.addAccount(token, accountDTO));
    }

    @GetMapping("/all")
    public ResponseEntity<List<AccountDTO>> getAccountByApplicationId(@PathParam("appId") Long appId) {
        return ResponseEntity.accepted().body(accountService.getAccountByApplicationId(appId));
    }

    @GetMapping("")
    public ResponseEntity<AccountDTO> getAccountById(@PathParam("id") Long id) {
        return ResponseEntity.accepted().body(accountService.getAccountById(id));
    }


    @PutMapping("/update")
    public ResponseEntity<AccountDTO> updatePassword(@RequestHeader("Authorization") String token, @RequestBody AccountDTO accountDTO) {
        return ResponseEntity.accepted().body(accountService.updateAccount(token, accountDTO));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteAccount(@RequestHeader("Authorization") String token, @PathParam("id") Long id) {
        accountService.deleteAccount(token, id);
        return ResponseEntity.noContent().build();
    }
}
