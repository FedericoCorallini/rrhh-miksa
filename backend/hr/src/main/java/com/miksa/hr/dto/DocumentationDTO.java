package com.miksa.hr.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.miksa.hr.entity.enums.DocumentationType;
import jakarta.validation.constraints.AssertFalse;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
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
    @Null
    private LocalDateTime uploadedDate;
    @Null
    private String pathToFile;
    @NotNull
    private Long idEmployee;
    private Long idAbsencePermission;
    @NotNull
    private DocumentationType documentationType;
    @AssertFalse
    private boolean eliminated;
}
