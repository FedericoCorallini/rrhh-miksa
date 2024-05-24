package com.miksa.hr.entity;

import com.miksa.hr.entity.enums.PermissionState;
import jakarta.persistence.*;
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
@Entity
public class AbsencePermission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String details;
    @Column(name = "start_date_time")
    private LocalDateTime startDateTime;
    @Column(name = "end_date_time")
    private LocalDateTime endDateTime;
    private String reason;
    @OneToOne
    @JoinColumn(name = "documentation_id")
    private Documentation documentation;
    @Enumerated(EnumType.STRING)
    @Column(name = "permission_state")
    private PermissionState permissionState;
    private boolean eliminated;
}
