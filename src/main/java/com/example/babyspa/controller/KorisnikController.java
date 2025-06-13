package com.example.babyspa.controller;

import com.example.babyspa.entity.Korisnik;
import com.example.babyspa.service.KorisnikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class KorisnikController {

    private final KorisnikService korisnikService;

    @Autowired
    public KorisnikController(KorisnikService korisnikService) {
        this.korisnikService = korisnikService;
    }

    @PostMapping("/register")
    public ResponseEntity<Korisnik> register(@RequestBody Korisnik korisnik) {
        Korisnik newKorisnik = korisnikService.registrujKorisnika(korisnik);
        return ResponseEntity.ok(newKorisnik);  // Vraća novog korisnika sa šifrovanom lozinkom
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Korisnik korisnik) {
        String token = korisnikService.login(korisnik);
        return ResponseEntity.ok(token);  // Vraća JWT token
    }

    @GetMapping("/{id}")
    public ResponseEntity<Korisnik> getKorisnikById(@PathVariable Long id) {
        Korisnik korisnik = korisnikService.getKorisnikById(id);
        return ResponseEntity.ok(korisnik);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Korisnik> updateKorisnik(@PathVariable Long id, @RequestBody Korisnik korisnik) {
        Korisnik updatedKorisnik = korisnikService.updateKorisnik(id, korisnik);
        return ResponseEntity.ok(updatedKorisnik);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteKorisnik(@PathVariable Long id) {
        korisnikService.deleteKorisnik(id);
        return ResponseEntity.noContent().build();
    }
}
