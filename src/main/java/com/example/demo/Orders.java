package com.example.demo;

import javax.persistence.*;
import javax.persistence.Id;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.ManyToOne;
import java.util.Set;
import java.util.Date;
import java.util.Set;
import lombok.Data;

@Data
@Entity
public class Orders {
    @Id @GeneratedValue
    private Long ID;
    private int qty;
    private int price;
    private int totalprice;
    private String detail;
    private Date datenow;

    @OneToOne
    private Hardware hardware;

    
    private Orders() {}

    public  Orders(int qty,String detail,int price,int totalprice,Date datenow,Hardware hardware) {
        this.qty = qty;
        this.detail = detail;
        this.price = price;
        this.totalprice = totalprice;
        this.datenow = datenow;
        this.hardware = hardware;
        

    }


}
