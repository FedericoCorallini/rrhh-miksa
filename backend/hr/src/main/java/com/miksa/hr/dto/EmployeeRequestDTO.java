package com.miksa.hr.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.miksa.hr.entity.enums.GenderEnum;
import jakarta.validation.constraints.*;
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
public class EmployeeRequestDTO {

    @NotBlank
    private String lastname;

    @NotBlank
    private String firstname;

    @NotNull
    private Long dni;

    @NotNull
    private Long cuil;

    @Email @NotNull
    private String email;

    private LocalDate dateOfAdmission;

    @Past
    private LocalDate dateOfBirth;

    private String maritalStatus;

    private String workingHours;

    private String nationality;

    private String jobPosition;

    private GenderEnum gender;

    private String homePhoneNumber;

    private String cellPhoneNumber;

    private BankAccountDTO bankAccount;

}
