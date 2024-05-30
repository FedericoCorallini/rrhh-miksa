package com.miksa.hr.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @Column(updatable = false)
    private LocalDateTime uploadedDate;
    private String pathToFile;
    @ManyToOne
    @JoinColumn(name = "employee_id", updatable = false)
    @JsonBackReference
    private Employee employee;
    @OneToOne(mappedBy = "documentation", cascade = CascadeType.ALL)
    @JsonBackReference
    private AbsencePermission absencePermission;
    @Column(name = "documentation_type")
    @Enumerated(EnumType.STRING)
    private DocumentationType documentationType;
    private boolean eliminated;
}
