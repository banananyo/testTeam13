package com.example.demo;

import javax.persistence.*;

import lombok.Data;

@Data
@Entity

public class Hardware {
    


    private @Id   String hardwareID;
    private String hardwarename;
    
   


    private Hardware() {}

    public Hardware(String hardwareID,String hardwarename){
        this.hardwareID = hardwareID;
        this.hardwarename = hardwarename;
        
        




    }
}