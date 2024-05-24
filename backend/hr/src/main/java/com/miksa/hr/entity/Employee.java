package com.miksa.hr.entity;

import com.miksa.hr.entity.enums.GenderEnum;
import jakarta.persistence.*;
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
@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String lastname;
    private String firstname;
    private Long dni;
    private Long cuil;
    private String email;
    @Column(name = "date_of_admission")
    private LocalDate dateOfAdmission;
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;
    @Column(name = "marital_status")
    private String maritalStatus;
    @Column(name = "working_hours")
    private String workingHours;
    private String nationality;
    @Column(name = "job_position")
    private String jobPosition;
    @Enumerated(EnumType.STRING)
    private GenderEnum gender;
    @Column(name = "home_phone_number")
    private String homePhoneNumber;
    @Column(name = "cell_phone_number")
    private String cellPhoneNumber;
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Documentation> documentationList;
    private boolean eliminated;
}

