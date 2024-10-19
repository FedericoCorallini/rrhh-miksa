package com.miksa.hr.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.miksa.hr.entity.enums.FamilyRelation;
import com.miksa.hr.entity.enums.GenderEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
//import org.springframework.data.annotation.Id;

import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
@Entity
public class Family {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstname;
    private String lastname;

    @Enumerated(EnumType.STRING)
    //no estoy seguro del nombre de la columna
    @Column(name = "relation")
    private FamilyRelation relation;

    private LocalDate dateOfBirth;
    private boolean coexists;

    @Enumerated(EnumType.STRING)
    private GenderEnum gender;
    private boolean lives;

    // Relación Many-to-One, ya que un familiar pertenece a un solo empleado
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false) // Clave foránea para el empleado
    @JsonIgnore
    private Employee employee;


    public Family() {
    }


    public Family(String firstname, String lastname, FamilyRelation relation) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.relation = relation;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Family)) return false;
        Family family = (Family) o;
        return id != null && id.equals(family.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }


    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
