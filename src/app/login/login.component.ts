import { Component, OnInit } from '@angular/core';
import { Token } from '@angular/compiler';
import { Router, Routes } from '@angular/router';
import { UsersService } from '../users.service'
import { EmergencyListComponent } from '../emergency-list/emergency-list.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  token: any
  FranchiseID: any
  constructor(private userservice: UsersService, private route: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
   
  this.token=localStorage.getItem('x-fiftyaccess-token')

  if(this.token ==null ){
    // this.route.navigate(["/logout"]);
   }else{
     this.route.navigate(["/Dashboard/Customerslist"]);
   }
    

  }

  loginresponse: any;

  formSubmit(loginobj: any) {

    loginobj.Type = "employee";
    this.spinner.show();
    this.userservice.userlogin(loginobj).subscribe(loginresponse => {
      this.spinner.hide();
      this.loginresponse = loginresponse;
      if (this.loginresponse.code == "S001") {

        localStorage.setItem('x-fiftyaccess-token', loginresponse.data['x-fiftyaccess-token'])
        this.token = localStorage.getItem('x-fiftyaccess-token')
        localStorage.setItem('FranchiseID', loginresponse.data.UserData.Data['FranchiseID'])
        localStorage.setItem("LoginEmployeeIDNew",loginresponse.data.UserData.Data['EmployeeID'])
        this.FranchiseID = localStorage.getItem('FranchiseID')
        this.route.navigate(["/Dashboard/Customerslist"]);


      } else {
        alert(this.loginresponse.data)
      }


    },
      (error) => {
        this.spinner.hide();
        alert(error.error.data)
      }
    )
  }



}
