package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import groovy.transform.AutoClone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.text.ParseException;
import java.text.ParseException;

import java.util.Iterator;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.text.ParseException;
import com.example.demo.Orders;
import java.util.Set;
@Controller

public class OrdersController {
    @Autowired
    OrdersRepository ordersRepository;
    @Autowired
    HardwareRepository hardwareRepository;
   
    @ResponseBody
    @RequestMapping(path = "/qty/{qty}/detail/{detail}/price/{price}/hardware/{hardwareID}", method = RequestMethod.GET)
    public String Orders(
        @PathVariable int qty,
        @PathVariable String detail,
        @PathVariable int price,
        @PathVariable String hardwareID
     
        ){

        Hardware hardware = this.hardwareRepository.findOne(hardwareID);
        

        Date datenow = new Date();
        int totalprice = 0;
            totalprice += qty * price;

        Orders orders = new Orders(qty,detail,price,totalprice,datenow,hardware);

        this.ordersRepository.save(orders);

        return "saved";
    }
   
}
