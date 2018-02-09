'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var client = require('./client');
var root = '/api';
var when = require('when');
var follow = require('./follow');
var datetime = new Date().toLocaleString();
var hardwareID1='';
var data1;
var data2;
//------------------------------------------------------------------------------------------------------------//
class Main extends React.Component{
  constructor() {
    super();
    };
  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='center'>ร้านซ่อมคอมพิวเตอร์</div>
      </Ons.Toolbar>
    );
  }
  pushPageEmployee(){
    this.props.navigator.pushPage({ component: Home, props: { key: 'home' } });
  }
 pushPageCustomer(){
    this.props.navigator.pushPage({ component: List, props: { key: 'list' } });
  }
  render() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>

        <div style={{ textAlign: 'center' }}><br/><br/><br/>
        <p>
        < Ons.Button onClick={this.pushPageCustomer.bind(this)}>
            Customer
          </Ons.Button>
          </p>
        
        </div><br/><br/><br/>
        <div style={{ textAlign: 'center' }}>
        <p>
        <Ons.Button onClick={this.pushPageEmployee.bind(this)}>
            Employee
          </Ons.Button>
          </p>
        <p style={{ textAlign: 'center', opacity: '0.6', paddingTop: '20px' }}>
          Sign in ในฐานะพนักงาน
        </p>
        </div>
    
    </Ons.Page>
  );
 }
}
//------------------------------------------------------------------------------------------------------------//
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {users: []};
    this.state = {
      title: props.title ? props.title : 'Custom Page',
      nextTitle: null,
      Username: '',
      Password: '',
      userslength:null,
      eid:0,
      sid:0,
      rid:0
    };
  }

  componentDidMount() {
    client({method: 'GET', path: '/api/users'}).done(response => {
      this.setState({users: response.entity._embedded.users});
      this.setState({userslength: response.entity._embedded.users.length});
    });
  }
  
  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
        <div className='center'>ร้านซ่อมคอมพิวเตอร์</div>
      </Ons.Toolbar>
    );
  }

  handleClickLogin() {
    var i=0;
	  var j=0;
    for(var i=0 ; i<this.state.userslength ; i++){
      if(this.state.users[i].username === this.state.Username && this.state.users[i].password === this.state.Password ){
        this.props.navigator.pushPage({ component: Menu, 
             props: { key: 'Menu', 
             Username: this.state.Username,
             eid:i+1
        } });
        break;
      }
      else{
        j++;
        if(j>0 && i=== this.state.userslength-1){
          ons.notification.alert('Username or Password incorrect!');
          j = 0;
        }
      }
      }
    }
	  

  renderMenu() {
    return (
      <Ons.Toolbar>
        <div className='center'>ร้านซ่อมคอมพิวเตอร์</div>
      </Ons.Toolbar>
    );
  }
  render() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
        <div style={{ textAlign: 'center' }}>
          <h3>SIGN IN</h3>
          <p>
            <Ons.Input
              value={this.state.Username}
              onChange={evt => this.setState({Username: evt.target.value})}
              modifier='underbar'
              float
              placeholder='Username' />
          </p><p>
            <Ons.Input
              value={this.state.Password}
              onChange={evt => this.setState({Password: evt.target.value})}
              modifier='underbar'
              type='password'
              float
              placeholder='Password' />
          </p>
          <p>
            <Ons.Button onClick={this.handleClickLogin.bind(this)}>Sign in</Ons.Button>
          </p>
        </div>
        <p style={{ textAlign: 'center', opacity: '0.6', paddingTop: '20px' }}>
            กรุณาเข้าสู่ระบบด้วย Username พนักงานของคุณ
        </p>
    </Ons.Page>
  );
 }
}


{/*Page Menu---------------------------------------------------------------*/}
class Menu extends React.Component {
  constructor(props) {
    super(props);
	this.state = {employees: []};
    this.state = {
      title: props.title ? props.title : 'Custom Page',
      nextTitle: null,
      Username: props.Username,
      eid: props.eid,
	  position:null
    };
  }
  
    componentDidMount() {
    client({method: 'GET', path: '/api/employees'}).done(response => {
      this.setState({employees: response.entity._embedded.employees});
      this.setState({position:this.state.employees[this.state.eid-1].position});
    });
  }

  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'></div>
        <div className='center'>ร้านซ่อมคอมพิวเตอร์</div>
        <div className="right" paddingRight="20px" paddingLeft="20px">
        <ons-icon size="30px" icon="ion-person"/>&nbsp;&nbsp;{this.state.Username}&nbsp;&nbsp;&nbsp;</div>
      </Ons.Toolbar>
    );
  }

  
  pushPageRepairInvoice() {
      this.props.navigator.pushPage({ component: MakeRepairInvoice, 
        props: { key: 'MakeRepairInvoice', 
        Username: this.state.Username,
        eid:this.state.eid
      } });
  } 

  pushPageRepairUpdate() {
		this.props.navigator.pushPage({ 
			component: MakeRepairUpdate, 
			props: { key: 'MakeRepairUpdate1',
			Username: this.state.Username,
			eid: this.state.eid }
		});
	}

  pushPagePayment() {
    this.props.navigator.pushPage({ component: Payment, 
      props: { key: 'Payment', 
      Username: this.state.Username,
      eid:this.state.eid
      } });
    }

	pushPageCheckSpareparts() {
    this.props.navigator.pushPage({ component: CheckSpareparts, 
      props: { key: 'CheckSpareparts', 
      Username: this.state.Username,
      eid:this.state.eid
      } });
    }
	
  pushPageHardware() {
      this.props.navigator.pushPage({ component: Hardware, 
        props: { key: 'Hardware', 
        Username: this.state.Username,
        eid:this.state.eid
        } });
      
    }
    pushPagePromotion(){
      this.props.navigator.pushPage({ component: Promotion,
      props:{key: 'Promotion', Username:this.state.Username,
    eid:this.state.eid}})
    }

  pushPageManageEmployee() {
      this.props.navigator.pushPage({ component: ManageEmployee, props: { key: 'ManageEmployee' } });
    }

  showPageHome() {
    window.location.reload()
  }

  render() {
	
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>

          <div style={{ textAlign: 'center' }}>
          <h3>MENU</h3>
        
          <Ons.ListTitle>เลือกรายการ</Ons.ListTitle>
          <Ons.List>
                <Ons.ListItem tappable onClick={this.pushPageManageEmployee.bind(this)}>
                  <ons-icon icon="ion-ios-people"></ons-icon>&nbsp;&nbsp;
                  บันทึกข้อมูลพนักงาน </Ons.ListItem>
                

              <Ons.ListItem tappable onClick={this.pushPageRepairInvoice.bind(this)}>
                  <ons-icon icon="ion-plus-circled"></ons-icon>&nbsp;&nbsp;
                  แจ้งซ่อมคอมพิวเตอร์</Ons.ListItem>
				
				 <Ons.ListItem tappable onClick={this.pushPageCheckSpareparts.bind(this)}>
                  <ons-icon icon="ion-loop"></ons-icon>&nbsp;&nbsp;
                  บันทึกเช็คอะไหล่</Ons.ListItem>
				  
              <Ons.ListItem tappable onClick={this.pushPageRepairUpdate.bind(this)}>
                  <ons-icon icon="ion-loop"></ons-icon>&nbsp;&nbsp;
                  อัพเดทสถานะการซ่อม</Ons.ListItem>
                

              <Ons.ListItem tappable onClick={this.pushPagePayment.bind(this)}> 
                  <ons-icon icon="ion-printer"></ons-icon>&nbsp;&nbsp;
                  พิมพ์ใบแจ้งชำระสินค้า</Ons.ListItem>
                  

              <Ons.ListItem tappable onClick={this.pushPageHardware.bind(this)}>
                  <ons-icon icon="ion-settings"></ons-icon>&nbsp;&nbsp;
                  สั่งซื้ออะไหล่</Ons.ListItem>
              <Ons.ListItem tappable onClick={this.pushPagePromotion.bind(this)}>
                  <ons-icon icon="ion-clipboard"></ons-icon>&nbsp;&nbsp;
                  จัดการโปรโมชั่น</Ons.ListItem>
                  
          
                           

          </Ons.List>
          </div>

          <div style={{ textAlign: 'center', paddingTop:'10px', paddingBottom:'10px'}}>  
            <Ons.Button onClick={this.showPageHome.bind(this)}>
              Logout 
            </Ons.Button>
          </div>

      </Ons.Page>
    );
  }
}
//------------------------------------------------------------------------------------------------------------//
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {customers: []};
    this.state = {
      title: props.title ? props.title : 'Custom Page',
    };
  }
  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'></div>
        <div className='center'>ร้านซ่อมคอมพิวเตอร์</div>
        <div className="right" paddingRight="20px" paddingLeft="20px">
        <ons-icon size="30px" icon="ion-person"/>Customer</div>
      </Ons.Toolbar>
    );
  }
  pushPageRating() {
    this.props.navigator.pushPage({ component: Rating, 
      props: { key: 'Rating', 
      Username: this.state.Username,
      } 
    });
  }

  pushPageWaranty() {
    this.props.navigator.pushPage({ component: Page, 
      props: { key: 'Page', 
      Username: this.state.Username,
      } 
    });
  }

  showPageHome() {
    window.location.reload()
  }

  render() {
	
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>

          <div style={{ textAlign: 'center' }}>
          <h3>MENU</h3>
        
          <Ons.ListTitle>เลือกรายการ</Ons.ListTitle>
          <Ons.List>
			        
              <Ons.ListItem tappable onClick={this.pushPageRating.bind(this)}>
                  <ons-icon icon="ion-ios-star"></ons-icon>&nbsp;&nbsp;
                  บันทึกแบบประเมินความพึงพอใจ</Ons.ListItem>

                  <Ons.ListItem tappable onClick={this.pushPageWaranty.bind(this)}>
                  <ons-icon icon="ion-ios-star"></ons-icon>&nbsp;&nbsp;
                   สั่งซื้อประกัน</Ons.ListItem>
          </Ons.List>
          </div>

          <div style={{ textAlign: 'center', paddingTop:'10px', paddingBottom:'10px'}}>  
            <Ons.Button onClick={this.showPageHome.bind(this)}>
              Logout 
            </Ons.Button>
          </div>

      </Ons.Page>
    );
  }
}
{/*
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
 -----------------------------ระบบบันทึกราคาสินค้า PORNNUTTHA JAIPRASERT B5823093 Sprint#1-----------------------------------------------
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
*/}
{/*MakeRepairInvoice------------------------------------------------------------------------*/}
class MakeRepairInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title ? props.title : 'Custom Page',
      nextTitle: null
    }
      this.handleClickSelectedEmp = this.handleClickSelectedEmp.bind(this);
      this.handleClickSave = this.handleClickSave.bind(this);
      this.state = {employees: []};
      this.state = {
        dialogShown: false,
        Username:props.Username,
        dateIn:null,
        dateOut:null,
        cid:0,
        pid:0,
        sid:props.eid,
        rid:0,
        cusFirstName:null,
        cusLastName:null,
        cusTel:null,
        modifier:'',
        Type:null,
        Brand:null,
        Model:null,
        Color:null,
        Problem:null,
        Note:null,
        repairFirstName:'',
        repairLastName:'',
        repairTel:'',
        salesFirstName:'',
        salesLastName:'',
        salesTel:'',
      }
  }

  componentDidMount() {
    client({method: 'GET', path: '/api/users'}).done(response => {
      this.setState({users: response.entity._embedded.users});
    });
    client({method: 'GET', path: '/api/employees'}).done(response => {
        this.setState({employees: response.entity._embedded.employees});
        this.setState({salesFirstName:this.state.employees[this.state.sid-1].firstName});
        this.setState({salesLastName:this.state.employees[this.state.sid-1].lastName});
        this.setState({salesTel:this.state.employees[this.state.sid-1].tel});
    });
  }

  

  showDialog() {
    if(this.state.dateIn == null || this.state.dateOut == null ||
      this.state.rid == 0 ||
      this.state.cusFirstName == null || this.state.cusLastName == null || this.state.cusTel == null ||
      this.state.Type == null || this.state.Brand == null || this.state.Color == null || this.state.Problem == null
    ){
      ons.notification.alert('กรุณากรอกข้อมูลให้ครบ!')
    }else{
      this.setState({dialogShown: true});
    }
  }

  hideDialog() {
    this.setState({dialogShown: false});
    this.props.navigator.pushPage({ component: PrintRepairInvoice, 
      props: { key: 'PrintRepairInvoice' ,
      Username:this.state.Username,
      customerName:this.state.cusFirstName + " " + this.state.cusLastName,
      Type:this.state.Type,
      Brand:this.state.Brand,
      Model:this.state.Model,
      Color:this.state.Color,
      Problem:this.state.Problem,
      Note:this.state.Note,
      sid:this.state.sid,
      salesName:this.state.salesFirstName + " " + this.state.salesLastName,
      salesTel:this.state.salesTel,
      repairName:this.state.repairFirstName + " " + this.state.repairLastName,
      repairTel:this.state.repairTel,
      dateIn:this.state.dateIn,
      dateOut:this.state.dateOut,
       //
      } });
  }

  handleClickSave(cusFirstName,cusLastName,cusTel,Type,Brand,Model,Color,Problem,Note,dateIn,dateOut,sid,rid) {
    return function () {
      client({method: 'GET', path: '/cusFirstName/'+cusFirstName+'/cusLastName/'+cusLastName+'/cusTel/'+cusTel}).done(
          client({method: 'GET', path: '/Type/'+Type+'/Brand/'+Brand+'/Model/'+Model+'/Color/'+Color+'/Problem/'+Problem+'/Note/'+Note}).done(
              client({method: 'GET', path: '/dateIn/'+dateIn+'/dateOut/'+dateOut+'/salesEmp/'+sid+'/repairEmp/'+rid}).done(
                ons.notification.alert('บันทึกข้อมูลสำเร็จ!')
          )
        )
      )
    }
  }

  pushPage() {
    ons.notification.alert('บันทึกข้อมูลสำเร็จ');
    this.props.navigator.pushPage({ component: PrintRepairInvoice, 
         props: { key: 'PrintRepairInvoice' ,

          //
         } });
  }
 
  handleClickSelectedEmp(employee, index) {
    //ons.notification.alert('เลือก ' + employee.firstName +" " +employee.lastName)
    this.setState({repairFirstName: employee.firstName})
    this.setState({repairLastName: employee.lastName}) 
    this.setState({repairTel: employee.tel}) 
    this.setState({rid: index+1});
  }

  renderRow(row, index) {
    if(row.position === 'repair'){
    return(
      <Ons.ListItem 
          tappable
          key={row._links.self.href}
          data={row}
          onClick={this.handleClickSelectedEmp.bind(this, row, index)}
          >
          <div className='left'>
              <ons-icon size="25px"  icon="ion-wrench"/> &nbsp;&nbsp;
              {index+1}
          </div>
          <div className="center">
              {row.firstName}&nbsp;{row.lastName}
          </div>
      </Ons.ListItem>
    )
    }
  }

    renderToolbar() {
      return (
        <Ons.Toolbar>
          <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
          <div className="center">แบบฟอร์มการแจ้งซ่อมคอมพิวเตอร์</div>
          <div className="right" paddingRight="20px" paddingLeft="20px"><ons-icon size="30px"  icon="ion-person"/>&nbsp;&nbsp;{this.state.Username}&nbsp;&nbsp;&nbsp;</div>
        </Ons.Toolbar>
      );
    }
  
    render() {
      return (
        <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
          <div style={{ textAlign: 'center', paddingTop:'10px', paddingBottom:'10px', paddingLeft:'20%', paddingRight:'20%'}}>  
            <center>
			<Ons.Card style={{width: '350px', backgroundColor: '#bde58b'}}>
			<h4><ons-icon size="25px"  icon="ion-calendar"></ons-icon>&nbsp;&nbsp; วันที่แจ้งซ่อม - วันที่ส่งคืน</h4>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;วันที่แจ้งซ่อม :
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                  type="date" 
                  placeholder="วันที่ส่งคืน" 
                  ng-model="dateValue"
                  value={this.state.value}
                  onChange={evt => this.setState({ dateIn: evt.target.value })}>
              </input>
            </p>
                
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;วันที่ส่งคืน :
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                  type="date" 
                  placeholder="วันที่ส่งคืน" 
                  ng-model="dateValue"
                  value={this.state.value}
                  onChange={evt => this.setState({ dateOut: evt.target.value })}>
              </input>
            </p>
			</Ons.Card>
			</center>
          </div>
		  
		  {/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
		  
			
          <div style={{ textAlign: 'center', paddingTop:'10px', paddingBottom:'10px', paddingLeft:'20%', paddingRight:'20%'}}>  
            <center>
			<Ons.Card style={{width: '350px', backgroundColor: '#b6ede3'}}>
			<h4><ons-icon size="25px"  icon="ion-person"></ons-icon>&nbsp;&nbsp;ข้อมูลลูกค้า</h4>
              <p>
               <Ons.Input modifier="underbar" 
                   placeholder="ชื่อ" 
                   float 
                   onChange={evt => this.setState({ cusFirstName: evt.target.value })} >     
               </Ons.Input>
              </p>
              <p>
               <Ons.Input modifier="underbar" 
                   placeholder="นามสกุล" 
                   float 
                   onChange={evt => this.setState({ cusLastName: evt.target.value })} >     
               </Ons.Input>
              </p>
              <p>
               <Ons.Input modifier="underbar" 
                   placeholder="เบอร์โทรศัพท์" 
                   float 
                   onChange={evt => this.setState({ cusTel: evt.target.value })} >     
               </Ons.Input>
              </p>
			  </Ons.Card>
			</center>
          </div>
          {/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
          
          <div style={{ textAlign: 'center', paddingTop:'10px', paddingBottom:'10px'}}>  
		  <center>
			<Ons.Card style={{width: '530px', backgroundColor: '#d6d468'}}>
            <h4><ons-icon  size="25px" icon="ion-wrench"></ons-icon>&nbsp;&nbsp; รายละเอียดคอมพิวเตอร์</h4>
              <Ons.List style={{width: '500px'}}>
                <Ons.ListItem >
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    ประเภท&nbsp;&nbsp;: &nbsp;&nbsp;
                    <Ons.Select id="choose-sel" 
                      value={this.state.Type} 
                      modifier={this.state.Type}
                      onChange={evt => this.setState({Type: event.target.value})} >                         
                        <option value="ไม่ระบุ">ไม่ระบุ</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Desktop">Desktop</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Printer">Printer</option>
                    </Ons.Select>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <p style={{ opacity: '0.6' , color: 'red'}}>**</p>
                </Ons.ListItem>
                

                <Ons.ListItem>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  ยี่ห้อ&nbsp;&nbsp;: &nbsp;&nbsp;
                    <Ons.Select id="choose-sel" 
                      value={this.state.Brand} 
                      modifier={this.state.Brand}
                      onChange={evt => this.setState({Brand: event.target.value})} >   
                        <option value="ไม่ระบุ">ไม่ระบุ</option>
                        <option value="DELL">DELL</option>
                        <option value="Toshiba">Toshiba</option>
                        <option value="Acer">Acer</option>
                        <option value="lenovo">lenovo</option>
                        <option value="hp">hp</option>
                    </Ons.Select> 
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <p style={{ opacity: '0.6' , color: 'red'}}>**</p>					
                </Ons.ListItem>

                <Ons.ListItem>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  รุ่น&nbsp;&nbsp;: &nbsp;&nbsp;
                    <Ons.Input modifier="" 
                      placeholder="เช่น Inspiron 14"
                      float 
                      onChange={evt => this.setState({ Model: evt.target.value })} >     
                    </Ons.Input>
                </Ons.ListItem>

                <Ons.ListItem>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  สี&nbsp;&nbsp;: &nbsp;&nbsp;
                    <Ons.Select id="choose-sel" 
                      value={this.state.Color} 
                      modifier={this.state.Color}
                      onChange={evt => this.setState({Color: event.target.value})} >  
                        <option value="ไม่ระบุ">ไม่ระบุ</option>
                        <option value="Black">ดำ</option>
                        <option value="Silver">เงิน</option>
                        <option value="Red">แดง</option>
                    </Ons.Select>     
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <p style={{ opacity: '0.6' , color: 'red'}}>**</p>
                </Ons.ListItem>
 
                <Ons.ListItem>
                  ปัญหาเรื่อง&nbsp;&nbsp;: &nbsp;&nbsp;
                    <Ons.Select id="choose-sel" 
                      value={this.state.Problem} 
                      modifier={this.state.Problem}
                      onChange={evt => this.setState({Problem: event.target.value})} >   
                        <option value="ไม่ระบุ">ไม่ระบุ</option>
                        <option value="Software">Software</option>
                        <option value="Hardware">Hardware</option>
                        <option value="Sound">เสียง</option>
                        <option value="Screen">จอ</option>
                        <option value="Keyboard">แป้นพิมพ์</option>
                    </Ons.Select>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <p style={{ opacity: '0.6' , color: 'red'}}>**</p>
                </Ons.ListItem>   

                <Ons.ListItem>&nbsp;&nbsp;
                  หมายเหตุ : &nbsp;&nbsp;
                  <Ons.Input modifier="" 
                    placeholder="รายละเอียด"
                    float 
                    onChange={evt => this.setState({ Note: evt.target.value })} >     
                  </Ons.Input>
                </Ons.ListItem>  
              </Ons.List > 
           </Ons.Card>
			</center>
          </div>
          
          
		{/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
          <div style={{ textAlign: 'center', paddingTop:'10px', paddingBottom:'10px'}}>  
		  <center>
			<Ons.Card style={{width: '530px', backgroundColor: '#64ba4c'}}>
            <h4><ons-icon size="25px"  icon="ion-person"></ons-icon>&nbsp;&nbsp;เลือกพนักงานซ่อม</h4>
            <h3>เลือก .. {this.state.repairFirstName} {this.state.repairLastName}</h3>
              <center>
              <Ons.List style={{width: '500px'}}>
                <Ons.ListHeader>รายชื่อพนักงานซ่อม</Ons.ListHeader>
              </Ons.List>
              
              <Ons.List
                style={{width: '500px'}}
                dataSource={this.state.employees}
                renderRow={this.renderRow}
                handleClickSelectedEmp={this.handleClickSelectedEmp} 
              />
			  </center>
              </Ons.Card>
			</center>
          </div>
          {/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
          {/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
          <div style={{ textAlign: 'center', paddingTop:'15px', paddingBottom:'10px', paddingLeft:'20%', paddingRight:'20%'}}> 

            <Ons.Button onClick={this.showDialog.bind(this)}>
              บันทึกและพิมพ์ใบแจ้งซ่อม
            </Ons.Button>
          
            <Ons.Dialog
              isOpen={this.state.dialogShown}
            >
            <div style={{textAlign: 'center', margin: '20px'}}>
              <p style={{opacity: 0.5}}>บันทึก-พิมพ์ใบแจ้งซ่อม</p>
              <p>
                <Ons.Button onClick={this.handleClickSave(
                  this.state.cusFirstName,this.state.cusLastName,this.state.cusTel,
                  this.state.Type,this.state.Brand,this.state.Model,this.state.Color,this.state.Problem,this.state.Note,
                  this.state.dateIn, this.state.dateOut, this.state.sid,this.state.rid
                  )}>
                    บันทึก
                  </Ons.Button>
                  &nbsp;&nbsp;&nbsp;
                  <Ons.Button onClick={this.hideDialog.bind(this)}>พิมพ์ใบแจ้งซ่อม</Ons.Button>
              </p>
            </div>
          </Ons.Dialog>

          </div>
        </Ons.Page>
      );
    }
  }

  {/*PrintRepairInvoice-------------------------------------------------------------------*/}
  class PrintRepairInvoice extends React.Component {
    constructor(props) {
      super(props);
      this.state = {repairInvoices: []};
      this.state = {
        title: props.title ? props.title : 'Custom Page',
        nextTitle: null,
      sid:props.sid,
      Username:props.Username,
      repairInvoiceslength:0,
      customerName: props.customerName,
      Type: props.Type,
      Brand: props.Brand,
      Model: props.Model,
      Color: props.Color,
      Problem: props.Problem,
      Note: props.Note,
      salesName: props.salesName,
      salesTel: props.salesTel,
      repairName: props.repairName,
      repairTel: props.repairTel,
      dateIn: props.dateIn,
      dateOut: props.dateOut
    };
  }

  componentDidMount() {
    client({method: 'GET', path: '/api/repairInvoices'}).done(response => {
      this.setState({repairInvoices: response.entity._embedded.repairInvoices});
      this.setState({repairInvoiceslength: response.entity._embedded.repairInvoices.length});
    });
  }
  
  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'></div>
        <div className='center'>ใบแจ้งซ่อมคอมพิวเตอร์</div>
        <div className='right'>
            <Ons.Button modifier='quiet' 
              onClick={this.showPageMenu.bind(this)}
            >
              <ons-icon size="25px"  icon="ion-home"/>  Menu 
            </Ons.Button>
            
            
        </div>
      </Ons.Toolbar>
    );
  }

  

  showPageMenu() {
    this.props.navigator.resetPage({
      component: Menu,
      key: 'Menu',
      props: {
        Username: this.state.Username,
        eid:this.state.sid}
    }); 
  }

  print(){
    window.print();
  }

  render() {
    if(this.state.Model == null){
      this.setState({Model: "ไม่ระบุ"});
    }
    if(this.state.Note == null){
      this.setState({Note: "ไม่ระบุ"});
    }
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>

        <div style={{ textAlign: 'center', paddingTop:'10px', paddingBottom:'10px'}}>  
        <center>
        <Ons.Card style={{width: '400px', backgroundColor: '#7f9cc5'}}>
          <div style={{ textAlign: 'center' }}>   
                <h4> 
                <ons-icon size="25px" icon="ion-chevron-left"></ons-icon>
                  &nbsp;&nbsp;&nbsp;
                  ใบแจ้งซ่อมคอมพิวเตอร์ 
                  &nbsp;&nbsp;&nbsp;
                <ons-icon size="25px" icon="ion-chevron-right"></ons-icon>
                </h4>  
                <p> คุณ{this.state.customerName} </p>
              
                      <div>
                      <Ons.Card style={{ textAlign: 'center'}}>
                      <p><b>รหัสการแจ้งซ่อม : 2017_{this.state.repairInvoiceslength}</b></p>
  
                      <p>วันที่รับแจ้ง : {this.state.dateIn}</p>
                      <p>&nbsp;&nbsp;วันที่รับคืน : {this.state.dateOut}</p>
                      <p style={{ opacity: '0.6'}} >หมายเหตุ : วันที่รับคืนอาจเปลี่ยนแปลงได้ </p>
                      </Ons.Card>
                      </div>



                      <div>
                      <Ons.Card style={{ textAlign: 'center'}}>
                      <center>

                      <table>
                        <tbody class="list">
                        <tr>
                          <td><b>ประเภท</b> : {this.state.Type}</td>
                          <td><b>ยี่ห้อ</b> : {this.state.Brand}</td>
                        </tr>
                        <tr>
                        <td><b>รุ่น</b> : {this.state.Model}</td>
                        <td><b>สี</b> : {this.state.Color}</td>
                        </tr>
                        <tr>
                        <td><b>ปัญหา</b> : {this.state.Problem}</td>
                        <td><b>หมายเหตุ</b> : {this.state.Note}</td>
                        </tr>                           
                        </tbody>
                      </table>
                      </center>
                      </Ons.Card>
                      </div>

                      <div>
                      <Ons.Card style={{ textAlign: 'center'}}>
                      <div style={{ textAlign: 'Left', paddingLeft:'25'}}>
                      <p><b>พนักงานขาย</b></p>
                      <p style={{ textAlign: 'Left', paddingLeft:'55'}}>ชื่อ : {this.state.salesName}</p>
                      <p style={{ textAlign: 'Left', paddingLeft:'55'}}>เบอร์โทรศัพท์ : {this.state.salesTel}</p>
                      </div>
                  
                      <div style={{ textAlign: 'Left', paddingLeft:'25'}}>
                      <p><b>พนักงานซ่อม</b></p>
                      <p style={{ textAlign: 'Left', paddingLeft:'55'}}>ชื่อ : {this.state.repairName}</p>
                      <p style={{ textAlign: 'Left', paddingLeft:'55'}}>เบอร์โทรศัพท์ : {this.state.repairTel}</p>
                      </div>
                      </Ons.Card>
                      </div>
               
            
              
          </div>
        </Ons.Card>
        </center>
        </div>

           <p style={{textAlign: 'Center',  paddingTop: '15px'}}>
           <Ons.Button onClick={this.print.bind(this)}>
             <ons-icon size="30px" icon="ion-printer"></ons-icon> 
             &nbsp;&nbsp;&nbsp;
             PRINT</Ons.Button></p>    

      </Ons.Page>
    );
  }
}
{/*
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  ---------ระบบสั่งซื้ออะไหล่ natcha boonchoei B5807109-----------------------------------
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
*/}

class Detail extends React.Component {
  constructor(props) {
        //super();
        super(props);
        this.state = {
          title: props.title ? props.title : 'Customer Page',
          nextTitle: null,
          amount : 0,
          newdate :'',
          newtime :'',
          orderses:[]


        };
      }

      renderToolbar() {
        return (
          <Ons.Toolbar>
            <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
            <div className="center">Detail</div>
            <div className='right'>
            <Ons.Button modifier='quiet' onClick={this.showPageMenu.bind(this)}>
              <ons-icon size="25px"  icon="ion-home"/>  Menu 
            </Ons.Button>   
        </div>
          </Ons.Toolbar>
        );
      }

      componentDidMount() {
                  client({method: 'GET', path: '/api/orderses'}).done(response => {
                      this.setState({orderses: response.entity._embedded.orderses});
                  });
                }
                showPageMenu() {
    this.props.navigator.resetPage({
      component: Menu,
      key: 'Menu',
      props: {
        Username: this.state.Username,
        eid:this.state.eid}
    }); 
  }

    renderRow(row, index) {


                     return(

                      <Ons.ListItem tappable
                          key={row._links.self.href}
                          data={row}
                          >
                          <div className="center">
                          
                            จำนวน :
                           &nbsp;
                            {row.qty}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                           ราคา :
                        &nbsp;
                           {row.price}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                           รายละเอียดอะไหล่ :
                        &nbsp;
                           {row.detail}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                           ราคารวม :
                            &nbsp;
                          {row.totalprice}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          
                          </div>
                      </Ons.ListItem>
                    )
                  }



  print(){
      window.print();
     }
  pushPage() {


    }
      popPage() {
        this.props.navigator.popPage();
      }
      editSelects(event) {
      this.setState({modifier: event.target.value});
    }

    handleWeightChange(e) {
      this.setState({newdate: e.target.value});
    }

    handlePriceChange(e) {
      this.setState({newtime: e.target.value});
    }
      render() {
        return (



        <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>


          <div style={{ textAlign: 'center' }}>
            <div style={{margin: 70}}>
              <Ons.List
                 renderHeader={() => <Ons.ListHeader><b>รายละเอียด :</b></Ons.ListHeader>}
                                                />                  
                            <Ons.List
                                // ใน page มี list
                                // ตั้งค่า dataSource ของ list ให้แสดงรายการ employee
                                     dataSource={this.state.orderses}
                                // แต่ละค่าใน dataSource จะกลายเป็น row ใน renderRow
                                     renderRow={this.renderRow}
                                // ส่ง handleClick ไปด้วย เพราะเมื่อเริ่ordersesม render แล้ว
                                // this จะเปลี่ยน
                             />
                            </div>

            </div>
           <p style={{ textAlign: 'center', padding: '10px' }}>
                   <Ons.Button onClick={this.print.bind(this)} style={{ textAlign: 'center'}} modifier='cta'>
                   <Ons.Icon Size='25px' icon='ion-printer' /> &nbsp;&nbsp;
                   PRINT
                   </Ons.Button>
                   </p>
        </Ons.Page>
        );
      }
  }

//------------------------------------------------------------------------------------------------------------//
class Orders extends React.Component {
  constructor(props) {
    //super();
    super(props);

    this.handleNewDateChange = this.handleNewDateChange.bind(this);
    this.handleNewTimeChange = this.handleNewTimeChange.bind(this);
    this.handleNewPriceChange = this.handleNewPriceChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      title: props.title ? props.title : 'สั่งอะไหล่',
      nextTitle: null,
      amount : 0,

      qty : '',
      detail : '',
      price : '',
      hardwareID:props.hardwareID,
  
      
    };
  }


handleNewDateChange(e) {
  this.setState({qty: e.target.value});
}
handleNewPriceChange(e) {
  this.setState({price: e.target.value});
}

handleNewTimeChange(e) {
  this.setState({detail: e.target.value});
}
 pushPageDetail() {
     fetch('http://localhost:8080/api/orderses')
         .then((response)=> response.json()).then((responseJson) => {
         data2 = responseJson;

         this.props.navigator.pushPage({ component: Detail, props: { key: 'Detail' } });
     })

 }

  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
        <div className="center">{this.state.title}</div>

      </Ons.Toolbar>
    );
  }

  handleClick(qty,detail,price,hardwareID){
    return function () {
    client({method: 'GET', path:'/qty/'+qty+'/detail/'+detail+'/price/'+price+'/hardware/'+hardwareID}).done(
        ons.notification.alert("บันทึกเรียบร้อย"));

    }
   }

  showMenu() {
    this.props.showMenu();
  }


  popPage() {


    this.props.navigator.popPage();
  }
  render() {

    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
      <center>
          {/*<img src={"https://scontent-fbkk5-7.us-fbcdn.net/v1/t.1-48/1426l78O9684I4108ZPH0J4S8_842023153_K1DlXQOI5DHP/dskvvc.qpjhg.xmwo/p/data/205/205046-507b80d848556.jpg"}  style={{width: '50%'}} />
      */}
        </center>
      <Ons.List
        renderHeader={() => <Ons.ListHeader><b>จำนวนอะไหล่ :</b></Ons.ListHeader>}
      />
            <center><Ons.Input
            value={this.state.qty}
            onChange={this.handleNewDateChange}
            modifier='underbar'
             
            float
            size = '30'
            placeholder='จำนวนอะไหล่'
            />
            </center>

            <Ons.List
             renderHeader={() => <Ons.ListHeader><b>ราคา:</b></Ons.ListHeader>}
      />
          <center><Ons.Input
            value={this.state.price}
            onChange={this.handleNewPriceChange}
            modifier='underbar'
            
            float
            size = '30'
            placeholder='ราคา'
            />
            </center>


            <Ons.List
        renderHeader={() => <Ons.ListHeader><b>รายละเอียดอะไหล่:</b></Ons.ListHeader>}
      />
          <center><Ons.Input
            value={this.state.time}
            onChange={this.handleNewTimeChange}
            modifier='underbar'
            
            float
            size = '30'
            placeholder='รายละเอียดอะไหล่'
            />
            </center>


      <center>
              <p> </p>
              <Ons.Button style={{margin: '6px'}} modifier='cta'
              onClick={this.handleClick(this.state.qty,this.state.detail,this.state.price,this.state.hardwareID)}
              >
              สั่งซื้อ</Ons.Button>

              <Ons.Button style={{margin: '6px'}} modifier='cta' onClick={this. pushPageDetail.bind(this)}>
                รายละเอียด
              </Ons.Button>

               
      </center>

      </Ons.Page>
    );
  }
}

//------------------------------------------------------------------------------------------------------------//
class Hardware extends React.Component {
    constructor(props) {
        //super();
        super(props);
        this.state = {
            username:'',
            password:'',
            hardwareID:props.hardwareID,
            hardwareID:''


        };
      }

  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='center'>ค้นหาอะไหล่</div>
      </Ons.Toolbar>
    );
  }
  handleUsernameBoardChange(e) {
    this.setState({hardwareID: e.target.value});
  }

  showMenu() {
    this.props.showMenu();
  }

  pushPage() {
     fetch('http://localhost:8080/api/hardwares/search/findByHardwareID?'+
        'hardwareID=' + this.state.hardwareID)
        .then((response)=> response.json()).then((responseJson) => {
        data1 = responseJson;



             hardwareID1 = this.state.hardwareID;
             this.props.navigator.pushPage({ component: Orders, props: { key: 'Orders' ,hardwareID:this.state.hardwareID} });
        })
        .catch((error) => {
            ons.notification.alert('ไม่พบข้อมูล');

        });
  }

  render() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
          <center>
              {/*<img src={"http://www.joebrucker.com/wp-content/uploads/2013/05/cartoon-airplane.jpeg"}  style={{width: '50%'}} />
         */}
          <p>
            <Ons.Input
              value={this.state.hardwareID}
              onChange={this.handleUsernameBoardChange.bind(this)}
              modifier='underbar'
              float
              placeholder='hardwareID' />
          </p>

          <p>
          <Ons.Button style={{margin: '6px'}} modifier='cta' onClick={this.pushPage.bind(this) }>
          ค้นหา
        </Ons.Button>
          </p>
          <p style={{ textAlign: 'center', opacity: '0.6', paddingTop: '20px' }}>
            กรุณาป้อน ID ของสินค้า เพื่อค้นหา
        </p>
          </center>
      </Ons.Page>
    );
  }
}

{/*
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  -----------ระบบประเมิณพนักงาน ANURAK THONGKUMSAI	B5823154---------------------------
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
*/}

var h11=0,h22=0;
class InsertRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {repairInvoices: []};
    this.state = {
      id:props.id,
	  id2:null,

      a:"1",
      b:"2",
      c:"3",
      d:"4",
      e:"5",
    };


  }
  componentDidMount() {
    client({method: 'GET', path: '/api/repairInvoices'}).done(response => {
        this.setState({repairInvoices: response.entity._embedded.repairInvoices});
    });
  }
  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
        <div className="center">ประเมินผลงานการให้บริการของพนักงาน</div>
        <div className="right" paddingRight="20px" paddingLeft="20px"><ons-icon size="30px"  icon="ion-person"/>&nbsp;&nbsp;Customer&nbsp;&nbsp;&nbsp;</div>
      </Ons.Toolbar>
    );
  }

 popPage() {
       if(h11===0 && h22===0){
          ons.notification.alert('คุณยังไม่ได้ป้อนข้อมูลอะไรเลย');
       }
       if(h11>0 && h22===0){
          ons.notification.alert('คุณยังไม่ได้ป้อนRatingของการซ่อมโดยรวม');
       }
       if(h11===0 && h22>0){
          ons.notification.alert('คุณยังไม่ได้ป้อน Rating ของ พนักงาน');
       }
      if(h11>0 && h22>0){
        if(h11==1){
          h11="แย่";
        }else if(h11==2){
          h11="พอใช้";
        }else if(h11==3){
          h11="ปานกลาง";
        }else if(h11==4){
          h11="ดี";
        }else{
          h11="ดีมาก";
        }
        if(h22==1){
          h22="แย่";
        }else if(h22==2){
          h22="พอใช้";
        }else if(h22==3){
          h22="ปานกลาง";
        }else if(h22==4){
          h22="ดี";
        }else{
          h22="ดีมาก";
        }

        client({method: 'GET', path: '/vote/'+this.state.id+'/idm/'+this.state.id2+'/employelevel1/'+h11+'/repairlevel/'+h22}).done(
          ons.notification.alert("Your Select "+h11+" and "+h22))
          h11=0;
          h22=0;
        this.props.navigator.popPage();
      }

 }

 pushPage() {
    ons.notification.alert('บันทึกข้อมูลสำเร็จ');
    this.props.navigator.pushPage({ component: PrintRepairInvoice,
       props: { key: 'PrintRepairInvoice' ,
        //
       } });
  }

 handleClick1(statelevel) {

    return function () {
      h11=statelevel;

          if(statelevel==="1") ons.notification.alert('Your Select Rating = แย่');
       	  if(statelevel==="2") ons.notification.alert('Your Select Rating = พอใช้');
       	  if(statelevel==="3") ons.notification.alert('Your Select Rating = ปานกลาง');
       	  if(statelevel==="4") ons.notification.alert('Your Select Rating = ดี');
          if(statelevel==="5") ons.notification.alert('Your Select Rating = ดีมาก');

    }
  }
  handleClick2(statelevel) {

     return function () {
       h22=statelevel;

          if(statelevel==="1") ons.notification.alert('Your Select Rating = แย่');
           if(statelevel==="2") ons.notification.alert('Your Select Rating = พอใช้');
           if(statelevel==="3") ons.notification.alert('Your Select Rating = ปานกลาง');
           if(statelevel==="4") ons.notification.alert('Your Select Rating = ดี');
           if(statelevel==="5") ons.notification.alert('Your Select Rating = ดีมาก');

     }
   }

  render() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
	  <br/> <br/>
 <center>
     <Ons.Card style={{width:'600px', backgroundColor: '#ffffff'}}>
       <center>
      <table><tr><td>

       <Ons.Card style={{width:'250px', backgroundColor: '#d7e5da'}}>
		<center>
			<p>
              <Ons.Input
                value={this.state.id2}
                onChange={evt => this.setState({ id2: evt.target.value })}
                modifier='underbar'
                float
                placeholder='ID Employee' />
            </p>
		</center>
       <Ons.List>
       <Ons.ListHeader>ประเมินผลงานการให้บริการของพนักงาน</Ons.ListHeader>
       <Ons.ListItem onClick={this.handleClick1(this.state.a)}>แย่</Ons.ListItem>
       <Ons.ListItem onClick={this.handleClick1(this.state.b)}>พอใช้</Ons.ListItem>
       <Ons.ListItem onClick={this.handleClick1(this.state.c)}>ปานกลาง</Ons.ListItem>
       <Ons.ListItem onClick={this.handleClick1(this.state.d)}>ดี</Ons.ListItem>
       <Ons.ListItem onClick={this.handleClick1(this.state.e)}>ดีมาก</Ons.ListItem>
       </Ons.List>
       </Ons.Card>
       </td><td>
       <Ons.Card style={{width:'250px', backgroundColor: '#8b9b8e'}}>
	   <br/>
	   <br/>
	   <br/>

       <Ons.List>
          <Ons.ListHeader>ประเมินผลงานการซ่อมโดยรวม</Ons.ListHeader>
       <Ons.ListItem onClick={this.handleClick2(this.state.a)}>แย่</Ons.ListItem>
       <Ons.ListItem onClick={this.handleClick2(this.state.b)}>พอใช้</Ons.ListItem>
       <Ons.ListItem onClick={this.handleClick2(this.state.c)}>ปานกลาง</Ons.ListItem>
       <Ons.ListItem onClick={this.handleClick2(this.state.d)}>ดี</Ons.ListItem>
       <Ons.ListItem onClick={this.handleClick2(this.state.e)}>ดีมาก</Ons.ListItem>
       </Ons.List>
       </Ons.Card>
       </td></tr></table></center>
       <center>
       <Ons.Button style={{margin: '6px', width:'120'}} modifier='outline'
        onClick={this.popPage.bind(this)}>
         <center>Finish</center>
       </Ons.Button>
       </center>
      </Ons.Card>
	   </center>
      </Ons.Page>
    );
  }
}

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {repairInvoices: []};
    this.state = {users: []};
    this.state = {
      id:null,
      repairslength:null,
      Username:this.props.Username,
    };
  }

  componentDidMount() {
    client({method: 'GET', path: '/api/repairInvoices'}).done(response => {
        this.setState({repairInvoices: response.entity._embedded.repairInvoices});
    });
    client({method: 'GET', path: '/api/repairInvoices'}).done(response => {
      this.setState({repairslength: response.entity._embedded.repairInvoices.length});
    });

  }

  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
        <div className="center">Select Result</div>
        <div className="right" paddingRight="20px" paddingLeft="20px"><ons-icon size="30px"  icon="ion-person"/>&nbsp;&nbsp;Customer&nbsp;&nbsp;&nbsp;</div>
      </Ons.Toolbar>
    );
  }


    pushPage1() {
      var i=0;
      var k=0;
      for(var i=0 ; i<this.state.repairslength ; i++){
        if(i === this.state.id-1 ){
          ons.notification.alert('Plese Select Level of Rating!');
          this.props.navigator.pushPage({ component: InsertRating,
               props: { key: 'InsertRating',
               id:i+1,
               Username:this.state.Username,
          } });
          break;
        }
        else{
          k++;
          if(k>0 && i=== this.state.repairslength-1){
            ons.notification.alert('incorrect!');
            k = 0;
          }
        }
        }
      }

    pushPage2() {
      this.props.navigator.pushPage({ component: Result, props: { key: 'Result',Username:this.state.Username,
      } });
    }

  render() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
	 
        <div style={{ textAlign: 'center' }}>
		 <center>
     <Ons.Card style={{width:'650px', backgroundColor: '#a0ffb6'}}>
	  <Ons.Card style={{width:'600px', backgroundColor: '#ffffff'}}>
	 <center>
            <p>
              <Ons.Input
                value={this.state.id}
                onChange={evt => this.setState({ id: evt.target.value })}
                modifier='underbar'
                float
                placeholder='ID Repair' />
            </p>

            <Ons.Button style={{margin: '6px', width:'120'}} modifier='outline' onClick={this.pushPage1.bind(this)}>
              <center>Search</center>
            </Ons.Button>
            <Ons.Button style={{margin: '6px', width:'120'}} modifier='outline' onClick={this.pushPage2.bind(this)}>
              <center>Result</center>
            </Ons.Button>
			</center>
     </Ons.Card>
	 </Ons.Card>
	 </center>
			 <br /><br /><br /><br /><br /><br />
          <img src={"https://cdn0.iconfinder.com/data/icons/statistics-icons-rounded/110/Computer-Chart-128.png"} style={{ width: '20%' }} />
		  
        </div>

      </Ons.Page>
    );
  }
}

  /////////\\\\\\\\\\\\\\\\\\//////////End  Level ////////////\\\\\\\\\\\\\/////////////
/// แสดง ผล

class Result extends React.Component {
 constructor(props) {
		super(props);
    this.state = {ratings: [],
    Username:this.props.Username};
	}

	componentDidMount() {
		client({method: 'GET', path: '/api/ratings'}).done(response => {
			this.setState({ratings: response.entity._embedded.ratings});
		});
	}


  renderToolbar() {
    return (
        <Ons.Toolbar>
        <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
        <div className='center'>ใบแจ้งซ่อมคอมพิวเตอร์</div>
        <div className='right'>
            <Ons.Button modifier='quiet' 
              onClick={this.showPageMenu.bind(this)}
            >
              <ons-icon size="25px"  icon="ion-home"/>  Menu 
            </Ons.Button>
            <Ons.Button modifier='quiet' 
              onClick={this.pushPage.bind(this)}
              style={{color: 'red'}}
            >
              <ons-icon size="25px"  icon="ion-printer"/>  Print 
            </Ons.Button>
            
            
        </div>
      </Ons.Toolbar>
    );
  }

  

  showPageMenu() {
    this.props.navigator.resetPage({
      component: List,
      key: 'List',
      props: {
        Username: this.state.Username,}
    }); 
  }


  pushPage() {
    window.print();
  }
   renderRow(row,index) {

    return(
    <center>
      <Ons.Card style={{width: '80%'}}
          tappable
          key={row._links.self.href}
          data={row}
          >
          <center>
          <td style={{width:'20px'}}>
          <center>{index+1}</center>
          </td>
          <td style={{width:'140px'}}>
          <center>{row._embedded.employee.id}</center>
          </td>
          <td style={{width:'200px'}}>
          <center>{row._embedded.employee.firstName}</center>
          </td>
          <td style={{width:'200px'}}>
          <center>{row._embedded.employee.lastName}</center>
          </td>
          <td style={{width:'160px'}}>
          <center>{row._embedded.employee.tel}</center>
          </td>
          <td style={{width:'160px'}}>
          <center>{row.employelevel1}</center>
          </td>
          <td style={{width:'160px'}}>
          <center>{row.repairlevel}</center>
          </td>
         
        </center>
      </Ons.Card>
    </center>
    )
  }
  render() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
        <center>
        <h2>Result All</h2>
        </center>

		<center>
			<Ons.Card style={{width: '80%'}}>
			<center>
			  <td style={{width:'20px'}}><center>ที่</center></td>
			  <td style={{width:'140px'}}><center>ID Employee</center></td>
        <td style={{width:'200px'}}><center>ชื่อ พนักงานต้อนรับ</center></td>
			  <td style={{width:'200px'}}><center>นามสกุล พนักงานต้อนรับ</center></td>
        <td style={{width:'160px'}}><center>เบอร์โทรศัพท์</center></td>
			  <td style={{width:'160px'}}><center>Rating พนักงานต้อนรับ</center></td>
			  <td style={{width:'160px'}}><center>Rating การซ่อมโดยรวม</center></td>
			 </center>
			</Ons.Card>
		</center>
		<center>
        <Ons.List
           dataSource={this.state.ratings}
           renderRow={this.renderRow}
        />
		</center>

      </Ons.Page>
    );
  }
}
{/*
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  -----------ระบบบันทีกพนักงาน SURAPA KHEMKANON B5814756---------------------------
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
*/}
class ManageEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {employees: []};
    this.state = {users: []};
    this.state = {
      title: props.title ? props.title : 'Custom Page',
      nextTitle: null,
      dialogShown: false,
    };
 
  }
  componentDidMount() {
    client({method: 'GET', path: '/api/users'}).done(response => {
      this.setState({users: response.entity._embedded.users});
    });
    client({method: 'GET', path: '/api/employees'}).done(response => {
        this.setState({employees: response.entity._embedded.employees});
    });
  }

  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
        <div className='center'>จัดการข้อมูลพนักงาน</div>
        <div className="right" paddingRight="20px" paddingLeft="20px">
        <ons-icon size="30px" icon="ion-person"/>&nbsp;&nbsp;MANAGER&nbsp;&nbsp;&nbsp;</div>
      </Ons.Toolbar>
    );
  }
	showPageMenu() {
      this.props.navigator.resetPage({
        component: Menu,
        key: 'Menu',
        props: {
          Username: this.state.Username,
          eid:this.props.eid}
      }); 
    }
  showDialog() {
    this.setState({dialogShown: true});
    
  }

  hideDialog() {
    this.setState({dialogShown: false});
    client({method: 'GET', path: '/api/users'}).done(response => {
      this.setState({users: response.entity._embedded.users});
    });
    client({method: 'GET', path: '/api/employees'}).done(response => {
        this.setState({employees: response.entity._embedded.employees});
    });
    this.props.navigator.resetPage({
      component: ManageEmployee,
      key: 'ManageEmployee',
    },{ animation: 'fade' }); 

  }

  pushPageAddEmp() {
    this.props.navigator.pushPage({ component: AddEmp, props: { key: 'AddEmp' } });
  }
  
	popPage(){
			this.props.navigator.popPage();
	}
 
  
  handleClickSelectedEmp(user,index) {
    client({method: 'DELETE', path: user._links.self.href   }).done(response =>{  
      ons.notification.alert('เลือก ' + user.username );
    }); 
  };
     

  renderRow(row, index) {
    return(
      <Ons.ListItem 
          key={row._links.self.href}
          //data={row}
          data={row}
          //onClick={this.handleClickSelectedEmp.bind(this, row, index)}
          >
          <div className='left' style={{width: '100px'}}>
              {index+1}
          </div>
          <div className="center">
              {row.username}
          </div>
          <div className='right'>
            <Ons.Icon icon='md-delete' size="30px"/>
            &nbsp;&nbsp;&nbsp;
            <Ons.Checkbox
            inputId={`checkbox-${row}`}
            onClick={this.handleClickSelectedEmp.bind(this, row, index)}
            />
          </div>
      </Ons.ListItem>
    )
  }
  
  render() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar}>
    <p style={{textAlign: 'right', paddingTop:'10px', paddingRight:'20px'}}>  
	<Ons.Button modifier='quiet' 
                onClick={this.showPageMenu.bind(this)}>
                <ons-icon size="25px"  icon="ion-home"/>  Menu 
              </Ons.Button>
			  &nbsp;&nbsp;&nbsp;
	    <Ons.Button 
        modifier='outline'
	      onClick={this.pushPageAddEmp.bind(this)}> 
        <Ons.Icon icon='md-account-add' /> เพิ่มพนักงาน
      </Ons.Button>
      &nbsp;&nbsp;&nbsp;
    
    </p>
    
    <section style={{textAlign: 'center'}}>
      <Ons.List>
        <Ons.ListItem style={{backgroundColor: '#c6c6c6'}}>
          <div className='left' style={{width: '100px'}}>
            <b>ลำดับที่</b>
          </div>
          <div className="center" >
          <b>รหัส พนักงาน</b>
          </div>
          <div className='right'>
          <b>ลบ</b>
          </div>
        </Ons.ListItem>
     </Ons.List>
     <Ons.List
        //dataSource={this.state.employees}
        dataSource={this.state.users}
        renderRow={this.renderRow}
        handleClickSelectedEmp={this.handleClickSelectedEmp} 
      />       
		</section>
    

    <Ons.Dialog
      isOpen={this.state.dialogShown}
    >
            <div style={{textAlign: 'center', margin: '20px'}}>
              <p style={{opacity: 0.5}}>ต้องการ"ลบ"พนักงาน</p>
              <p>
                <Ons.Button
                onClick={this.hideDialog.bind(this)}
                >
                  ตกลง
                </Ons.Button>
              </p>
            </div>
          </Ons.Dialog>
        
      </Ons.Page>
    );
  }
}
class AddEmp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {employees: []};
    this.state = {users: []};
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      username:null,
      password:null,
      firstName:null,
      lastName:null,
      tel:null,
      position:null,
      address:null,
      age:null,
      sex:null,
      id_card_NO:null,
      e_mail:null,
    }
  }

    renderToolbar() {
      return (
        <Ons.Toolbar>
        <div className='left'></div>
        <div className='center'>เพิ่มข้อมูลพนักงาน</div>
        <div className="right" paddingRight="20px" paddingLeft="20px">
        <ons-icon size="30px" icon="ion-person"/>&nbsp;&nbsp;MANAGER&nbsp;&nbsp;&nbsp;</div>
        </Ons.Toolbar>
      );
    }


    handlePushManager(){
      client({method: 'GET', path: '/api/users'}).done(response => {
        this.setState({users: response.entity._embedded.users});
      });
      client({method: 'GET', path: '/api/employees'}).done(response => {
          this.setState({employees: response.entity._embedded.employees});
      });
      this.props.navigator.resetPage({
        component: ManageEmployee,
        key: 'ManageEmployee',
      },{ animation: 'fade' }); 
      
    }
  
    handleClick(firstName,lastName,tel,position,address,age,sex,id_card_NO,e_mail,username,password) {
      return function () { 
        client({method: 'GET', path:'/firstName/'+firstName+'/lastName/'+lastName+'/tel/'+tel+'/position/'+position+'/address/'+address+'/age/'+age+'/sex/'+sex+'/id_card_NO/'+id_card_NO+'/e_mail/'+e_mail+'/username/'+username+'/password/'+password}).then(response => {
          ons.notification.alert('บันทึก');
        });
      }
 
  }
  
   render() {
      return (
        <Ons.Page renderToolbar={this.renderToolbar}>
          <section style={{textAlign: 'center'}}>
         
          <Ons.List>
            <Ons.ListHeader>**กรุณากรอกข้อมูลด้วยความจริงทุกประการ**</Ons.ListHeader>
          </Ons.List>

            <p>
                      <label>USERNAME </label>
                        <label><Ons.Input
                          value={this.state.username}
                          onChange={evt => this.setState({ username: evt.target.value })}
                          modifier='underbar'
                          float
                          placeholder='username'
                          style={{
                                          appearance: 'textfield',
                                          backgroundColor: 'white',
                                          border: '2px inset',
                                          padding: '0.5px',
                                          cursor: 'auto',
                                        }}
                          />
                        </label>&nbsp;&nbsp;&nbsp;&nbsp;

                        <label>PASSWORD</label>
                        <label> <Ons.Input
                          value={this.state.password}
                          onChange={evt => this.setState({ password: evt.target.value })}
                          modifier='underbar'
                          float
                          placeholder='password'
                          style={{
                                          appearance: 'textfield',
                                          backgroundColor: 'white',
                                          border: '2px inset',
                                          padding: '1px',
                                          cursor: 'auto',
                                        }}
                          />
                      </label>
                      </p>


            <Ons.List>
              <Ons.ListHeader><h4>ข้อมูลส่วนตัว</h4></Ons.ListHeader>
            </Ons.List>
            <p>
                      <label>ชื่อ </label>
                        <label><Ons.Input
                          value={this.state.firstname}
                          onChange={evt => this.setState({ firstName: evt.target.value })}
                          modifier='underbar'
                          float
                          placeholder='ชื่อ'
                          style={{
                                          appearance: 'textfield',
                                          backgroundColor: 'white',
                                          border: '2px inset',
                                          padding: '0.3px',
                                          cursor: 'auto',
                                        }}
                          />
                        </label>&nbsp;&nbsp;&nbsp;&nbsp;
                        <label>นามสกุล</label><label> <Ons.Input
                          value={this.state.lastname}
                          onChange={evt => this.setState({ lastName: evt.target.value })}
                          modifier='underbar'
                          float
                          placeholder='นามสกุล'
                          style={{
                                          appearance: 'textfield',
                                          backgroundColor: 'white',
                                          border: '2px inset',
                                          padding: '0.3px',
                                          cursor: 'auto',
                                        }}
                          />
                      </label>&nbsp;&nbsp;&nbsp;&nbsp;
                       <label>อายุ</label><label> <Ons.Input
                       value={this.state.age}
                       onChange={evt => this.setState({ age: evt.target.value })}
                        modifier='underbar'
                        float
                        placeholder=''
                        style={{
                                appearance: 'textfield',
                                backgroundColor: 'white',
                                border: '2px inset',
                                padding: '0.3px',
                                cursor: 'auto',
                                }}
                        /></label>
                      </p>

                      <p className="line-center">
                      <label>เลขบัตรประจำตัวประชาชน</label><label> <Ons.Input
                       value={this.state.id_card_NO}
                       onChange={evt => this.setState({ id_card_NO: evt.target.value })}
                       modifier='underbar'
                       float
                       placeholder='เลขประจำตัวประชาชน'
                       style={{
                               appearance: 'textfield',
                               backgroundColor: 'white',
                               border: '2px inset',
                               padding: '0.3px',
                               cursor: 'auto',
                               }}
                        />
                        </label>
                        &nbsp;&nbsp;<b>เพศ : </b>&nbsp;&nbsp;
                        <div className="line-center">
                            <Ons.Select id="choose-sel"
                            className="select"
                              value={this.state.sex}
                              modifier={this.state.sex}
                              onChange={evt => this.setState({sex: event.target.value})} >
                              <option >โปรดเลือก..</option>
                              <option value="Male">ชาย</option>
                              <option value="Female">หญิง</option>
                            </Ons.Select>
                        </div>

                      </p>
            <Ons.List>
             <Ons.ListHeader><h4>ข้อมูลติดต่อ</h4></Ons.ListHeader>
            </Ons.List>
            <p>
                      <label>เบอร์โทรศัพท์ </label>
                        <label><Ons.Input
                          value={this.state.tel}
                          onChange={evt => this.setState({ tel: evt.target.value })}
                          modifier='underbar'
                          float
                          placeholder=''
                          style={{
                                          appearance: 'textfield',
                                          backgroundColor: 'white',
                                          border: '2px inset',
                                          padding: '0.3px',
                                          cursor: 'auto',
                                        }}
                          />
                        </label>&nbsp;&nbsp;&nbsp;&nbsp;
                        <label>E-mail</label>

                        <label> <Ons.Input
                          value={this.state.e_mail}
                          onChange={evt => this.setState({ e_mail: evt.target.value })}
                          modifier='underbar'
                          float
                          placeholder='e-mail'
                          style={{
                                          appearance: 'textfield',
                                          backgroundColor: 'white',
                                          border: '2px inset',
                                          padding: '0.3px',
                                          cursor: 'auto',
                                        }}
                          />
                      </label>
                      </p>

                      <p className="line-center">
                      <label>ที่อยู่ </label><label> <Ons.Input
                        value={this.state.address}
                        onChange={evt => this.setState({ address: evt.target.value })}
                        modifier='underbar'
                        float
                        placeholder='ที่อยู่'
                        style={{
                               appearance: 'textfield',
                               backgroundColor: 'white',
                               border: '2px inset',
                               padding: '0.3px',
                               cursor: 'auto',
                               }}/></label>

                        &nbsp;&nbsp;<b>ตำแหน่ง :</b>&nbsp;&nbsp;
                      <div className="line-center">
                        <Ons.Select id="choose-sel"
                           className="select"
                           value={this.state.position}
                           modifier={this.state.position}
                           onChange={evt => this.setState({position: event.target.value})} >
                           <option >โปรดเลือก..</option>
                               <option value="manager">ผู้จัดการ</option>
                               <option value="sales">พนักงานขาย</option>
                               <option value="repair">พนักงานซ่อม</option>
                           </Ons.Select>
                      </div>
                      </p>


            <p>

            <Ons.Button onClick={this.handleClick(
                this.state.firstName,this.state.lastName,this.state.tel,
                this.state.position,this.state.address,this.state.age,this.state.sex,this.state.id_card_NO,this.state.e_mail,
                this.state.username,this.state.password
                )}>
                <Ons.Icon icon='md-account-add' /> บันทึกพนักงาน</Ons.Button>
                &nbsp;&nbsp;&nbsp;
                <Ons.Button onClick={this.handlePushManager.bind(this)}>กลับสู่หน้า รายชื่อ</Ons.Button>

           </p>

          </section>
          <Ons.List>
            <Ons.ListHeader>หมายเหตุ:กรุณากรอกข้อมูลให้ครบถ้วน</Ons.ListHeader>
          </Ons.List>
          
        </Ons.Page>        
      );
    }
}

{/*
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  -----------ระบบสั่งชื้อประกันซ่อม PATCHARAPON DUANGTIAN B5815005 ------------------------
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
*/}
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {repairInvoices: []};
    this.state = {users: []};
    this.state = {
      id:null,
      ctid:null,
      repairslength:null,
      Username:this.props.Username,
    };
  }

  componentDidMount() {
    client({method: 'GET', path: '/api/repairInvoices'}).done(response => {
        this.setState({repairInvoices: response.entity._embedded.repairInvoices});
    });
    client({method: 'GET', path: '/api/repairInvoices'}).done(response => {
      this.setState({repairslength: response.entity._embedded.repairInvoices.length});
    });
  }

  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
        <div className="center">Select Result</div>
        <div className="right" paddingRight="20px" paddingLeft="20px"><ons-icon size="30px"  icon="ion-person"/>
          &nbsp;&nbsp;Customer&nbsp;&nbsp;&nbsp;
        </div>
      </Ons.Toolbar>
    );
  }

    pushPage1() {
      var i=0;
      var k=0;
      for(var i=0 ; i<this.state.repairslength ; i++){
        if(i === this.state.id-1 ){
          ons.notification.alert('Please Select Waranty!');
          this.props.navigator.pushPage({ component: Waranty,
               props: { key: 'Waranty',
               id:i+1,
               Username:this.state.Username,
               ctid:this.state.id
          } });
          break;
        }
        else{
          k++;
          if(k>0 && i=== this.state.repairslength-1){
            ons.notification.alert('incorrect!');
            k = 0;
          }
        }
      }
    }

  render() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
        <div style={{ textAlign: 'center' }}>
            <p>
              <Ons.Input
                value={this.state.id}
                onChange={evt => this.setState({ id: evt.target.value })}
                modifier='underbar'
                float
                placeholder='ID Repair' />
            </p>

            <Ons.Button style={{margin: '6px', width:'120'}} modifier='outline' onClick={this.pushPage1.bind(this)}>
              <center>Search</center>
            </Ons.Button>
        </div>

      </Ons.Page>
    );
  }
}

class Waranty extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  title: props.title ? props.title : 'Custom Page',
		  nextTitle: null,
		}
    this.handleClickSelectedWar = this.handleClickSelectedWar.bind(this);
    this.handleClickSaveDevice = this.handleClickSaveDevice.bind(this);
    this.handleClickSave = this.handleClickSave.bind(this);
    this.state = {waranties: []};
    this.state = {repairInvoices: []};
    this.state = {
      id:null,
      repairslength:null,
      Username:this.props.Username,
    };
	  this.state = {
		dialogShown: false,
		dataIn:{datetime},
		cusID:this.props.ctid,
		devID:0,
		warID:0,
		Type:null,
    Brand:null,
    Sesies:null,
		modifier: '',
		warantyName: '',
		warantyDuration: '',
		warantyPrice: ''
	  };
	}

	componentDidMount() {
    client({method: 'GET', path: '/api/repairInvoices'}).done(response => {
      this.setState({repairInvoices: response.entity._embedded.repairInvoices});
    });
		client({method: 'GET', path: '/api/waranties'}).done(response => {
			this.setState({waranties: response.entity._embedded.waranties});
			this.setState({warantyName:this.state.waranties[this.state.warID-1].warName});
			this.setState({warantyDuration:this.state.waranties[this.state.warID-1].duration});
			this.setState({warantyPrice:this.state.waranties[this.state.warID-1].price});
		});
	}

	showDialog() {
		if(this.state.Type == null || this.state.Brand == null){
		  ons.notification.alert('กรุณากรอกข้อมูลให้ครบ!')
		}else{
		  this.setState({dialogShown: true});
		}
	}

	hideDialog() {
		this.setState({dialogShown: false});
	}
	
	handleClickSelectedWar(waranty, index) {
		this.setState({warantyName: waranty.warName})
		this.setState({warantyDuration: waranty.duration}) 
		this.setState({warantyPrice: waranty.price}) 
		this.setState({warID: index+1});
	}

  handleClickSaveDevice(Type,Brand,Series,cusID){
    return function () {
			client({method: 'GET', path: '/Type/'+Type+'/Brand/'+Brand+'/Series/'+Series+'/cusID/'+cusID}).done(
				ons.notification.alert('บันทึกข้อมูลอุปกรณ์สำเร็จ!')
			)
		}
  }

	handleClickSave(dateIn,devID,warID) {
		return function () {
			client({method: 'GET', path: '/dateIn/'+dateIn+'/devID/'+devID+'/warID/'+warID}).done(
				ons.notification.alert('บันทึกข้อมูลประกันสำเร็จ!')
			)
		}
	}

	renderRow(row, index) {
		return(
		  <Ons.ListItem 
			  tappable
			  key={row._links.self.href}
			  data={row}
			  onClick={this.handleClickSelectedWar.bind(this, row, index)}
			  >
			  <div className='left'>
				  <ons-icon size="25px" icon="ion-medkit"/> &nbsp;&nbsp;
				  {index+1}
			  </div>
			  <div className="center">
				  {row.warName}&nbsp;{row.duration}&nbsp;เดือน&nbsp;{row.price}&nbsp;บาท
			  </div>
		  </Ons.ListItem>
		)
	}
  
	renderToolbar() {
	  return (
		<Ons.Toolbar>
			<div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
		  	<div className='center'>สั่งซื้อประกัน</div>
		  	<div className="right" paddingRight="20px" paddingLeft="20px">
        	<ons-icon size="30px" icon="ion-person"/>Customer</div>
		</Ons.Toolbar>
	  );
	}
  
	editSelects(event) {
	  this.setState({modifier: event.target.value});
	}
  
	render() {
	  return (
		<Ons.Page renderToolbar={this.renderToolbar}>
		  
		  <div style={{ textAlign: 'center', paddingTop:'10px', paddingBottom:'10px'}}>
		  <center>
			  <h4><ons-icon size="25px"  icon="ion-laptop"></ons-icon>&nbsp;&nbsp;เลือกอุปกรณ์</h4>
				
			<Ons.List style={{width: '380px'}}>
				  <Ons.ListItem >
					  &nbsp;&nbsp;&nbsp;&nbsp;
					  ประเภท<p style={{ opacity: '0.6' , color: 'red'}}>*</p>&nbsp;&nbsp;: &nbsp;&nbsp;
					  <Ons.Select id="choose-sel" 
						value={this.state.Type} 
						modifier={this.state.Type}
						onChange={evt => this.setState({Type: event.target.value})} >                         
						  <option value="ไม่ระบุ">ไม่ระบุ</option>
						  <option value="Laptop">Laptop</option>
						  <option value="Desktop">Desktop</option>
						  <option value="Mobile">Mobile</option>
						  <option value="Printer">Printer</option>
					  </Ons.Select>
				  </Ons.ListItem>
				  
				  <Ons.ListItem>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					ยี่ห้อ<p style={{ opacity: '0.6' , color: 'red'}}>*</p>&nbsp;&nbsp;: &nbsp;&nbsp;
					  <Ons.Select id="choose-sel" 
						value={this.state.Brand} 
						modifier={this.state.Brand}
						onChange={evt => this.setState({Brand: event.target.value})} >   
						  <option value="ไม่ระบุ">ไม่ระบุ</option>
						  <option value="DELL">DELL</option>
						  <option value="Toshiba">Toshiba</option>
						  <option value="Acer">Acer</option>
						  <option value="lenovo">lenovo</option>
						  <option value="hp">hp</option>
					  </Ons.Select> 				
				  </Ons.ListItem>
  
				  <Ons.ListItem>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					รุ่น&nbsp;&nbsp;: &nbsp;&nbsp;
					  <Ons.Input modifier="" 
						placeholder="เช่น Inspiron 14"
						float 
						onChange={evt => this.setState({Series: evt.target.value})} >     
					  </Ons.Input>
				  </Ons.ListItem>
				  
				  </Ons.List > 
				</center>
        <section style={{textAlign: 'center'}}>
			<p>
			  <Ons.Button onClick={this.handleClickSaveDevice(this.state.type,this.state.brand,this.state.sesies)}>
			  	เพิ่มอุปกรณ์
			  </Ons.Button>
			</p>
			</section>
		  </div>
  
			<div style={{ textAlign: 'center', paddingTop:'10px', paddingBottom:'10px'}}>  
			  <h4><ons-icon size="25px"  icon="ion-settings"></ons-icon>&nbsp;&nbsp;เลือกประกัน</h4>
				<center>
				<Ons.List
					style={{width: '380px'}}
					dataSource={this.state.waranties}
					renderRow={this.renderRow}
					handleClickSelectedWar={this.handleClickSelectedWar} 
		  		/>
				</center>
				<h3>เลือก [ {this.state.warantyName} ]</h3>
			</div>
			<section style={{textAlign: 'center'}}>
			<p>
			  <Ons.Button onClick={this.handleClickSave(this.state.dateIn,this.state.devID,this.state.warID)}>
			  	ยืนยัน
			  </Ons.Button>
			</p>
			</section>
		</Ons.Page>
	  );
	}
}
//---------------------------------------------------------------------------------------------Sarida
class Promotion extends React.Component {
	constructor(props) {
    super(props);
    this.state = {promotions: []};
    this.state = {
			title: props.title ? props.title : 'Promotion',
			dialogShown: false,
			proid: props.proid,
      promoname: '' ,
			description: '' ,
			datestart: '' ,
			dateout:'',
    };
	}
	
	componentDidMount() {
		client({method: 'GET', path: '/api/promotions'}).done(response => {
			this.setState({promotions: response.entity._embedded.promotions});
			this.setState({promoname:this.state.promotions[this.state.proid-1].promoname});
			this.setState({description:this.state.promotions[this.state.proid-1].description});
		});
	}
	
	
	renderToolbar() {
	  return (
		<Ons.Toolbar>
			<div className='left'>
		  <Ons.BackButton>Back</Ons.BackButton></div>
		  <div className='center'> <ons-icon size="30px" icon="ion-ios-list" /> &nbsp;&nbsp;
			Promotion Mangement</div>
		 
		</Ons.Toolbar>
	  );
	}
  

	
	showPageHome() {
    window.location.reload()
	}
	pushPageAddPromo() {
    this.props.navigator.pushPage({ component: AddPromo, props: { key: 'addpromo' } });
	}
	popPage(){
		this.props.navigator.popPage();
	}
	Deletepromo(){
		this.setState({dialogShown: true});
	}
	hideDialog() {
    this.setState({dialogShown: false});
    client({method: 'GET', path: '/api/promotions'}).done(response => {
      this.setState({promotions: response.entity._embedded.promotions});
    });
    this.props.navigator.resetPage({
      component: Promotion,
      key: 'Promotion',
    },{ animation: 'fade' }); 
  }
	renderRow(promotions, index) {
    return(
      <Ons.ListItem 
          
          key={promotions._links.self.href}
          data={promotions}
          >
          <div className='left'style={{width: '100px'}} >
              
              {index+1}
          </div>
          <div className="center">
							{row.promoname}&nbsp;{row.description}&nbsp;{row.datestart}&nbsp;{row.dateout}&nbsp;
				
          </div>
      </Ons.ListItem>
    )
  }
  
  
	render() {
	  return (
		<Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
		 
		  <div style={{ textAlign: 'right' }}>
			<br />
			<Ons.Button onClick={this.pushPageAddPromo.bind(this)}>
			  <ons-icon size="25px"  icon="ion-plus-round"></ons-icon> &nbsp;
			  เพิ่มโปรโมชั่น
			 </Ons.Button> 
			 &nbsp;
			<Ons.Button onClick={this.Deletepromo.bind(this)}>
			  <ons-icon size="25px"  icon="ion-trash-a"></ons-icon> &nbsp;
			  ลบโปรโมชั่น
			</Ons.Button>

			<Ons.Card  style={{ textAlign: 'center',backgroundColor: '#b19cd9 '}}>
		
			<Ons.List
				dataSource={this.props.promotions}
				renderRow= {this.renderRow}
      />       
			</Ons.Card>
		

			<Ons.Dialog isOpen={this.state.Deletepromo}>
            <div style={{textAlign: 'center', margin: '20px'}}>
              <p style={{opacity: 0.5}}>ต้องการลบโปรโมชั่น</p>
              <p>
                <Ons.Button onClick={this.hideDialog.bind(this)}>
                  ตกลง
                </Ons.Button>
              </p>
            </div>
          </Ons.Dialog>
        
     
		  </div>
		</Ons.Page>
	  );
	}
	handleClickSelectedPromo(promotions,index) {
    client({method: 'DELETE', path: promotions._links.self.href   }).done(response =>{  
      ons.notification.alert('Delete?' );
    }); 
	}
}
  //------------------------------------------------------------------------------------------
  class AddPromo extends React.Component {
		constructor(props) {
			super(props);
			this.state = {promotions: []};
			this.handleClick = this.handleClick.bind(this);
			this.state = {
				promoname: null,
				description: null,
				datestart: null,
				dateout: null
			};
		}

		handleClick() {
			client({method : 'GET',path:'/promoname/'+promoname+'/description/'+description+'/datestart/'+datestart+'/dateout/'+dateout})
			.done( ons.notification.alert('saved'));
		}
		renderToolbar() {
			return (
			<Ons.Toolbar>
			<div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
			<div className='center'>Promotion</div>
			</Ons.Toolbar>
			);
		}
		/*pushPagePromotion() {
			this.props.navigator.pushPage({ component: AddPromo, props: { key: 'addpromo' } });
		}*/
		render() {
			return (
				<Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
				<div style={{ textAlign: 'center' }}>
					<h2  >เพิ่มโปรโมชั่น</h2>
					</div>
					<section style={{textAlign: 'center'}}>
					<div>
					
					<Ons.Card style={{ textAlign: 'center'}}>
					<section style={{textAlign: 'center'}}>
					 <p> 
					 <center>
					<Ons.Input modifier="underbar" 
									placeholder="Promotion Name" 
									float 
									onChange={evt => this.setState({ promoName: evt.target.value })} >
								</Ons.Input>
				</center>
			 </p>
			 <p>
				 <center>
								<Ons.Input modifier="underbar" 
								type='text'
									placeholder="Describe" 
									float 
									onChange={evt => this.setState({ describe: evt.target.value })} >     
								</Ons.Input>
				 </center>
			 </p>
			 <p>
			 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date Start: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				 <center>
							<Ons.Input
							onChange={evt => this.setState({ dateStart : evt.target.value })}
							type="date"
					 placeholder="Date Start" 
					modifier="underbar"
					float
					/>
				 </center>
			 </p>
			 <p>
			  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date Last: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				 <center>
							<Ons.Input
							onChange={evt => this.setState({ dateLast : evt.target.value })}
							type="date"
					 placeholder="Date Last" 
					modifier="underbar"
					float
					/>
				 </center>
			 </p>
			 </section>
				</Ons.Card>
				<p>
				<Ons.Button onClick={this.handleClick}>
				<Ons.Icon icon='md-account-add' /> บันทึกโปรโมชั่น </Ons.Button>    
                
               
				</p>
				</div>
				</section>
				</Ons.Page>
			);
		}
	}
	
	
{/*
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  -----------ระบบบันทึกเช็คอะไหล่ ANURAK THONGKUMSAI	B5823154---------------------------
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
*/}	
class CheckSpareparts extends React.Component{
    constructor(props) {
        super(props);
        this.state = {checkSparepartses: []};
        this.state = {
            title: props.title ? props.title : 'Custom Page',
            nextTitle: null,
            dialogShown: false,
            Username:props.Username,
            eid:props.eid,
            Computer_Case:'',
            Cooling_System:'',
            CPU:'',
            Graphic_Card:'',
            Disk_for_PC:'',
            Hard_Disk_for_Notebook:'',
            Internal_Card_Reader:'',
            Mainboard:'',
            Monitor:'',
            Mouse:'',
            Optical_Disk_Drive:'',
            Power_Supply:'',
            RAM_for_PC:'',
            RAM_for_NoteBook:'',
            Sound_Card:'',
        }
    }

    componentDidMount() {
        client({method: 'GET', path: '/api/checkSparepartses'}).done(response => {
            this.setState({checkSparepartses: response.entity._embedded.checkSparepartses});
            });
    }

    renderToolbar() {
        return (
            <Ons.Toolbar>
            <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
        <div className="center">บันทึกการเช็คอะไหล่</div>
            <div className="right" paddingRight="20px" paddingLeft="20px"><ons-icon size="30px"  icon="ion-person"/>&nbsp;&nbsp;{this.state.Username}&nbsp;&nbsp;&nbsp;</div>
        </Ons.Toolbar>
    );
    }

    handleClickSave(eid,Computer_Case,Cooling_System,CPU,Graphic_Card,Disk_for_PC,Hard_Disk_for_Notebook,Internal_Card_Reader,Monitor,Mouse,Optical_Disk_Drive,Power_Supply,RAM_for_PC,RAM_for_NoteBook,Sound_Card){
        return function () {
            client({method: 'GET', path: '/employee/'+eid+'/Computer_Case/'+Computer_Case+'/Cooling_System/'+Cooling_System+'/CPU/'+CPU+'/Graphic_Card/'+Graphic_Card+'/Disk_for_PC/'+Disk_for_PC+'/Hard_Disk_for_Notebook/'+Hard_Disk_for_Notebook+'/Internal_Card_Reader/'+Internal_Card_Reader+'/Monitor/'+Monitor+'/Mouse/'+Mouse+'/Optical_Disk_Drive/'+Optical_Disk_Drive+'/Power_Supply/'+Power_Supply+'/RAM_for_PC/'+RAM_for_PC+'/RAM_for_NoteBook/'+RAM_for_NoteBook+'/Sound_Card/'+Sound_Card}).done(
                            ons.notification.alert("บันทึกสำเร็จ")
                   
                    )
                
            
        }
    }
	
	 

  showPageMenu() {
    this.props.navigator.resetPage({
      component: Menu,
      key: 'Menu',
      props: {
        Username: this.state.Username,
        eid:this.state.sid}
    }); 
  }

   
    render() {
        return (
            <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
    <div style={{ textAlign: 'center' }}>
    <br/><br/>
	
	<center>
	<Ons.Card style={{width: '600px', backgroundColor: '#e0efaa'}}>
        <Ons.Card style={{width: '550px', backgroundColor: '#ffffff'}}>
	
	<center>
        <h1>บันทึกการเช็คอะไหล่</h1>
		
        <p>
        <center>
        <table>
        <tbody>
        <tr>
        <th>NO.</th>
        <th>รายการอะไหล่</th>
        <th>จำนวน</th>
        </tr>
        <tr>
        <td>1</td>
        <td>Computer Case</td>
        <td>
        <Ons.Input
        modifier="underbar"
        placeholder="Computer Case"
        float
        onChange={evt => this.setState({ Computer_Case: evt.target.value })} >
    </Ons.Input>
        ชิ้น
        </td>
        </tr>

        <tr>
        <td>2</td>
        <td>Cooling System</td>
        <td>
        <Ons.Input
        modifier="underbar"
        placeholder="Cooling System"
        float
        onChange={evt => this.setState({ Cooling_System: evt.target.value })} >
    </Ons.Input>
        ชิ้น
        </td>
        </tr>

        <tr>
        <td>3</td>
        <td>CPU</td>
        <td>
        <Ons.Input
        modifier="underbar"
        placeholder="CPU"
        float
        onChange={evt => this.setState({ CPU: evt.target.value })} >
    </Ons.Input>
        ชิ้น
        </td>
        </tr>

        <tr>
        <td>4</td>
        <td>Graphic Card</td>
        <td>
        <Ons.Input
        modifier="underbar"
        placeholder="Graphic Card"
        float
        onChange={evt => this.setState({ Graphic_Card: evt.target.value })} >
    </Ons.Input>
        ชิ้น
        </td>
        </tr>

        <tr>
        <td>5</td>
        <td>Hard Disk for PC</td>
                          <td>
                          <Ons.Input
            modifier="underbar"
        placeholder="Hard Disk for PC"
        float
        onChange={evt => this.setState({ Disk_for_PC: evt.target.value })} >
    </Ons.Input>
        ชิ้น
        </td>
        </tr>

        <tr>
        <td>6</td>
        <td>Hard Disk for Notebook</td>
                          <td>
                          <Ons.Input
            modifier="underbar"
        placeholder="Hard Disk for Notebook"
        float
        onChange={evt => this.setState({ Hard_Disk_for_Notebook: evt.target.value })} >
    </Ons.Input>
        ชิ้น
        </td>
        </tr>

        <tr>
        <td>7</td>
        <td>Internal Card Reader</td>
        <td>
        <Ons.Input
        modifier="underbar"
        placeholder="Internal Card Reader"
        float
        onChange={evt => this.setState({ Internal_Card_Reader: evt.target.value })} >
    </Ons.Input>
        ชิ้น
        </td>
        </tr>



        <tr>
        <td>8</td>
        <td>Monitor</td>
        <td>
        <Ons.Input
        modifier="underbar"
        placeholder="Monitor"
        float
        onChange={evt => this.setState({ Monitor: evt.target.value })} >
    </Ons.Input>
        ชิ้น
        </td>
        </tr>

        <tr>
        <td>9</td>
        <td>Mouse</td>
        <td>
        <Ons.Input
        modifier="underbar"
        placeholder="Mouse"
        float
        onChange={evt => this.setState({ Mouse: evt.target.value })} >
    </Ons.Input>
        ชิ้น
        </td>
        </tr>

        <tr>
        <td>10</td>
        <td>Optical Disk Drive</td>
        <td>
        <Ons.Input
        modifier="underbar"
        placeholder="Optical Disk Drive"
        float
        onChange={evt => this.setState({ Optical_Disk_Drive: evt.target.value })} >
    </Ons.Input>
        ชิ้น
        </td>
        </tr>

        <tr>
        <td>11</td>
        <td>Power Supply</td>
        <td>
        <Ons.Input
        modifier="underbar"
        placeholder="Graphic Card"
        float
        onChange={evt => this.setState({ Power_Supply: evt.target.value })} >
    </Ons.Input>
        ชิ้น
        </td>
        </tr>

        <tr>
        <td>12</td>
        <td>RAM for PC</td>
                    <td>
                    <Ons.Input
            modifier="underbar"
        placeholder="RAM for PC"
        float
        onChange={evt => this.setState({ RAM_for_PC: evt.target.value })} >
    </Ons.Input>
        ชิ้น
        </td>
        </tr>

        <tr>
        <td>13</td>
        <td>RAM for NoteBook</td>
                    <td>
                    <Ons.Input
            modifier="underbar"
        placeholder="RAM for NoteBook"
        float
        onChange={evt => this.setState({ RAM_for_NoteBook: evt.target.value })} >
    </Ons.Input>
        ชิ้น
        </td>
        </tr>

        <tr>
        <td>14</td>
        <td>Sound Card</td>
        <td>
        <Ons.Input
        modifier="underbar"
        placeholder="Sound Card"
        float
        onChange={evt => this.setState({ Sound_Card: evt.target.value })} >
    </Ons.Input>
        ชิ้น
        </td>
        </tr>
        </tbody>
        </table>
        </center>
        </p>
		
		</center>
		</Ons.Card>
        </Ons.Card>
		</center>
        <div style={{ textAlign: 'center', paddingTop:'15px', paddingBottom:'10px', paddingLeft:'20%', paddingRight:'20%'}}>
    <Ons.Button
        onClick={this.handleClickSave(
            this.state.eid,this.state.Computer_Case,this.state.Cooling_System,this.state.CPU,this.state.Graphic_Card,this.state.Disk_for_PC,
            this.state.Hard_Disk_for_Notebook,this.state.Internal_Card_Reader,this.state.Monitor,this.state.Mouse,
            this.state.Optical_Disk_Drive,this.state.Power_Supply,this.state.RAM_for_PC,this.state.RAM_for_NoteBook,this.state.Sound_Card,
            
        )}>
        Save
        </Ons.Button>
                   <Ons.Button modifier='quiet' 
              onClick={this.showPageMenu.bind(this)}
            >
              <ons-icon size="25px"  icon="ion-home"/>  Menu 
            </Ons.Button>
        </div>
        </div>
        </Ons.Page>
    );
    }
}
{/*
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
 -----------------------------ระบบบันทึกใบชำระสินค้า PORNNUTTHA JAIPRASERT B5823093 Sprint#2-----------------------------------------------
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
*/}
 class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {repairInvoices: []};
    this.state = {
      title: props.title ? props.title : 'Custom Page',
      nextTitle: null,
      dialogShown: false,
      Username:props.Username,
      eid:props.eid,
      rplength:0,
      repairID:null,
      }
  }

  componentDidMount() {
    client({method: 'GET', path: '/api/repairInvoices'}).done(response => {
      this.setState({repairInvoices: response.entity._embedded.repairInvoices});
      this.setState({rplength: response.entity._embedded.repairInvoices.length});
    });
  }
 
  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
        <div className="center">ใบแจ้งชำระสินค้า</div>
        <div className="right" paddingRight="20px" paddingLeft="20px"><ons-icon size="30px"  icon="ion-person"/>&nbsp;&nbsp;{this.state.Username}&nbsp;&nbsp;&nbsp;</div>
      </Ons.Toolbar>
    );
  }

  push() {
    if(this.state.repairID <= this.state.rplength){
       this.props.navigator.pushPage({ component: PaymentTable, 
         props: { key: 'PaymentTable',
         repairID: this.state.repairID ,
         Username: this.state.Username ,
         eid: this.state.eid 
        } });
   }
   else{
    ons.notification.alert("incorrect");
   }
  }

  render() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
        <div style={{ textAlign: 'center' }}>
          <br/><br/>
		  <center>
		  <Ons.Card style={{width: '280px', backgroundColor: '#d9c0e5'}}>
		  <Ons.Card style={{width: '230px', backgroundColor: '#f1eff2'}}>
          <h3>รหัสการเเจ้งซ่อม</h3>
          <p>
          <Ons.Input
              value={this.state.repairID}
              onChange={evt => this.setState({repairID: evt.target.value})}
              modifier='underbar'
              float
              placeholder='รหัสการแจ้งซ่อม' />
          </p>
			</Ons.Card>
			</Ons.Card>
			 </center>
          <Ons.Button onClick={this.push.bind(this)}>
          Search
          </Ons.Button>
          <br /><br /><br /><br />
          <img src={"https://cdn3.iconfinder.com/data/icons/google-suits-1/32/13_setting_configure_repair_support_optimization_google-128.png"} style={{ width: '20%' }} />
      </div>
      </Ons.Page>
    );
  }
}


class PaymentTable extends React.Component {
  constructor(props) {
   super(props);
   this.state = {customers: []};
   this.state = {
     title: props.title ? props.title : ' ',
     repairID:this.props.repairID,
     Username:this.props.Username,
     eid:this.props.eid,
     assure:null,
     repair:null,
     amount1:0,
     amount2:0,
     amount3:0,
     amount4:0,
     amount5:0,
     cusName:'',
     cusFname:'',
     cusLname:'',
     cid:1,
   };
 }

 componentDidMount() {
  client({method: 'GET', path: '/api/customers'}).done(response => {
    this.setState({customers: response.entity._embedded.customers});
    this.setState({cusFname:this.state.customers[this.state.repairID-1].firstName});
    this.setState({cusLname:this.state.customers[this.state.repairID-1].lastName});
  });
}

 renderToolbar() {
  return (
    <Ons.Toolbar>
      <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
      <div className="center">ใบแจ้งชำระสินค้า</div>
      <div className="right" paddingRight="20px" paddingLeft="20px"><ons-icon size="30px"  icon="ion-person"/>&nbsp;&nbsp;{this.state.Username}&nbsp;&nbsp;&nbsp;</div>
    </Ons.Toolbar>
  );
}
  
  handleClickSave(amount1,amount2,amount3,amount4,amount5,repair,assure,repairID,eid){
    return function () {
      client({method: 'GET', path: '/amount1/'+amount1+'/amount2/'+amount2+'/amount3/'+amount3+'/amount4/'+amount4+'/amount5/'+amount5}).done(
        client({method: 'GET', path: '/repair/'+repair+'/assure/'+assure+'/repairInvoice/'+repairID+'/employee/'+eid}).done(
          ons.notification.alert("บันทึกสำเร็จ")
        )
      )
    }
  }
  
  handleClickPrint(){
    ons.notification.alert("PaymentPrint")
    this.props.navigator.pushPage({ component: PaymentPrint, 
      props: { key: 'PaymentPrint',
      repairID:this.state.repairID,
      Username:this.state.Username,
      eid:this.state.eid,
      cusName:this.state.cusFname + " " + this.state.cusLname,
     } });
    
  }

  render() { 
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
      
      <div style={{ textAlign: 'center', paddingTop:'10px', paddingBottom:'10px', paddingLeft:'20%', paddingRight:'20%'}}>  
        <p>รหัสการเเจ้งซ่อม : {this.state.repairID}</p>
        <p>ลูกค้า : {this.state.cusFname} {this.state.cusLname}</p>
        <center>
		<Ons.Card style={{width: '600px', backgroundColor: '#8eedde'}}>
        <table>
        <tbody>
					<tr>
            <th>NO.</th>
						<th>รายการ</th>
						<th>รายละเอียด</th>
					</tr>
					<tr>
            <td>1</td>
            <td>ค่าซ่อม</td>
				    <td>
            <Ons.Input
              modifier="underbar" 
              placeholder="ค่าซ่อม" 
              float 
              onChange={evt => this.setState({ repair: evt.target.value })} >     
            </Ons.Input>
             บาท
            </td>
			    </tr>
          <tr>
            <td>2</td>
            <td>ค่าประกัน</td>
				    <td>
              <Ons.List>
                <Ons.ListItem >
                  <Ons.Select id="choose-sel" 
                    value={this.state.assure} 
                    modifier={this.state.assure}
                    onChange={evt => this.setState({assure: event.target.value})} >                         
                    <option value="500">7 วัน : 500 บาท</option>
                    <option value="700">15 วัน : 700 บาท</option>
                    <option value="800">1 เดิอน : 800 บาท</option>
                  </Ons.Select>
                </Ons.ListItem>
              </Ons.List>
            </td>
			    </tr>
          <tr>
            <td>3</td>
            <td>อะไหล่</td>
				    <td>
            <Ons.List>
              <Ons.ListItem >
                <div className='left'>CPU (200 บาท) : </div>
                <div className='right'>
                  <Ons.Input
                    modifier="" 
                    placeholder="จำนวน CPU" 
                    float 
                    onChange={evt => this.setState({ amount1: evt.target.value })} >     
                  </Ons.Input>
                </div>
              </Ons.ListItem>    
              <Ons.ListItem >
                <div className='left'>GraphicCard (400 บาท) : </div>
                <div className='right'>
                  <Ons.Input
                    modifier="" 
                    placeholder="จำนวน GraphicCard" 
                    float 
                    onChange={evt => this.setState({ amount2: evt.target.value })} >     
                  </Ons.Input>
                </div>
              </Ons.ListItem>   
              <Ons.ListItem >
                <div className='left'>Ram (600 บาท) : </div>
                <div className='right'>
                  <Ons.Input
                    modifier="" 
                    placeholder="จำนวน Ram" 
                    float 
                    onChange={evt => this.setState({ amount3: evt.target.value })} >     
                  </Ons.Input>
                </div>
              </Ons.ListItem>   
              <Ons.ListItem >
                <div className='left'>Mainboard (800 บาท) : </div>
                <div className='right'>
                  <Ons.Input
                    modifier="" 
                    placeholder="จำนวน Mainboard" 
                    float 
                    onChange={evt => this.setState({ amount4: evt.target.value })} >     
                  </Ons.Input>
                </div>
              </Ons.ListItem>   
              <Ons.ListItem >
                <div className='left'>Harddisk (1000 บาท) : </div>
                <div className='right'>
                  <Ons.Input
                    modifier="" 
                    placeholder="จำนวน Harddisk" 
                    float 
                    onChange={evt => this.setState({ amount5: evt.target.value })} >     
                  </Ons.Input>
                </div>
              </Ons.ListItem>   
 
            </Ons.List>  
            </td>
			    </tr>
				</tbody>
			  </table>
			 </Ons.Card>
        </center>

        <div style={{ textAlign: 'center', paddingTop:'15px', paddingBottom:'10px', paddingLeft:'20%', paddingRight:'20%'}}> 
        <Ons.Button 
          onClick={this.handleClickSave(
            this.state.amount1,this.state.amount2,this.state.amount3,this.state.amount4,this.state.amount5,
            this.state.repair,this.state.assure,this.state.repairID,this.state.eid
          )}>
          Save
        </Ons.Button>

        <Ons.Button onClick={this.handleClickPrint.bind(this)}>Print</Ons.Button>
        </div>
      </div>

      </Ons.Page>
    );
  }
}

class PaymentPrint extends React.Component {
  constructor(props) {
   super(props);
   this.state = {payments: []};
   this.state = {
    plength:0,
    repairID:this.props.repairID,
    Username:this.props.Username,
    eid:this.props.eid,
    cusName:this.props.cusName,

    date:null,
    repair:null,
    assure:null,
    compart:null,
    totalPrice:null,

    empFirstName:'',
    empLastName:'',
    empTel:'',
   };
 }

 componentDidMount() {
  client({method: 'GET', path: '/api/payments'}).done(response => {
    this.setState({payments: response.entity._embedded.payments});
    this.setState({plength: response.entity._embedded.payments.length-1});
    this.setState({date:this.state.payments[this.state.plength].date});
    this.setState({repair:this.state.payments[this.state.plength].repair});
    this.setState({assure:this.state.payments[this.state.plength].assure});
    this.setState({compart:this.state.payments[this.state.plength].compart});
    this.setState({totalPrice:this.state.payments[this.state.plength].totalPrice});
  });
  client({method: 'GET', path: '/api/employees'}).done(response => {
    this.setState({employees: response.entity._embedded.employees});
    this.setState({empFirstName:this.state.employees[this.state.eid-1].firstName});
    this.setState({empLastName:this.state.employees[this.state.eid-1].lastName});
    this.setState({empTel:this.state.employees[this.state.eid-1].tel});
  });
  }

  showPageMenu() {
    this.props.navigator.resetPage({
      component: Menu,
      key: 'Menu',
      props: {
        Username: this.state.Username,
        eid:this.state.eid}
    }); 
  }


 renderToolbar() {
  return (
    <Ons.Toolbar>
      <div className='left'></div>
      <div className="center">พิมพ์ใบแจ้งชำระสินค้า</div>
      <div className='right'>
            <Ons.Button modifier='quiet' 
              onClick={this.showPageMenu.bind(this)}
            >
              <ons-icon size="25px"  icon="ion-home"/>  Menu 
            </Ons.Button>
            
            
        </div>
    </Ons.Toolbar>
  );
}

print(){
  window.print();
}


  render() { 
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
      <div style={{ textAlign: 'center', paddingTop:'10px', paddingBottom:'10px', paddingLeft:'20%', paddingRight:'20%'}}>  
      <br/><img src={"https://cdn0.iconfinder.com/data/icons/office-icons-rounded/110/Printer-128.png"} style={{ width: '15%' }} />
	  
	  <center>
	  <Ons.Card style={{width: '300px', backgroundColor: '#d18b68'}}>
	   <p><b>รหัสการเเจ้งซ่อม : </b> {this.state.repairID}</p>
        <p><b>ลูกค้า : </b> {this.state.cusName}</p>
        <p><b>วันที่ : </b> 
            {new Date(this.state.date).getDate()}/
            {new Date(this.state.date).getMonth()+1}/
            {new Date(this.state.date).getFullYear()}&nbsp;
            {new Date(this.state.date).getHours()}:
            {new Date(this.state.date).getMinutes()}
        </p>

        <p><b>พนักงานขาย : </b> {this.state.empFirstName} {this.state.empLastName}</p>
        <p><b>โทร : </b> {this.state.empTel}</p>
		</Ons.Card>
		</center>
		
        <center>
		<Ons.Card style={{width: '300px', backgroundColor: '#ba4fef'}}>
        <table>
        <tbody>
					<tr>
            <th>NO.</th>
						<th>รายการ</th>
						<th>รายละเอียด</th>
					</tr>
					<tr>
            <td>1</td>
            <td>ค่าซ่อม</td>
				    <td>
              {this.state.repair} บาท
            </td>
			    </tr>
          <tr>
            <td>2</td>
            <td>ค่าประกัน</td>
				    <td>
              {this.state.assure} บาท
            </td>
			    </tr>
          <tr>
            <td>3</td>
            <td>อะไหล่</td>
				    <td>
              {this.state.compart} บาท
            </td>
			    </tr>
          <tr style={{backgroundColor: ''}}>
            <td></td>
            <td><b>ราคาสุทธิ</b></td>
				    <td>
            <b>{this.state.totalPrice} บาท</b>
            </td>
			    </tr>          
				</tbody>
			  </table>
			</Ons.Card>
        </center>
        <div style={{ textAlign: 'center', paddingTop:'15px', paddingBottom:'10px', paddingLeft:'20%', paddingRight:'20%'}}> 
        <Ons.Button onClick={this.print.bind(this)}>
             <ons-icon size="30px" icon="ion-printer"></ons-icon> 
             &nbsp;&nbsp;&nbsp;
             PRINT</Ons.Button>
        </div>
      </div>

      </Ons.Page>
    );
  }
}

{/*
##################################################################################################
##################################################################################################
##################################################################################################
*/}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };





    this.loadPage = this.loadPage.bind(this);
  }
  
  hide() {
    this.setState({ isOpen: false });
  }

  show() {
    this.setState({ isOpen: true });
  }

  loadPage(page) {
    this.hide();
    this.navigator.resetPage({ component: page, props: { key: page } }, { animation: 'fade' });
  }
  
  renderPage(route, navigator) {
    route.props = route.props || {};
    route.props.navigator = navigator;
    route.props.showMenu = this.show.bind(this);

    return React.createElement(route.component, route.props);
  }

  render() {
    return (

      <Ons.Navigator initialRoute={{ component: Main, props: { key: 'main' } }} renderPage={this.renderPage.bind(this)} ref={(navigator) => { this.navigator = navigator; }} />
      
    
      );
  }
}
  
  ons.ready(function() {
    ReactDOM.render(<App />, document.getElementById('app'));
  });

ReactDOM.render(<App />, document.getElementById('react'));

{/*
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
 -------------------ระบบอัพเดตสถานะการแจ้งซ่อม Natcha Boonchoei B5807109-----------------------------------------
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
*/}

class PrintRepairResults extends React.Component{

   	constructor(props) {
      	super(props);
        this.state = { statuses:[] ,
		eid : props.eid,repairID: props.repairID,
		cusFname: props.cusFname,
		cusLname: props.cusLname,
		empFname: props.empFname,
		empLname: props.empLname};
	}
	
	componentDidMount() {
		client({method: 'GET', path: '/api/statuses'}).done(response => {
			this.setState({statuses: response.entity._embedded.statuses});
		});
	}
	 showPageMenu() {
    this.props.navigator.resetPage({
      component: Menu,
      key: 'Menu',
      props: {
        Username: this.state.Username,
        eid:this.state.eid}
    }); 
  }
	popPage() {
		this.props.navigator.popPage();
	}

	print(){
		window.print();
	}


   	renderToolbar() {
		return (
		<Ons.Toolbar>
			<div className='center'>อัพเดทสถานะการซ่อมคอมพิวเตอร์</div>
			<div className='right'>
            <Ons.Button modifier='quiet' 
              onClick={this.showPageMenu.bind(this)}
            >
              <ons-icon size="25px"  icon="ion-home"/>  Menu 
            </Ons.Button>
            
        </div>
		</Ons.Toolbar>
		);
	}

	renderRow(row, index) {
		return(
		  	<Ons.ListItem tappable

			  	key={row._links.self.href}
			  	data={row}>

			  	<div className="center">
					<h3>
				  	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				  	{row.inform}
				  	<br/>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				  	{new Date(row.datetime).getDate()}/
                    {new Date(row.datetime).getMonth()+1}/
                    {new Date(row.datetime).getFullYear()}&nbsp;
                	{new Date(row.datetime).getHours()}:
                    {new Date(row.datetime).getMinutes()}
					</h3>
			  	</div>

		  </Ons.ListItem>
		)
	}

   	render() {
      	return (
         	<Ons.Page renderToolbar={this.renderToolbar.bind(this)}>

				<div style={{ textAlign: 'center' }}>
					<h3>สถานะของการซ่อมคอมพิวเตอร์</h3>
					<p>รหัสการเเจ้งซ่อม : {this.state.repairID}
					&nbsp;&nbsp;&nbsp;&nbsp; 
					ลูกค้า : {this.state.cusFname} {this.state.cusLname}
					&nbsp;&nbsp;&nbsp;&nbsp; 
					พนักงาน : {this.state.empFname} {this.state.empLname}</p>
					<br/><br/>
					<Ons.List
						dataSource={this.state.statuses}
						renderRow={this.renderRow} />
						
						<br/>
						<Ons.Button onClick={this.popPage.bind(this)}>
							เพิ่มข้อมูล
						</Ons.Button>

						&nbsp;&nbsp;&nbsp;&nbsp;
						<Ons.Button onClick={this.print.bind(this)}>
							<ons-icon size="30px" icon="ion-printer"></ons-icon> 
								&nbsp;&nbsp;&nbsp;
								PRINT
						</Ons.Button>
					<br/><br/>
					<section style={{textAlign: 'center'}}>
					  	<img src={"https://image.flaticon.com/icons/svg/603/603809.svg"} alt="Onsen UI" style={{ width: '10%' }} />
				   	</section>
						
						
				</div>

         	</Ons.Page>
      	);
   	}

} // end class


class UpdateSt extends React.Component {
	constructor(props) {
	   	super(props);
		this.handleClickSave = this.handleClickSave.bind(this);
	   	this.state = {statuses: []};
	   	this.state = {
		 	eid:props.eid,
	   		newstatus: "รับแจ้งซ่อม",
			   date: new Date(),
		repairID: props.repairID,
		assure:null,
		repair:null,
		cusFname:'',
		cusLname:'',
		empFname:'',
		empLname:'',
	   	}
	}
	 componentDidMount() {
	client({method: 'GET', path: '/api/customers'}).done(response => {
    this.setState({customers: response.entity._embedded.customers});
    this.setState({cusFname:this.state.customers[this.state.repairID-1].firstName});
    this.setState({cusLname:this.state.customers[this.state.repairID-1].lastName});
	});
	client({method: 'GET', path: '/api/employees'}).done(response => {
    this.setState({employees: response.entity._embedded.employees});
    this.setState({empFname:this.state.employees[this.state.eid-1].firstName});
    this.setState({empLname:this.state.employees[this.state.eid-1].lastName});
	});
}
	
	handleClickSave(eid, newstatus,repairID) {
		return function() {
			client({method: 'GET', path: '/eid/'+eid+'/statuses/'+newstatus+'/repairID/'+repairID}).done(
				ons.notification.alert('success!')
			)
		}
	}

	pushPage() {
		this.props.navigator.pushPage({ component: PrintRepairResults, props: { key: 'PrintRepairResults' 
		,eid:this.state.eid,repairID: this.state.repairID,
		cusFname: this.state.cusFname,
		cusLname: this.state.cusLname,
		empFname: this.state.empFname,
		empLname: this.state.empLname} });
	}
	
	renderToolbar() {
	 	return (
			<Ons.Toolbar>
			 	<div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
			 	<div className='center'>อัพเดทสถานะการซ่อมคอมพิวเตอร์</div>
			 	<div className="right" paddingRight="20px" paddingLeft="20px"><ons-icon size="30px"  icon="ion-person"/>&nbsp;&nbsp;{this.state.Username}&nbsp;&nbsp;&nbsp;</div>
		 	</Ons.Toolbar>
		);
	}
 
	render() {
		return (
			<Ons.Page renderToolbar={this.renderToolbar.bind(this)}>

				<div style={{ textAlign: 'center' }}> 
 					<h3>เพิ่มสถานะของการซ่อมคอมพิวเตอร์</h3>
					<p>รหัสการเเจ้งซ่อม : {this.state.repairID}
					&nbsp;&nbsp;&nbsp;&nbsp; 
					ลูกค้า : {this.state.cusFname} {this.state.cusLname}
					&nbsp;&nbsp;&nbsp;&nbsp; 
					พนักงาน : {this.state.empFname} {this.state.empLname}</p>
					<br/><br/>
					<Ons.Card> 
						<div className="content">
 							{this.props.fname}&nbsp;&nbsp;{this.props.lname}		
							<Ons.List >
								<br/>
								<h3>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								Date : &nbsp;&nbsp;&nbsp;{datetime} 		 
					
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

								Status : &nbsp;&nbsp;&nbsp;
								<Ons.Select id = "choose-status" 
									value = {this.state.newstatus}
									onChange = {evt => this.setState({newstatus: event.target.value })} >  
										<option  value = "รับแจ้งซ่อม">รับแจ้งซ่อม</option>
										<option  value = "อยู่ระหว่างการซ่อม">อยู่ระหว่างการซ่อม</option>
										<option  value = "กำลังรออะไหล่">กำลังรออะไหล่</option>
										<option  value = "ดำเนินการซ่อมเสร็จสมบูรณ์">ดำเนินการซ่อมเสร็จสมบูรณ์</option>
										<option  value = "ส่งคืนลูกค้าแล้ว">ส่งคืนลูกค้าแล้ว</option>
								</Ons.Select> 
								</h3>
								<br/>
							</Ons.List > 

				   		</div>
			 		</Ons.Card>
 
				 	<br/>
				   	<div style={{ textAlign: 'center'}}> 
					 	<Ons.Button onClick={this.handleClickSave(this.state.eid, this.state.newstatus,this.state.repairID)}>
						 	บันทึกข้อมูล
					 	</Ons.Button> 
						
						<br/><br/><br/>
					 	<Ons.Button onClick= {this.pushPage.bind(this)}>
						 	สถานะของการซ่อมคอมพิวเตอร์
					   	</Ons.Button>
				   </div>

				   <br/><br/>
					<section style={{textAlign: 'center'}}>
					  	<img src={"https://image.flaticon.com/icons/svg/253/253983.svg"} alt="Onsen UI" style={{ width: '10%' }} />
				   	</section>				  
 
				</div> 
		  </Ons.Page> 

	   	);
	}
	 
 } // end class 


class MakeRepairUpdate extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {customers: []};	
		this.state = {
			title: props.title ? props.title : 'Custom Page',
			nextTitle: null,
			customerslength: null,
			Username: props.Username,
			eid: props.eid,
			 rplength:0,
			repairID:'',
		}
	}
	push() {
    if(this.state.repairID <= this.state.rplength){
       this.props.navigator.pushPage({ component: UpdateSt, 
         props: { key: 'UpdateSt',
         repairID: this.state.repairID ,
         Username: this.state.Username ,
         eid: this.state.eid 
        } });
   }
   else{
    ons.notification.alert("incorrect");
   }
  }
	componentDidMount() {
		client({method: 'GET', path: '/api/repairInvoices'}).done(response => {
      this.setState({repairInvoices: response.entity._embedded.repairInvoices});
      this.setState({rplength: response.entity._embedded.repairInvoices.length});
    });
	}
	

   
   	renderToolbar() {
		return (
		  	<Ons.Toolbar>
			 	<div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
			 	<div className='center'>อัพเดทสถานะการซ่อม</div>
			 	<div className="right" paddingRight="20px" paddingLeft="20px"><ons-icon size="30px"  icon="ion-person"/>&nbsp;&nbsp;{this.state.Username}&nbsp;&nbsp;&nbsp;</div>
		  	</Ons.Toolbar>
		);
	}
	
	render() {
		return (
			<Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
			<div style={{ textAlign: 'center' }}>

			<h1>รหัสการเเจ้งซ่อม</h1>
			<p>
			<br/><br/>
          <Ons.Input
              value={this.state.repairID}
              onChange={evt => this.setState({repairID: evt.target.value})}
              modifier='underbar'
              float
              placeholder='รหัสการแจ้งซ่อม' />
			</p>

          <Ons.Button onClick={this.push.bind(this)}>
          Search
          </Ons.Button>
          <br/><br/><br/><br/><br/>
          <section style={{textAlign: 'center'}}>
					  	<img src={"https://image.flaticon.com/icons/svg/201/201565.svg"} alt="Onsen UI" style={{ width: '20%' }} />
		</section>	
      </div>
      </Ons.Page>
		);
	}

}	




{/*
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  ---------------------------------Sprint 2------------------------------------------
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
*/}
/*
class ManageEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {employees: []};
    this.state = {users: []};
    this.state = {
      title: props.title ? props.title : 'Custom Page',
      nextTitle: null,
      dialogShown: false,
    };

  }
  componentDidMount() {
    client({method: 'GET', path: '/api/users'}).done(response => {
      this.setState({users: response.entity._embedded.users});
    });
    client({method: 'GET', path: '/api/employees'}).done(response => {
        this.setState({employees: response.entity._embedded.employees});
    });
  }

  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
        <div className='center'>จัดการข้อมูลพนักงาน</div>
        <div className="right" paddingRight="20px" paddingLeft="20px">
        <ons-icon size="30px" icon="ion-person"/>&nbsp;&nbsp;MANAGER&nbsp;&nbsp;&nbsp;</div>
      </Ons.Toolbar>
    );
  }
	showPageMenu() {
      this.props.navigator.resetPage({
        component: Menu,
        key: 'Menu',
        props: {
          Username: this.state.Username,
          eid:this.props.eid}
      }); 
    }
  showDialog() {
    this.setState({dialogShown: true});
    
  }

  hideDialog() {
    this.setState({dialogShown: false});
    client({method: 'GET', path: '/api/users'}).done(response => {
      this.setState({users: response.entity._embedded.users});
    });
    client({method: 'GET', path: '/api/employees'}).done(response => {
        this.setState({employees: response.entity._embedded.employees});
    });
    this.props.navigator.resetPage({
      component: ManageEmployee,
      key: 'ManageEmployee',
    },{ animation: 'fade' }); 

  }

  pushPageAddEmp() {
    this.props.navigator.pushPage({ component: AddEmp, props: { key: 'AddEmp' } });
  }
  
  pushPagePrintEmployee() {
    this.props.navigator.pushPage({ component: PrintEmployee, props: { key: 'PrintEmployee' } });
  }

  resetPage(){
    this.props.navigator.resetPage({component : ManageEmployee, key : ManageEmployee})
  }
	popPage(){
			this.props.navigator.popPage();
	}
 
  
  handleClickSelectedEmp(user,index) {
    client({method: 'DELETE', path: user._links.self.href   }).done(response =>{  
      ons.notification.alert('เลือก ' + user.username );
    }); 
  };
     

  renderRow(row, index) {
    return(
      <Ons.ListItem 
          key={row._links.self.href}
          //data={row}
          data={row}
          //onClick={this.handleClickSelectedEmp.bind(this, row, index)}
          >
          <div className='left' style={{width: '100px'}}>
              {index+1}
          </div>
          <div className="center">
              {row.username}
          </div>
          <div className='right'>
            <Ons.Icon icon='md-delete' size="30px"/>
            &nbsp;&nbsp;&nbsp;
            <Ons.Checkbox
            inputId={`checkbox-${row}`}
            onClick={this.handleClickSelectedEmp.bind(this, row, index)}
            />
          </div>
      </Ons.ListItem>
    )
  }
  
  render() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar}>
    <p style={{textAlign: 'right', paddingTop:'10px', paddingRight:'20px'}}>  
	<Ons.Button modifier='quiet' 
                onClick={this.showPageMenu.bind(this)}>
                <ons-icon size="25px"  icon="ion-home"/>  Menu 
              </Ons.Button>
			  &nbsp;&nbsp;&nbsp;
	    <Ons.Button 
        modifier='outline'
	      onClick={this.pushPageAddEmp.bind(this)}> 
        <Ons.Icon icon='md-account-add' /> เพิ่มพนักงาน
      </Ons.Button>
      &nbsp;&nbsp;&nbsp;
      <Ons.Button 
        modifier='outline'
	      onClick={this.pushPagePrintEmployee.bind(this)}> 
        <Ons.Icon icon='ion-printer' />&nbsp;
       "พิมพ์"ประวัติทั้งหมด
      </Ons.Button>
      &nbsp;&nbsp;&nbsp;
      <Ons.Button 
        style={{backgroundColor: 'red'}}
        onClick={this.showDialog.bind(this)}>
        <Ons.Icon icon='md-delete' size="30px"/>
        &nbsp;&nbsp;
        ลบพนักงาน
      </Ons.Button>
    
    </p>
    
    <section style={{textAlign: 'center'}}>
      <Ons.List>
        <Ons.ListItem style={{backgroundColor: '#c6c6c6'}}>
          <div className='left' style={{width: '100px'}}>
            <b>ลำดับที่</b>
          </div>
          <div className="center" >
          <b>รหัส พนักงาน</b>
          </div>
          <div className='right'>
          <b>ลบ</b>
          </div>
        </Ons.ListItem>
     </Ons.List>
     <Ons.List
        //dataSource={this.state.employees}
        dataSource={this.state.users}
        renderRow={this.renderRow}
        handleClickSelectedEmp={this.handleClickSelectedEmp} 
      />       
		</section>
    

    <Ons.Dialog
      isOpen={this.state.dialogShown}
    >
            <div style={{textAlign: 'center', margin: '20px'}}>
              <p style={{opacity: 0.5}}>ต้องการ"ลบ"พนักงาน</p>
              <p>
                <Ons.Button
                onClick={this.hideDialog.bind(this)}
                >
                  ตกลง
                </Ons.Button>
              </p>
            </div>
          </Ons.Dialog>
        
      </Ons.Page>
    );
  }
}
class AddEmp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {employees: []};
    this.state = {users: []};
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      username:null,
      password:null,
      firstName:null,
      lastName:null,
      tel:null,
      position:null,
      address:null,
      age:null,
      sex:null,
      id_card_NO:null,
    }
  }

    renderToolbar() {
      return (
        <Ons.Toolbar>
        <div className='left'></div>
        <div className='center'>จัดการข้อมูลพนักงาน</div>
        <div className="right" paddingRight="20px" paddingLeft="20px">
        <ons-icon size="30px" icon="ion-person"/>&nbsp;&nbsp;MANAGER&nbsp;&nbsp;&nbsp;</div>
        </Ons.Toolbar>
      );
    }


    handlePushManager(){
      client({method: 'GET', path: '/api/users'}).done(response => {
        this.setState({users: response.entity._embedded.users});
      });
      client({method: 'GET', path: '/api/employees'}).done(response => {
          this.setState({employees: response.entity._embedded.employees});
      });
      this.props.navigator.resetPage({
        component: ManageEmployee,
        key: 'ManageEmployee',
      },{ animation: 'fade' }); 
      
    }
  
    handleClick(firstName,lastName,tel,position,address,age,sex,id_card_NO,username,password) {
      return function () { 
        client({method: 'GET', path:'/firstName/'+firstName+'/lastName/'+lastName+'/tel/'+tel+'/position/'+position+'/address/'+address+'/age/'+age+'/sex/'+sex+'/id_card_NO/'+id_card_NO+'/username/'+username+'/password/'+password}).then(response => {
          ons.notification.alert('บันทึก');
        });
      }
 
  }
  
	render() {
      return (
        <Ons.Page renderToolbar={this.renderToolbar}>
          <section style={{textAlign: 'center'}}>
         
          <Ons.List>
            <Ons.ListHeader>**กรุณากรอกข้อมูลด้วยความจริงทุกประการ**</Ons.ListHeader>
          </Ons.List>
            <center>
			       <Ons.Card style={{ width: '30%' }} >
		        	<p>
		        	<center>
              <Ons.Input modifier="underbar" 
                placeholder="Username" 
                float 
                onChange={evt => this.setState({ username: evt.target.value })} >
					
              </Ons.Input>
              </center>
            </p>
                <p> 
            <center>
              <Ons.Input modifier="underbar" 
              type='password'
                placeholder="Password" 
                float 
                onChange={evt => this.setState({ password: evt.target.value })} >     
              </Ons.Input>
              </center>
            </p>
		      	</Ons.Card>
             </center>
			
            <Ons.List>
              <Ons.ListHeader>แนะนำ:ควรตั้ง Password ที่ผสมระหว่างตัวอักษร และตัวเลข</Ons.ListHeader>
            </Ons.List>
               <center>
			       <Ons.Card style={{ width: '30%' }} >
		        	<p>
		        	<center>
                        
              <Ons.Input modifier="underbar" 
                placeholder="ชื่อ" 
                float 
                onChange={evt => this.setState({ firstName: evt.target.value })} >     
              </Ons.Input>
               </center>
            </p><p> <center> 
                      
            <Ons.Input modifier="underbar" 
              placeholder="นามสกุล" 
              float 
              onChange={evt => this.setState({ lastName: evt.target.value })} >     
            </Ons.Input>
             </center>
            </p><p>  <center>

           
         <Ons.Input modifier="underbar" 
          placeholder="อายุ" 
          float 
          onChange={evt => this.setState({  age: evt.target.value })} >     
        </Ons.Input>
         </center>
            </p><center>
             <table><tr><td><b>เพศ : </b></td><td>		 
               <div style={{margin: 5}}>
            <Ons.Select id="choose-sel" 
              value={this.state.sex} 
              modifier={this.state.sex} 
              onChange={evt => this.setState({sex: event.target.value})} > 
              <option >โปรดเลือก..</option>
              <option value="Male">ชาย</option>
              <option value="Female">หญิง</option>
            </Ons.Select>
          </div>
            </td></tr></table>
            </center>
            <p>  <center>
                
          <Ons.Input modifier="underbar" 
          placeholder="เลขบัตรประจำตัวประชาชน" 
          float 
          onChange={evt => this.setState({ id_card_NO: evt.target.value })} >     
        </Ons.Input>
             </center></p>
            <p>  <center>
                
        <Ons.Input modifier="underbar" 
        placeholder="เบอร์โทร" 
        float 
        onChange={evt => this.setState({ tel: evt.target.value })} >     
        </Ons.Input>
         </center></p>
        <p>  <center>
        
        <Ons.Input modifier="underbar" 
              placeholder="ที่อยุ่" 
              float 
              onChange={evt => this.setState({ address: evt.target.value })} >     
            </Ons.Input>
            </center>   
            </p>
            <center>
             <table><tr><td><b>ตำหน่ง : </b></td><td>
            
           <Ons.Select id="choose-sel"
            value={this.state.position} 
            modifier={this.state.position} 
            onChange={evt => this.setState({position: event.target.value})} > 
            <option >โปรดเลือก..</option>
              <option value="manager">ผู้จัดการ</option>
              <option value="sales">พนักงานขาย</option>
              <option value="repair">พนักงานซ่อม</option>
            </Ons.Select>
            </td></tr></table>
             </center>           
		      	</Ons.Card>
             </center>
                                 
            <p>
              
            <Ons.Button onClick={this.handleClick(
                this.state.firstName,this.state.lastName,this.state.tel,
                this.state.position,this.state.address,this.state.age,this.state.sex,this.state.id_card_NO,
                this.state.username,this.state.password
                )}>
                <Ons.Icon icon='md-account-add' /> บันทึกพนักงาน</Ons.Button>    
                &nbsp;&nbsp;&nbsp;
                <Ons.Button onClick={this.handlePushManager.bind(this)}>กลับสู่หน้า รายชื่อ</Ons.Button>

           </p>
         
          </section>     
          <Ons.List>
            <Ons.ListHeader>หมายเหตุ:กรุณากรอกข้อมูลให้ครบถ้วน</Ons.ListHeader>
          </Ons.List>
          
        </Ons.Page>        
      );
    }
}

class PrintEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {employees: []};
    

  }
  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
        <div className='center'>จัดการข้อมูลพนักงาน</div>
        <div className="right" paddingRight="20px" paddingLeft="20px">
        <ons-icon size="30px" icon="ion-person"/>&nbsp;&nbsp;MANAGER&nbsp;&nbsp;&nbsp;</div>
      </Ons.Toolbar>
    );
  }
  componentDidMount() {
    client({method: 'GET', path: '/api/employees'}).done(response => {
        this.setState({employees: response.entity._embedded.employees});
    });
  }
  showMenu() {
    this.props.showMenu();
  }

  resetPage(){
    this.props.navigator.resetPage({component : ManageEmployee, key : ManageEmployee})
  }

  print() {
    window.print();
  }

  renderRow(row, index) {
    return(
      <center>
      <Ons.ListItem style={{textAlign:'center'}}
          key={row._links.self.href}
          data={row}
         
          >
          <center>
            <center>
              <td  style={{width:'40px'}}>
              {index+1}         
              </td><td style={{width:'100px'}}>
              {row.firstName}
              </td><td style={{width:'150px'}}>
              {row.lastName}
              </td><td style={{width:'100px'}}>
              {row.tel}
              </td><td style={{width:'70px'}}>
              {row.position}
              </td><td style={{width:'70px'}}>
              {row.address}
              </td><td style={{width:'40px'}}>
              {row.age}
              </td><td style={{width:'70px'}}>
              {row.sex}
              </td><td style={{width:'120px'}}>
              {row.id_card_NO}
              </td> 
            </center>
          
          </center>
      </Ons.ListItem>
      </center>


    )
  }
  render() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
         &nbsp;
         <center>
         <Ons.Card style={{width:'97%'}}>
         
              <td style={{width:'40px'}}>
              ลำดับที่
              </td><td style={{width:'100px'}}>
              ชื่อ
              </td><td style={{width:'150px'}}>
           นามสกุล
              </td><td style={{width:'100px'}}>
             เบอร์โทร
              </td><td style={{width:'70px'}}>
              ตำแหน่ง
              </td><td style={{width:'70px'}}>
             ที่อยู่
              </td><td style={{width:'40px'}}>
              อายุ
              </td><td style={{width:'70px'}}>
             เพศ
              </td><td style={{width:'120px'}}>
              เลขบัตรประจำตัวประชาชน
              </td>
              
        </Ons.Card>                
        </center>
        <center>
        <Ons.Card>
        <Ons.List style={{textAlign:'center'}}
        dataSource={this.state.employees}
        renderRow={this.renderRow}       
        />
        </Ons.Card>
        </center>
        &nbsp;&nbsp;&nbsp;   

        <div style={{ textAlign: 'center', paddingTop:'15px', paddingBottom:'10px', paddingLeft:'20%', paddingRight:'20%'}}> 
          <Ons.Button 
	          onClick={this.print.bind(this)}> 
            <Ons.Icon icon='ion-printer' />&nbsp;
            "พิมพ์"ประวัติทั้งหมด
          </Ons.Button>    
        </div>
      </Ons.Page>
      
    );
  }
}
*/