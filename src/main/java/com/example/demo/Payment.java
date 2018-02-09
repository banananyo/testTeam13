package com.example.demo;
import lombok.Data;
import javax.persistence.*;
import java.util.Date;
import java.util.Set;
import javax.validation.constraints.*;
@Data
@Entity
@Table(name = "payment")
public class Payment {
    @Id
    @GeneratedValue
    private Long id;
	private Date date = new Date();
	
	@NotNull
    private int totalPrice;
	
	@NotNull
	@Min(100)
    private int assure;
	
	@NotNull
	@Min(100)
    private int repair;
	
	@NotNull
	@Min(1)
    private  int compart;
    
    @ManyToOne
    @JoinColumn(name = "Employee_ID")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "Repair_ID")
    private RepairInvoice repairInvoice;

    private Payment() {}
    public Payment (Date date, int repair,int assure,int compart,int totalPrice,RepairInvoice repairInvoice,Employee employee) {
        this.date = date;
        this.totalPrice = totalPrice;
        this.assure = assure;
        this.repairInvoice= repairInvoice;
        this.employee= employee;
        this.repair=repair;
        this.compart=compart;
    }


}

