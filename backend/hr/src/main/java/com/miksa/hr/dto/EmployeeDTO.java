package com.miksa.hr.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.miksa.hr.entity.enums.GenderEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class EmployeeDTO {

    private Long id;
    private String lastname;
    private String firstname;
    private Long dni;
    private Long cuil;
    private String email;
    private LocalDate dateOfAdmission;
    private LocalDate dateOfBirth;
    private String maritalStatus;
    private String workingHours;
    private String nationality;
    private String jobPosition;
    private GenderEnum gender;
    private String homePhoneNumber;
    private String cellPhoneNumber;
    private List<DocumentationDTO> documentationList;
    private List<AbsencePermissionDTO> absencePermissionsList;
    private List<RelativeDTO> familyList;
    private boolean eliminated;


}
