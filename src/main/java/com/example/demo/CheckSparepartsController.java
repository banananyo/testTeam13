package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;

@Controller
public class CheckSparepartsController {
    @Autowired
    EmployeeRepository employeeRepository;
    @Autowired
    CheckSparepartsRepository checkSparepartsRepository;


    @ResponseBody
    @RequestMapping(path = "/employee/{eid}/Computer_Case/{Computer_Case}/Cooling_System/{Cooling_System}/CPU/{CPU}/Graphic_Card/{Graphic_Card}/Disk_for_PC/{Disk_for_PC}/Hard_Disk_for_Notebook/{Hard_Disk_for_Notebook}/Internal_Card_Reader/{Internal_Card_Reader}/Monitor/{Monitor}/Mouse/{Mouse}/Optical_Disk_Drive/{Optical_Disk_Drive}/Power_Supply/{Power_Supply}/RAM_for_PC/{RAM_for_PC}/RAM_for_NoteBook/{RAM_for_NoteBook}/Sound_Card/{Sound_Card}", method = RequestMethod.GET)
    public String CheckSpareparts(
            @PathVariable String Computer_Case,
            @PathVariable String Cooling_System,
            @PathVariable String CPU,
            @PathVariable String Graphic_Card,
            @PathVariable String Disk_for_PC,
            @PathVariable String Hard_Disk_for_Notebook,
            @PathVariable String Internal_Card_Reader,
            @PathVariable String Monitor,
            @PathVariable String Mouse,
			@PathVariable String Optical_Disk_Drive,
            @PathVariable String Power_Supply,
            @PathVariable String RAM_for_PC,
            @PathVariable String RAM_for_NoteBook,
            @PathVariable String Sound_Card,
            @PathVariable long eid) {


        Employee employee=this.employeeRepository.findOne(eid);
		Date d = new Date();


        CheckSpareparts checkSpareparts =new CheckSpareparts(employee,d,Computer_Case,Cooling_System,CPU,Graphic_Card,Disk_for_PC,Hard_Disk_for_Notebook,Internal_Card_Reader,Monitor,Mouse,Optical_Disk_Drive,Power_Supply,RAM_for_PC,RAM_for_NoteBook,Sound_Card);
        this.checkSparepartsRepository.save(checkSpareparts);
        
		return "เย้ๆทำด้แล้ว";

    }

}
