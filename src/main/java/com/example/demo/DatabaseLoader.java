package com.example.demo;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.text.DateFormat;
import java.util.*;
import java.text.SimpleDateFormat;


@Component
public class DatabaseLoader implements CommandLineRunner {
    @Autowired
    private RepairInvoiceRepository repairInvoiceRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    HardwareRepository hardwareRepository;
    @Autowired
    OrdersRepository ordersRepository;

    @Autowired
    private DeviceRepository deviceRepository;
    @Autowired
    private WarantyRepository warantyRepository;
	@Autowired
    private ReceiptWarantyRepository receiptWarantyRepository;
    @Autowired
    private PromotionRepository promotionRepository;
	
	@Autowired
    private CheckSparepartsRepository checkSparepartsRepository;

    @Autowired
    private SexRepository sexRepository;

	@Override
	public void run(String... strings) throws Exception {
	    // Surapa
        Sex male = new Sex(1L, "male");
        Sex female = new Sex(2L, "female");
        sexRepository.save(male);
        sexRepository.save(female);

            //Pornnuttha Jaiprasert///
        Employee e1 = new Employee("Natcha", "Boonchoei","081-111-1111","repair","Thailand", 20, "Female", "1111111111111","a");
        Employee e2 = new Employee("Surapa", "Khemmakanon","082-222-2222","manager","Thailand", 20, "Male", "2222222222222","b");
        Employee e3 = new Employee("Patcharapon", "Duangtian","083-333-3333","sales","Thailand", 21, "Female", "3333333333333","c");
        Employee e4 = new Employee("Sarida", "Mongkhonnum","084-444-4444","sales","Thailand", 22, "Male", "4444444444444","d");
        Employee e6 = new Employee("Anuruk", "Thongkumsai","085-555-5555","sales","Thailand", 20, "Male", "5555555555555","e");
        Employee e5 = new Employee("Pornnuttha", "Jaiprasert","086-666-6666","sales","Thailand", 20, "Female", "6666666666666","f");
        Employee e7 = new Employee("Peter", "Jakob","087-777-7777","repair","Thailand", 23, "Male", "7777777777777","g");
        Employee e8 = new Employee("Mark", "Lee","088-888-8888","repair","Thailand", 22, "Male", "8888888888888","h");
        this.employeeRepository.save(e1);
        this.employeeRepository.save(e2);
        this.employeeRepository.save(e3);
        this.employeeRepository.save(e4);
        this.employeeRepository.save(e5);
        this.employeeRepository.save(e6);
        this.employeeRepository.save(e7);
        this.employeeRepository.save(e8);

        User u1 = new User("B5807109","1",e1);
        User u2 = new User("B5814756","1",e2);
        User u3 = new User("B5815005","1",e3);
        User u4 = new User("B5815159","1",e4);
        User u6 = new User("B5823154","1",e5);
        User u5 = new User("B5823093","1",e6);
        User u7 = new User("B5800001","1",e7);
        User u8 = new User("B5800002","1",e8);
        this.userRepository.save(u1);
        this.userRepository.save(u2);
        this.userRepository.save(u3);
        this.userRepository.save(u4);
        this.userRepository.save(u5);
        this.userRepository.save(u6);
        this.userRepository.save(u7);
        this.userRepository.save(u8);

        Customer c1 = new Customer("Mark","Tuan","087-123-5678");
        Customer c2 = new Customer("Jackson","Hung","081-123-1234");
        this.customerRepository.save(c1);
        this.customerRepository.save(c2);
		
		
        Product p1 = new Product("Notebook","Toshiba","satellite l35","Black","Hardware","เปิดไม่ติด");
        Product p2 = new Product("Printer","hp","g2000","Black","Hardware","หมึกสีไม่ออก");
        this.productRepository.save(p1);
        this.productRepository.save(p2);

        DateFormat newDate = new SimpleDateFormat("yyyy/MM/dd");
        Date x = newDate.parse("2017/10/06");
        Date y = newDate.parse("2017/10/12");

        RepairInvoice r1 = new RepairInvoice(x,y,c1,p1,e1,e2);
        RepairInvoice r2 = new RepairInvoice(x,y,c2,p2,e1,e2);
        this.repairInvoiceRepository.save(r1);
        this.repairInvoiceRepository.save(r2);

        //////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////

        //////////////////////////////////////////////////////////////////////
        // Nactha//
        /////////////////////////////////////////////////////////////////////
        Hardware hardware1 = new Hardware("H1","RAM");
        Hardware hardware2 = new Hardware("H2","CPU");
        Hardware hardware3 = new Hardware("H3","HDD");
        Hardware hardware4 = new Hardware("H4","Graphic Card");
        Hardware hardware5 = new Hardware("H5","Sound Card");

        this.hardwareRepository.save(hardware1);
        this.hardwareRepository.save(hardware2);
        this.hardwareRepository.save(hardware3);
        this.hardwareRepository.save(hardware4);
        this.hardwareRepository.save(hardware5);

        //////////////////////////////////////////////////////////////////////
        // PATCHARAPON DUANGTIAN //
        /////////////////////////////////////////////////////////////////////
        Device d1 = new Device("Notebook","Toshiba","satellite l35", r1);
        Device d2 = new Device("Printer","hp","g2000", r2);
        this.deviceRepository.save(d1);
        this.deviceRepository.save(d2);

        Waranty w1 = new Waranty("Waranty S", 6, 690);
        Waranty w2 = new Waranty("Waranty M", 12, 1290);
        Waranty w3 = new Waranty("Waranty L", 24, 2390);
        this.warantyRepository.save(w1);
        this.warantyRepository.save(w2);
        this.warantyRepository.save(w3);

        Date t1 = newDate.parse("2017/12/28");
        Date t2 = newDate.parse("2018/01/02");

        ReceiptWaranty rw1 = new ReceiptWaranty(t1, d1, w1);
        ReceiptWaranty rw2 = new ReceiptWaranty(t2, d2, w3);
        this.receiptWarantyRepository.save(rw1);
        this.receiptWarantyRepository.save(rw2);

        ////////////////////////////////////////////////////////////////////////
        ////Sarida Mongkhonnum//////////////////////////////////////////////////
		Date ds1 = newDate.parse("2017/12/25");
		Date dl1 = newDate.parse("2018/01/5");
		Date ds2 = newDate.parse("2018/02/1");
		Date dl2 = newDate.parse("2017/02/20");

		Promotion pm1 = new Promotion("โปรโมชั่นปีใหม่","เพียงลูกค้าซ่อมคอมหรือซื้ออุปกรณ์คอมพิวเตอร์ ครบ 800 บาท สามารถนำใบเสร็จมาลุ้นรับของรางวัลมากมายจากทางร้าน",ds1,dl1);
		this.promotionRepository.save(pm1);
		Promotion pm2 = new Promotion("โปรโมชั่นรับหน้าร้อน","ลดทันที 20% สำหรับอุปกรณ์คอมพิวเตอร์ทุกชนิดในร้าน",ds2,dl2);
		this.promotionRepository.save(pm2);
		
		//////////////////////////////////////////////////////////////////////
        // Anurak Thongkumsai//
        /////////////////////////////////////////////////////////////////////
		Date d = new Date();

        CheckSpareparts ch1 = new CheckSpareparts(e6,d,"15","15","15","20","5","5","20","10","20","10","20","10","5","20");
        this.checkSparepartsRepository.save(ch1);
	}
}