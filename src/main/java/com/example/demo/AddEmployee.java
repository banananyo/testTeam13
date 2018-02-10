package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.Date;



@Controller
public class AddEmployee {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private UserRepository userRepository;

//    @Transactional
    @ResponseBody
    @RequestMapping(path = "/employees/add", method = RequestMethod.POST)
    public String Employee(@RequestBody AddEmployeeForm addEmployeeForm) {
        try {
            Employee employee = new Employee(
                    addEmployeeForm.getFirstName(),
                    addEmployeeForm.getLastName(),
                    addEmployeeForm.getTel(),
                    addEmployeeForm.getPosition(),
                    addEmployeeForm.getAddress(),
                    addEmployeeForm.getAge(),
                    addEmployeeForm.getSex(),
                    addEmployeeForm.getId_card_NO(),
                    addEmployeeForm.getE_mail());

            this.employeeRepository.save(employee);

            User user = new User(addEmployeeForm.getUsername(), addEmployeeForm.getPassword(), employee);
            this.userRepository.save(user);
        } catch (Exception e) {
            e.printStackTrace();
            return "{\"status\":\"failed\"}";
        }
        return "{\"status\":\"success\"}";
    }



}