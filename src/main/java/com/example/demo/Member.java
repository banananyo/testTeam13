package com.example.demo;
import lombok.Data;
import javax.persistence.*;
import java.util.Set;
import java.lang.Long;

@Data
@Entity
@Table(name = "Member")
public class Member {
    @Id
    @GeneratedValue
    private Long id;
    private String firstName;
    private String lastName;
    private int age;
    private String id_card_NO;
    private String tel;
    private String e_mail;

    @ManyToOne(fetch=FetchType.LAZY)
    private Sex sex_id;

    private Member(){}

    public Member(String firstName,
                  String lastName,
                  int age,
                  Sex sex_id,
                  String id_card_NO,
                  String tel,
                  String e_mail){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.sex_id = sex_id;
        this.id_card_NO = id_card_NO;
        this.tel = tel;
        this.e_mail = e_mail;
    }
}
