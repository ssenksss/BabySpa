package com.example.babyspa.controller;

import com.example.babyspa.entity.Termin;
import com.example.babyspa.service.TerminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/termini")
public class TerminController {

    private final TerminService terminService;

    @Autowired
    public TerminController(TerminService terminService) {
        this.terminService = terminService;
    }

    @PostMapping("/zakazi")
    public Termin zakaziTermin(@RequestBody Termin termin) {
        return terminService.zakaziTermin(termin);
    }

    @GetMapping("/moji-termini")
    public List<Termin> getMojiTermini(@RequestParam Long korisnikId) {
        return terminService.getMojiTermini(korisnikId);
    }
}
