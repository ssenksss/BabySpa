package com.example.babyspa.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "korisnici")
public class Korisnik {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String ime;
    private String email;
    private String lozinka;
    @Enumerated(EnumType.STRING)
    private Uloga uloga = Uloga.KLIJENT;
    public Korisnik() {}

    public Integer getId() {return id;}
    public void setId(Integer id) {this.id = id;}
    public String getIme() {return ime;}
    public void setIme(String ime) {this.ime = ime;}

    public String getEmail() {return email;}
    public void setEmail(String email) {this.email = email;}
    public String getLozinka() {return lozinka;}
    public void setLozinka(String lozinka) {this.lozinka = lozinka;}
    public Uloga getUloga() {return uloga;}
    public void setUloga(Uloga uloga) {this.uloga = uloga;}
}
