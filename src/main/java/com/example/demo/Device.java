package com.example.demo;

import lombok.Data;
import javax.persistence.*;
import java.util.Set;

@Data
@Entity
public class Device {

    @Id
    @GeneratedValue
    private Long devID;
    private String Type;
    private String Brand;
    private String Series;

    @ManyToOne
    @JoinColumn(name = "cusID")
    private RepairInvoice repairInvoice;

    private Device(){}

    public Device(String Type, String Brand, String Series, RepairInvoice repairInvoice){
        this.Type = Type;
        this.Brand = Brand;
        this.Series = Series;
        this.repairInvoice = repairInvoice;
    }
}
