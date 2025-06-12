package com.example.babyspa.service;

import com.example.babyspa.entity.Termin;
import com.example.babyspa.repository.TerminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TerminService {

    @Autowired
    private TerminRepository terminRepository;

    public List<Termin> findAll() {
        return terminRepository.findAll();
    }

    public Termin save(Termin termin) {
        return terminRepository.save(termin);
    }

    public Termin zakaziTermin(Termin termin) {
        return termin;
    }

    public List<Termin> getMojiTermini(Long korisnikId) {
        return null;
    }

    // Ovde možeš dodati pretragu po korisniku, otkazivanje termina itd.
}
