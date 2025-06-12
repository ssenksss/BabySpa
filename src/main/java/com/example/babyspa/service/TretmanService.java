package com.example.babyspa.service;

import com.example.babyspa.entity.Tretman;
import com.example.babyspa.repository.TretmanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TretmanService {

    @Autowired
    private TretmanRepository tretmanRepository;

    public List<Tretman> findAll() {
        return tretmanRepository.findAll();
    }

    public Tretman save(Tretman tretman) {
        return tretmanRepository.save(tretman);
    }

    public List<Tretman> getSviTretmani() {
        return null;
    }

    // Dodaj metode ako zatrebaju (npr. findById, delete itd.)
}
