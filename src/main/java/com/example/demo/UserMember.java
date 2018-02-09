package com.example.demo;
import lombok.Data;
import javax.persistence.*;
import java.util.Set;

@Data
@Entity
@Table(name = "user_member")
public class UserMember {
    @Id
    @GeneratedValue
    private Long id;
    private String Username;
    private String Password;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "member_id")
    private Member member;

    private UserMember(){}

    public UserMember(String Username, String Password,Member member){
        this.id = id;
        this.Username = Username;
        this.Password = Password;
        this.member = member;
    }
}
