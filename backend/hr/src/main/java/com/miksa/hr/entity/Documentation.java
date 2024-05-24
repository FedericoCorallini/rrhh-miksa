package com.miksa.hr.entity;


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
@Entity
public class Documentation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    private LocalDateTime uploadedDate;
    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;
    @OneToOne(mappedBy = "documentation", cascade = CascadeType.ALL)
    private AbsencePermission absencePermission;
    @Column(name = "documentation_type")
    @Enumerated(EnumType.STRING)
    private DocumentationType documentationType;
    private boolean eliminated;
}
