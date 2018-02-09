package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;


@Controller
public class PromotionController {

	@Autowired
	PromotionRepository promotionRepository;

	@ResponseBody
	@RequestMapping(path = "/promoname/{promoname}/description/{description}/datestart/{datestart}/dateout/{dateout}", method = RequestMethod.GET)
	public String Promos(@PathVariable String promoname, @PathVariable String description, @PathVariable int amount,
						 @PathVariable String datestart,
						 @PathVariable String dateout) throws ParseException {

		DateFormat newDate = new SimpleDateFormat("dd-MM-yyyy");
		Date x = newDate.parse(datestart);
        Date y = newDate.parse(dateout);

		Promotion promo = new Promotion(promoname,description,x,y);
		this.promotionRepository.save(promo);


		return "save";
	}

	
}
