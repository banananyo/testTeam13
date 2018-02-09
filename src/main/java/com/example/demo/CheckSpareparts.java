package com.example.demo;

import lombok.Data;
import javax.persistence.Id;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.ManyToOne;
import javax.validation.constraints.*;

@Data
@Entity
public class CheckSpareparts {
    @Id
    @GeneratedValue
    private Long id;
	private Date date = new Date();
	
	@NotNull
	@Pattern(regexp = "\\d{1,2}")
    private String Computer_Case;
	
    private String Cooling_System;
	
	@NotNull
	@Pattern(regexp = "\\d{1,2}")
    private String CPU;
    private String Graphic_Card;
    private String Disk_for_PC;
    private String Hard_Disk_for_Notebook;
    private String Internal_Card_Reader;
    private String Monitor;
    private String Mouse;
    private String Optical_Disk_Drive;
    private String Power_Supply;
    private String RAM_for_PC;
    private String RAM_for_NoteBook;
	
	@NotNull
	@Pattern(regexp = "\\d{1,2}")
    private String Sound_Card;



    @ManyToOne
    private Employee employee;


    private CheckSpareparts(){}
    public CheckSpareparts(Employee employee,Date date,String Computer_Case,String Cooling_System,String CPU,String Graphic_Card,String Disk_for_PC,String Hard_Disk_for_Notebook
                           ,String Internal_Card_Reader,String Monitor,String Mouse,String Optical_Disk_Drive,String Power_Supply,String RAM_for_PC,String RAM_for_NoteBook,String Sound_Card){
        this.employee = employee;
		this.date = date;
        this.Computer_Case = Computer_Case;
        this.Cooling_System = Cooling_System;
        this.CPU = CPU;
        this.Graphic_Card = Graphic_Card;
        this.Disk_for_PC = Disk_for_PC;
        this.Hard_Disk_for_Notebook = Hard_Disk_for_Notebook;
        this.Internal_Card_Reader = Internal_Card_Reader;
        this.Monitor = Monitor;
        this.Mouse = Mouse;
        this.Optical_Disk_Drive = Optical_Disk_Drive;
        this.Power_Supply = Power_Supply;
        this.RAM_for_NoteBook = RAM_for_NoteBook;
        this.Sound_Card = Sound_Card;
        this.RAM_for_PC = RAM_for_PC;



    }


}
