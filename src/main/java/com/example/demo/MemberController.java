package com.example.demo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class MemberController {
    @Autowired
    SexRepository sexRepository;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    UserMemberRepository userMemberRepository;

    @ResponseBody
    @RequestMapping(path = "/firstName/{firstName}/lastName/{lastName}/age/{age}/gender/{gender}/id_card_NO/{id_card_NO}" +
            "/tel/{tel}/e_mail/{e_mail}/username/{username}/password/{password}", method = RequestMethod.GET)
    public String Member(
                        @PathVariable String firstName,
                        @PathVariable String lastName,
                        @PathVariable int age,
                        @PathVariable long gender,
                        @PathVariable String id_card_NO,
                        @PathVariable String tel,
                        @PathVariable String e_mail,
                        @PathVariable String username,
                        @PathVariable String password
    ){
        // get sex by sex_id (gender)
        Sex sex = sexRepository.findOne(gender);

        Member member = new Member(firstName,lastName,age,sex,id_card_NO,tel,e_mail);
        this.memberRepository.save(member);

        UserMember userMember = new UserMember(username,password,member);
        this.userMemberRepository.save(userMember);

        return "{\"status\":\"Member\"}";


    }
}
