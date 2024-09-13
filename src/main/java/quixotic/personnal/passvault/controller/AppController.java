package quixotic.personnal.passvault.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import quixotic.personnal.passvault.dto.ApplicationDTO;
import quixotic.personnal.passvault.service.AppService;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/apps")
public class AppController {

    private final AppService appService;

    @PostMapping("/create")
    public ResponseEntity<ApplicationDTO> createApp(@RequestHeader("Authorization") String token, @RequestBody ApplicationDTO applicationDTO) {
        return ResponseEntity.accepted().body(appService.createApp(token, applicationDTO));
    }

    @GetMapping("/all")
    public ResponseEntity<List<ApplicationDTO>> getAllAppsByUser(@RequestHeader("Authorization") String token) {
        return ResponseEntity.accepted().body(appService.getAllAppsByUser(token));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicationDTO> getAppById(@PathVariable Long id) {
        return ResponseEntity.accepted().body(appService.getAppById(id));
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<ApplicationDTO> getAppByName(@RequestHeader("Authorization") String token, @PathVariable String name) {
        return ResponseEntity.accepted().body(appService.getAppByName(token, name));
    }

    @PutMapping("/name")
    public ResponseEntity<ApplicationDTO> updateApp(@RequestBody ApplicationDTO applicationDTO) {
        return ResponseEntity.accepted().body(appService.updateNameApp(applicationDTO));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAppById(@PathVariable Long id) {
        appService.deleteAppById(id);
        return ResponseEntity.noContent().build();
    }
}
