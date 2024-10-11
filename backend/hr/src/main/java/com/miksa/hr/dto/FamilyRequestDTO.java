package com.miksa.hr.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.miksa.hr.entity.enums.FamilyRelation;
import com.miksa.hr.entity.enums.GenderEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class FamilyRequestDTO {
    private Long id; // va a ser usada para el update del familiar

    @NotBlank
    private String firstname;

    @NotBlank
    private String lastname;

    @NotNull
    private FamilyRelation relation;

    @NotNull
    private boolean lives;

    @NotNull
    private LocalDate dateOfBirth;

    @NotNull
    private boolean coexists;

    @NotNull
    private GenderEnum gender;
}
