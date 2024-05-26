package com.miksa.hr.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.miksa.hr.entity.AbsencePermission;
import com.miksa.hr.entity.Employee;
import com.miksa.hr.entity.enums.DocumentationType;
import jakarta.persistence.*;
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
public class DocumentationDTO {
    private Long id;
    private String description;
    private LocalDateTime uploadedDate;
    private String pathToFile;
    private Long idEmployee;
    private Long idAbscencePermission;
    private DocumentationType documentationType;
}
