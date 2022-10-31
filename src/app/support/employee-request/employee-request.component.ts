import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, Route } from '@angular/router';
import { UsersService } from '../../users.service';

import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-employee-request',
  templateUrl: './employee-request.component.html',
  styleUrls: ['./employee-request.component.css']
})
export class EmployeeRequestComponent implements OnInit {
  profileData: any = []
  // createdDate:any
  // RequestedDate:any



  constructor(private UsersService: UsersService, private Router: Router, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
   
    this.getListOfSubmittedProfilesData();
  }
  getListOfSubmittedProfilesData() {
    this.spinner.show()
    this.UsersService.getListOfSubmittedProfiles().subscribe((profileData) => {
   
       console.log(" list data",profileData)
   
      if (profileData.code == "S001") {
        this.spinner.hide()
        this.profileData = profileData.data
   
        // // this.createdDate=new Date((profileData.data[0].CreatedDate)*1000)
        // this.RequestedDate=new Date((profileData.data[0].RequestedDate)*1000)
        // console.log(profileData.data[0])
      }
     else {
      //  console.log("--")
        this.spinner.hide();
        alert(profileData.data)
       
      }
    },  (error) => {
      this.spinner.hide()
      alert(error.error.data)
      
    }
    )
  }
  requestDetails(RequestID: any, CustRecID: any) {

     const allRequestDetails = this.Router.serializeUrl(this.Router.createUrlTree(['Dashboard/support/allRequestDetails'], { queryParams: { "RequestID": RequestID, "CustRecID": CustRecID, } }))

     window.open(allRequestDetails,'_blank')
  }

}
