package com.example.demo;

import lombok.Data;
import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class ReceiptWaranty {

    @Id
    @GeneratedValue
    private Long id;
    private Date dateIn;

    @ManyToOne
    @JoinColumn(name = "devID")
    private Device device;

    @ManyToOne
    @JoinColumn(name = "warID")
    private Waranty waranty;

    private ReceiptWaranty() {}

    public ReceiptWaranty(Date dateIn, Device device, Waranty waranty){
        this.dateIn = dateIn;
        this.device = device;
        this.waranty = waranty;
    }
}
