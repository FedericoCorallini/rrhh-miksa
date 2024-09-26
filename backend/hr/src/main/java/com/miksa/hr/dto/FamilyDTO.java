package com.miksa.hr.dto;

import com.miksa.hr.entity.enums.FamilyRelation;
import com.miksa.hr.entity.enums.GenderEnum;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FamilyDTO {
    private Long id;
    private String firstname;
    private String lastname;
    private FamilyRelation relation;
    private boolean lives;
    private LocalDate dateOfBirth;
    private boolean coexists;
    private GenderEnum gender;
}
