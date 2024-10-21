package com.miksa.hr.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
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
//Se utiliza para recibir los datos cuando se crea o actualiza un familiar,
// y en este caso, incluye el employeeId para asociar el familiar al empleado.
public class RelativeRequestDTO {
    private Long employeeId; // Para asociar el familiar al empleado
    private Long id; // Será usada para el update del familiar

    @NotBlank(message = "El nombre no puede estar vacío")
    private String firstname;

    @NotBlank(message = "El apellido no puede estar vacío")
    private String lastname;

    @NotNull(message = "La relación familiar es obligatoria")
    private FamilyRelation relation;

    @NotNull(message = "El estado de si vive o no es obligatorio")
    private Boolean lives;

    //@NotNull(message = "La fecha de nacimiento es obligatoria")
   //@Past(message = "La fecha de nacimiento debe ser anterior a la actual")
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate dateOfBirth;

    @NotNull(message = "El campo 'coexists' es obligatorio")
    private Boolean coexists;

    @NotNull(message = "El género es obligatorio")
    private GenderEnum gender;

    public boolean isLives() {
        return lives;
    }
    public void setLives(boolean lives) {
        this.lives = lives;
    }

    public boolean isCoexists() {
        return coexists;
    }
    public void setCoexists(boolean coexists) {
        this.coexists = coexists;
    }
}
