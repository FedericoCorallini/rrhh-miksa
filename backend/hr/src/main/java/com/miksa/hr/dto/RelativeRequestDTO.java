package com.miksa.hr.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.miksa.hr.entity.enums.FamilyRelation;
import com.miksa.hr.entity.enums.GenderEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
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
public class RelativeRequestDTO {

    private Long employeeId;

    private Long id; // Será usada para el update del familiar ?

    @NotBlank(message = "El nombre no puede estar vacío")
    private String firstname;

    @NotBlank(message = "El apellido no puede estar vacío")
    private String lastname;

    @NotNull(message = "La relación familiar es obligatoria")
    private FamilyRelation relation;

    @NotNull(message = "El estado de si vive o no es obligatorio")
    private Boolean lives;

    @NotNull(message = "La fecha de nacimiento es obligatoria")
    @Past(message = "La fecha de nacimiento debe ser anterior a la actual")
    private LocalDate dateOfBirth;

    @NotNull(message = "El campo 'coexists' es obligatorio")
    private Boolean coexists;

    @NotNull(message = "El género es obligatorio")
    private GenderEnum gender;

}
