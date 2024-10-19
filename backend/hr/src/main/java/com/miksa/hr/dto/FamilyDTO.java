package com.miksa.hr.dto;

import com.miksa.hr.entity.enums.FamilyRelation;
import com.miksa.hr.entity.enums.GenderEnum;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
//Se utiliza para devolver los datos al frontend,
// también con el employeeId, pero usualmente con todos los datos completos del familiar,
public class FamilyDTO {
    private Long id;
    @NotNull(message = "El ID del empleado es obligatorio")
    private Long employeeId;
    private String firstname;
    private String lastname;
    private FamilyRelation relation;
    private boolean lives;
    private LocalDate dateOfBirth;
    private boolean coexists;
    private GenderEnum gender;


}
