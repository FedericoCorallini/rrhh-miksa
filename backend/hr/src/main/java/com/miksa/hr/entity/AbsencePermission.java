package com.miksa.hr.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.miksa.hr.entity.enums.PermissionState;
import jakarta.persistence.*;
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
@Entity
public class AbsencePermission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String details;
    private LocalDate creationDate;
    @Column(name = "start_date_time")
    private LocalDate startDate;
    @Column(name = "end_date_time")
    private LocalDate endDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String reason;
    @OneToOne
    @JoinColumn(name = "documentation_id", updatable = false)
    @JsonManagedReference
    private Documentation documentation;
    @Enumerated(EnumType.STRING)
    @Column(name = "permission_state")
    private PermissionState permissionState;
    @ManyToOne
    @JoinColumn(name = "employee_id", updatable = false)
    @JsonBackReference
    private Employee employee;
    private boolean eliminated;
}
