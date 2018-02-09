package com.example.demo;
import lombok.Data;
import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "sex")
public class Sex {
    @Id
    @GeneratedValue
    private Long id;
    private String gender;

    private Sex(){}

    public Sex(Long id, String gender){
        this.id = id;
        this.gender = gender;
    }
}
