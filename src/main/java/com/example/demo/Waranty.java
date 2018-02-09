package com.example.demo;

import lombok.Data;
import javax.persistence.*;
import java.util.Set;

@Data
@Entity
public class Waranty {

    @Id
    @GeneratedValue
    private Long warID;
    private String warName;
    private int duration;
    private int price;

    private Waranty(){}

    public Waranty(String warName, int duration, int price){
        this.warName = warName;
        this.duration = duration;
        this.price = price;
    }
}
