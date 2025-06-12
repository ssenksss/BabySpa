package com.example.babyspa.controller;

import com.example.babyspa.entity.Tretman;
import com.example.babyspa.service.TretmanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tretmani")
public class TretmanController {

    private final TretmanService tretmanService;

    @Autowired
    public TretmanController(TretmanService tretmanService) {
        this.tretmanService = tretmanService;
    }

    @GetMapping
    public List<Tretman> getSviTretmani() {
        return tretmanService.getSviTretmani();
    }
}
