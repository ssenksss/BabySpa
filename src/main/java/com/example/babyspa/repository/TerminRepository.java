package com.example.babyspa.repository;

import com.example.babyspa.entity.Termin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TerminRepository extends JpaRepository<Termin, Long> {
}
