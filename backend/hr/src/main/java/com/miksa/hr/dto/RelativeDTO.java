package com.miksa.hr.dto;

import com.miksa.hr.entity.enums.FamilyRelation;
import com.miksa.hr.entity.enums.GenderEnum;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
public class RelativeDTO {
    private Long id;
    private Long employeeId;
    private String firstname;
    private String lastname;
    private FamilyRelation relation;
    private boolean lives;
    private LocalDate dateOfBirth;
    private boolean coexists;
    private GenderEnum gender;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    ///
    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public FamilyRelation getRelation() {
        return relation;
    }

    public void setRelation(FamilyRelation relation) {
        this.relation = relation;
    }

    public boolean isLives() {
        return lives;
    }

    public void setLives(boolean lives) {
        this.lives = lives;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public boolean isCoexists() {
        return coexists;
    }

    public void setCoexists(boolean coexists) {
        this.coexists = coexists;
    }

    public GenderEnum getGender() {
        return gender;
    }

    public void setGender(GenderEnum gender) {
        this.gender = gender;
    }
}
