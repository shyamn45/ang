import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import {ActivatedRoute,Router, Route } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-emergency-list',
  templateUrl: './emergency-list.component.html',
  styleUrls: ['./emergency-list.component.css']
})
export class EmergencyListComponent implements OnInit {
  List:any;
  
  // yes
  btn:any
  act:any
  
  data:any
  click : boolean = false;
  confirmData:any={}
  RequestID:any
  constructor(private userservice: UsersService,private router:Router,private route: ActivatedRoute) {}

  ngOnInit(): void {
    
  
    this.userservice.emergencyList().subscribe(emergencyList => {

        this.List = emergencyList.data
        console.log("EntireData",this.List)

    })
  }


  customerDetails(data:any){
    this.RequestID = this.route.snapshot.queryParamMap.get("RequestID")
    
    console.log(this.RequestID)
    this.router.navigate(["/emergencyCustomerData"],{ queryParams: {RequestID :data.RequestID,}})
  }
  acceptEmergency(data:any,value:any){

    if(value=="confirm"){
      
     if( this.confirmData.ApprovalStatus=true){
     
     }
     
    }else{
      this.confirmData.ApprovalStatus=false;
    }
    this.confirmData.RequestID=data.RequestID
    console.log("params",this.confirmData)
   
    // alert("data",data)
  if(confirm("are you sure want to update")){
    this.userservice.emegencyAccept(this.confirmData).subscribe(emergencyList => {

      console.log(emergencyList)

      if (emergencyList.ApprovalStatus == true) {
        emergencyList.ApprovalStatus = false
    }

    else {
      emergencyList.ApprovalStatus == true

    }


      if(emergencyList.code=='S001'){
        alert("Request updated successfully")
        // window.location.reload();
        this.router.navigate(["/emergencyCustomerData"])
      
       
      }
      if(emergencyList.code=='ND01'){
        alert("Request details not found")
        // window.location.reload();
      }
     
  })
}

  }



 

}
