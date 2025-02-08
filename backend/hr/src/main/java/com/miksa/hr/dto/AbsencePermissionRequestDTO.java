package com.miksa.hr.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class AbsencePermissionRequestDTO {

    private Long id;

    private String details;

    @NotNull(message = "Debes ingresar la fecha de inicio")
    @FutureOrPresent(message = "La fecha de inicio no debe ser anterior a la fecha actual")
    private LocalDate startDate;

    @NotNull(message = "Debes ingresar la fecha de finalizacion")
    @FutureOrPresent(message = "La fecha de finalizacion no debe ser anterior a la fecha actual")
    private LocalDate endDate;

    private LocalTime startTime;

    private LocalTime endTime;

    private String reason;

    @NotNull(message = "Debes enviar el id del empleado al que corresponde el permiso")
    private Long employeeId;
}
