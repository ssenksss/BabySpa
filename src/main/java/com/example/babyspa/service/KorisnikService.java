package com.example.babyspa.service;

import com.example.babyspa.entity.Korisnik;
import com.example.babyspa.repository.KorisnikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class KorisnikService {

    @Autowired
    private KorisnikRepository korisnikRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Registracija korisnika
    public Korisnik registrujKorisnika(Korisnik korisnik) {
        if (korisnikRepository.findByEmail(korisnik.getEmail()).isPresent()) {
            throw new RuntimeException("Korisnik sa ovim emailom već postoji.");
        }

        korisnik.setLozinka(passwordEncoder.encode(korisnik.getLozinka()));
        return korisnikRepository.save(korisnik);
    }

    // Login korisnika
    public String login(Korisnik korisnik) {
        Korisnik korisnikIzBaze = korisnikRepository.findByEmail(korisnik.getEmail())
                .orElseThrow(() -> new RuntimeException("Pogrešni kredencijali."));

        if (!passwordEncoder.matches(korisnik.getLozinka(), korisnikIzBaze.getLozinka())) {
            throw new RuntimeException("Pogrešni kredencijali.");
        }

        return generateJWTToken(korisnikIzBaze);
    }

    // Generisanje JWT tokena (placeholder)
    private String generateJWTToken(Korisnik korisnik) {
        // Ovde ide prava logika za JWT ako budeš koristio.
        return "JWT-TOKEN-HERE";
    }

    // Dobavljanje korisnika po ID-u
    public Korisnik getKorisnikById(Long id) {
        return korisnikRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Korisnik sa ID " + id + " nije pronađen."));
    }

    // Ažuriranje korisnika
    public Korisnik updateKorisnik(Long id, Korisnik korisnik) {
        Korisnik existingKorisnik = korisnikRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Korisnik sa ID " + id + " nije pronađen."));

        existingKorisnik.setEmail(korisnik.getEmail());

        if (korisnik.getLozinka() != null && !korisnik.getLozinka().isEmpty()) {
            existingKorisnik.setLozinka(passwordEncoder.encode(korisnik.getLozinka()));
        }

        return korisnikRepository.save(existingKorisnik);
    }

    // Brisanje korisnika
    public void deleteKorisnik(Long id) {
        Korisnik korisnik = korisnikRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Korisnik sa ID " + id + " nije pronađen."));

        korisnikRepository.delete(korisnik);
    }

    // Pronalaženje korisnika po emailu
    public Optional<Korisnik> pronadjiPoEmailu(String email) {
        return korisnikRepository.findByEmail(email);
    }
}
