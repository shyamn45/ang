import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from 'src/app/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dementia-schedule-model',
  templateUrl: './dementia-schedule-model.component.html',
  styleUrls: ['./dementia-schedule-model.component.css']
})
export class DementiaScheduleModelComponent implements OnInit {

  constructor(private userService:UsersService, private route: Router,private spinner:NgxSpinnerService) { }
  AllScheduleDetails:any=[]
  updateCustID:any;
  updateCustRecID:any;
  ngOnInit(): void {
    this.userService.viewDementiaSchedules().subscribe((Response)=>{
      this.spinner.show()
      if(Response.data.length<1){
        this.AllScheduleDetails=[]
        this.spinner.hide();
      }
      if(Response.code=="S001"){
        this.AllScheduleDetails=Response.data
        this.spinner.hide();
      }
      
      else{
        alert(Response.message);
        this.spinner.hide();
      }
      this.spinner.hide();

    },(error)=>{
      alert(error.error.data)
    })
  }

  onAllCustomersClick(){
    this.route.navigate(['/Dashboard/dementia/dementiaAllCustomers'])
  }
  onUpadteClick(customerDetails:any){
    this.spinner.show();
    this.updateCustID=customerDetails.CustID;
    this.updateCustRecID=customerDetails.CustRecID;
    this.spinner.hide();
  }
  onCountUpdate(count:any){
    this.spinner.show();
    if(count==undefined||count==null||count==""){
      alert("Please Enter Count")
      return;
    }
    let paramsForUpdateCount={
      Count:count,
      CustRecID:this.updateCustRecID,
      CustID:this.updateCustID,
    };
    this.userService.updateDementiaVisitCount(paramsForUpdateCount).subscribe((updateVisitsResponse)=>{
      if(updateVisitsResponse.code=="S001"){
        alert(updateVisitsResponse.data);
        window.location.reload();
        this.spinner.hide();
      }
      if(updateVisitsResponse.code=="S002"){
        alert(updateVisitsResponse.data);
        this.spinner.hide();
      }
    },(error)=>{
      alert(error.error.data)
    })
    this.spinner.hide();

  }
  onInitialAssessmentClick(customerDetails:any){
    this.spinner.show();
    let CustID=customerDetails.CustID;
    let CustRecID=customerDetails.CustRecID;
    this.route.navigate(['/Dashboard/dementia/assesmentform'],{queryParams:{Type:"Demographics",CustID:CustID,CustRecID:CustRecID}});
    this.spinner.hide();

  }
}
