package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.text.ParseException;

@Controller
public class MakeReceiptWarantyController {

    @Autowired
    RepairInvoiceRepository repairInvoiceRepository;
    @Autowired
    DeviceRepository deviceRepository;
    @Autowired
    WarantyRepository warantyRepository;
	@Autowired
    ReceiptWarantyRepository receiptWarantyRepository;

    @ResponseBody
    @RequestMapping(path = "/Type/{Type}/Brand/{Brand}/Series/{Series}customer/{cusID}", method = RequestMethod.GET)
    public String Devices(@PathVariable String Type,
                        @PathVariable String Brand,
                        @PathVariable String Series,
                        @PathVariable long cusID) {
        
        RepairInvoice c = this.repairInvoiceRepository.findOne(cusID);

        Device device = new Device(Type, Brand, Series, c);
        this.deviceRepository.save(device);

        return "{\"status\":\"Device\"}";
    }

    @ResponseBody
    @RequestMapping(path = "/dateIn/{dateIn}/device/{devID}/waranty/{warID}", method = RequestMethod.GET)
    public String ReceiptWaranties(@PathVariable String dateIn,
                                @PathVariable long devID,
                                @PathVariable long warID
    ) throws ParseException {

        Device dt = this.deviceRepository.findOne(devID);
        Waranty wt = this.warantyRepository.findOne(warID);

        DateFormat newDate = new SimpleDateFormat("yyyy-MM-dd");
        Date x = newDate.parse(dateIn);

        ReceiptWaranty rw = new ReceiptWaranty(x, dt, wt);
        this.receiptWarantyRepository.save(rw);

        return "{\"status\":\"ReceiptWaranties\"}";
    }
}