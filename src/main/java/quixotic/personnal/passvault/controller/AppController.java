package quixotic.personnal.passvault.controller;

import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import quixotic.personnal.passvault.dto.ApplicationDTO;
import quixotic.personnal.passvault.service.AppService;

import java.util.List;

@RestController
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

    @GetMapping("")
    public ResponseEntity<ApplicationDTO> getAppById(@PathParam("id") Long id) {
        return ResponseEntity.accepted().body(appService.getAppById(id));
    }

    @GetMapping("/url")
    public ResponseEntity<List<ApplicationDTO>> getAllAppsByUrl(@PathParam("url") String url) {
        return ResponseEntity.accepted().body(appService.getAllAppsByUrl(url));
    }

    @GetMapping("/name")
    public ResponseEntity<ApplicationDTO> getAppByName(@RequestHeader("Authorization") String token, @PathParam("name") String name) {
        return ResponseEntity.accepted().body(appService.getAppByName(token, name));
    }

    @PutMapping("/update")
    public ResponseEntity<ApplicationDTO> updateApp(@RequestBody ApplicationDTO applicationDTO) {
        return ResponseEntity.accepted().body(appService.updateApp(applicationDTO));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteAppById(@PathParam("id") Long id) {
        appService.deleteAppById(id);
        return ResponseEntity.noContent().build();
    }
}
