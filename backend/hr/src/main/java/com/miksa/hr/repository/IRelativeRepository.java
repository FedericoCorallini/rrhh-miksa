package com.miksa.hr.repository;

import com.miksa.hr.entity.Relative;
import com.miksa.hr.entity.enums.FamilyRelation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IRelativeRepository extends JpaRepository<Relative, Long> {
    //para buscar por cumpleaños
    List<Relative> findByDateOfBirth(LocalDate birthDate);
    //para buscar por relacion (madre padre hijo...)
    List<Relative> findByRelation(FamilyRelation relation);
    List<Relative> findByEmployeeId(Long employeeId);
}