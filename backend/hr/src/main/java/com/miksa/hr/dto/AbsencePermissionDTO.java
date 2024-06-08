package com.miksa.hr.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.miksa.hr.entity.Documentation;
import com.miksa.hr.entity.Employee;
import com.miksa.hr.entity.enums.PermissionState;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class AbsencePermissionDTO {

    private Long id;
    private String details;
    private LocalDate startDateTime;
    private LocalDate endDateTime;
    private String reason;
    private DocumentationDTO documentation;
    private Long employeeId;
    private PermissionState permissionState;
    private boolean eliminated;
}
