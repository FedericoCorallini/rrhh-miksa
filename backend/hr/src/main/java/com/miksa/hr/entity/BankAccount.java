package com.miksa.hr.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.miksa.hr.entity.enums.BankEnum;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BankAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String alias;

    BankEnum bank;

    @Column(name = "is_salary_account")
    boolean isSalaryAccount;

    String cbu;

    @Column(name = "account_number")
    Integer accountNumber;

    @Column(name = "bank_banch")
    String bankBranch;

//    @OneToOne
//    @JoinColumn(name = "employee_id")
//    private Employee employee;

}
