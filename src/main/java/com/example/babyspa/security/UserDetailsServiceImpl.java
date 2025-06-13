package com.example.babyspa.security;

import com.example.babyspa.entity.Korisnik;
import com.example.babyspa.repository.KorisnikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements org.springframework.security.core.userdetails.UserDetailsService {

    @Autowired
    private KorisnikRepository korisnikRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Korisnik korisnik = korisnikRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Korisnik sa email-om " + email + " nije pronađen."));

        return User.builder()
                .username(korisnik.getEmail())
                .password(korisnik.getLozinka())
                .roles(korisnik.getUloga().name()) // koristi name() jer je enum
                .build();
    }

}
