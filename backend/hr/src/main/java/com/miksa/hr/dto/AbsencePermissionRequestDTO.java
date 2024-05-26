package com.miksa.hr.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class AbsencePermissionRequestDTO {
    private Long id;
    private String details;
    @NotNull(message = "Debes ingresar la fecha de inicio")
    @Future(message = "La fecha de inicio debe ser posterior a la fecha actual")
    private LocalDateTime startDateTime;
    @NotNull(message = "Debes ingresar la fecha de finalizacion")
    @Future(message = "La fecha de finalizacion debe ser posterior a la fecha actual")
    private LocalDateTime endDateTime;
    private String reason;
    @NotNull(message = "Debes enviar el id del empleado al que corresponde el permiso")
    private Long employeeId;
}
