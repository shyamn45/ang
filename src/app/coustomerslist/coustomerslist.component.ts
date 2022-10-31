import { Component, OnInit } from '@angular/core';
import { UsersService } from'../users.service';
import {ActivatedRoute, Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-coustomerslist',
  templateUrl: './coustomerslist.component.html',
  styleUrls: ['./coustomerslist.component.css']
})
export class CoustomerslistComponent implements OnInit {
  count:any;
  CustomerID:any
  list:any;
  asereScreen:any
  CustRecID:any
  inputFieldsdata:any
  step:number=1;
  token: any;

  constructor(private userservice:UsersService,private route:Router,private snap:ActivatedRoute, private spinner:NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.token = localStorage.getItem('x-fiftyaccess-token')
    this.userservice.customerlist().subscribe((userlist) =>{      
      if(userlist.code == "S001"){
        this.list=userlist.data;
        this.spinner.hide();

      }else{
        this.spinner.hide();
        alert(userlist.message)
       

      }
    },(error)=>{
      this.spinner.hide();
      alert(error.error.data)
    })

  }
 
   configpage(data:any){
     
    console.log(data)
    this.route.navigate(["/configform"],{ queryParams: {CustRecID :data.CustRecID,step:1} })

   }

   detailspage(data:any){

    console.log(data),
    this.route.navigate(["/customerdetails"],{ queryParams: {CustRecID :data.CustRecID} })

   }

   aserseScreen(data:any){
     
    this.route.navigate(["/Aserse"],{queryParams: {CustRecID :data.CustRecID}})
   }


   ConfigurationForm(data:any){


        

    // console.log(data),
    this.route.navigate(["/updateConfigurationForm"],{ queryParams: {step:this.step,CustRecID :data.CustRecID} })
   }
}
