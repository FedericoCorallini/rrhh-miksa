package com.miksa.hr.entity;

import com.miksa.hr.entity.enums.FamilyRelation;
import com.miksa.hr.entity.enums.GenderEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

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

    @ManyToMany(mappedBy = "families") //
    private List<Employee> employees; //

    public Family() {
    }


    public Family(String firstname, String lastname, FamilyRelation relation) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.relation = relation;
    }

}
