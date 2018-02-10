package com.example.demo;

import lombok.Data;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.Set;

@Data
@Entity
@Table(name = "employee")
public class Employee {

    @Column(unique = true)
    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

    @Pattern(regexp = "0[689]{1}[0-9]{1}-[0-9]{3}-[0-9]{4}")
    @NotNull
    private String tel;

    @NotNull
    private String position;

    @NotNull
    private String address;

    @NotNull
    private int age;

    @NotNull
    private String sex;

    @Pattern(regexp = "[0-9]{13}")
    @NotNull
    private String id_card_NO;

    @NotNull
    private String e_mail;

    @OneToMany(mappedBy = "salesEmp", cascade = CascadeType.ALL)
    private Set<RepairInvoice> salesEmp;

    @OneToMany(mappedBy = "repairEmp", cascade = CascadeType.ALL)
    private Set<RepairInvoice> repairEmp;

    public Employee(){}

    public Employee(String firstName, String lastName, String tel, String position,
                    String address, int age, String sex, String id_card_NO,String e_mail){
        this.firstName = firstName;
        this.lastName = lastName;
        this.tel = tel;
        this.position = position;
        this.address = address;
        this.age = age;
        this.sex = sex;
        this.id_card_NO = id_card_NO;
        this.e_mail = e_mail;
    }
}
