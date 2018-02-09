package com.example.demo;

import lombok.Data;
import javax.persistence.*;
import java.util.Set;
import javax.validation.constraints.*;

@Data
@Entity
@Table(name = "customer")
public class Customer {
    @Id
    @GeneratedValue
    private Long id;
	
	@NotNull
    private String firstName;
	
	@NotNull
    private String lastName;
	
	@NotNull
	@Pattern(regexp = "[0]\\d{2}-\\d{3}-\\d{4}")
	@Column(unique = true)
    private String tel;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private Set<RepairInvoice> repairInvoices;

    private Customer(){}

    public Customer(String firstName, String lastName, String tel){
        this.firstName = firstName;
        this.lastName = lastName;
        this.tel = tel;
    }
}
