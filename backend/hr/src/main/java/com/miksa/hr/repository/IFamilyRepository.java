package com.miksa.hr.repository;

import com.miksa.hr.entity.Family;
import com.miksa.hr.entity.enums.FamilyRelation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IFamilyRepository extends JpaRepository<Family, Long> {
    //para buscar por cumpleaños
    List<Family> findByDateOfBirth(LocalDate birthDate);
    //para buscar por relacion (madre padre hijo...)
    List<Family> findByRelation(FamilyRelation relation);
    List<Family> findByEmployeeId(Long employeeId);
}
