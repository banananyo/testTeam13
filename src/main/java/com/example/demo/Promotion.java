package com.example.demo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;


import java.util.Date;
import java.util.Timer;

@Data
@Entity
public class Promotion {

	private @Id @GeneratedValue Long proid;
	private String promoname;
	private String description;
	private Date datestart;
	private Date dateout;


	private Promotion() {}

	public Promotion(String promoname,String description,Date datestart,Date dateout) {
		this.promoname = promoname;

		this.description = description;
		this.datestart = datestart;
		this.dateout = dateout;

	}
}