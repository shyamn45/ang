import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { UsersService } from '../../users.service'
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, Form } from '@angular/forms';
import { ignoreElements } from 'rxjs';
import { ReturnStatement } from '@angular/compiler';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

import { typeOf } from 'mathjs';


// declare var moment: any;
@Component({
  selector: 'app-all-request-screen',
  templateUrl: './all-request-screen.component.html',
  styleUrls: ['./all-request-screen.component.css']
})
export class AllRequestScreenComponent implements OnInit {


  // date = moment();
  moment: any
  reqID: any;
  CustRecID: any
  vendorData: any
  ProfileID: any = []
  doc: any
  profileView: any
  serviceType: any
  requestDetailsData: any
  vendorName: any
  vendorID: any
  PriceFor: any
  vendorStatusbtn: any = false
  public vendorUpdate!: FormGroup;
  vendorIDData: any
  vendorStatus: any = 'No'
  minDate = new Date();
  resultStartDate: any
  resultEndDate: any
  dt1: any;
  dt2: any;
  diffInDays: any
  jobStart: any = 'No'


  constructor(private Router: Router, private route: ActivatedRoute, private UsersService: UsersService, private FormBuilder: FormBuilder, private datePipe: DatePipe, private spinner: NgxSpinnerService) { }
  ngOnInit(): void {
    this.vendorUpdate = this.FormBuilder.group({
      Status: [''],
      StatusRemarks: [''],
      StartDate: [''],
      Price: [''],
      PriceFor: [''],
      EndDate: [''],
      ActualDaysServed: ['']
    })
    this.reqID = this.route.snapshot.queryParamMap.get("RequestID")
    this.CustRecID = this.route.snapshot.queryParamMap.get("CustRecID")
    this.requestDetails()
  }
  backbtn() {
    this.Router.navigate(['Dashboard/support/employeeRequest'])
  }
  
  requestDetails() {
    this.spinner.show()
    this.UsersService.RequestDetails(this.reqID, this.CustRecID).subscribe((requestData) => {
    
      if (requestData.code == "S001") {
        this.spinner.hide()
        this.requestDetailsData = requestData.data
        // console.log(this.requestDetailsData.VendorProfile)
        console.log("assss", this.requestDetailsData.AssignedVendor)
        console.log("length", this.requestDetailsData.AssignedVendor.length)
        if (this.requestDetailsData.AssignedVendor.length > 0) {
          if (this.requestDetailsData.AssignedVendor.length >= 1) {
            this.jobStart = 'Yes'

            let da2 = new Date((this.requestDetailsData.AssignedVendor[0].StartDate) * 1000);
            // console.log(da2);
            // let selectedEndDate = new Date(da2.getTime());
            this.resultStartDate = this.datePipe.transform(da2, 'MM/dd/YYYY')
            this.vendorUpdate.patchValue({ 'Status': this.requestDetailsData.AssignedVendor[0].Status })
            // this.vendorUpdate.patchValue({ 'StatusRemarks': this.requestDetailsData.AssignedVendor[0].Remarks })
            this.vendorUpdate.patchValue({ 'Price': this.requestDetailsData.AssignedVendor[0].Price })
            this.vendorUpdate.patchValue({ 'PriceFor': this.requestDetailsData.AssignedVendor[0].PriceFor })
            this.vendorUpdate.patchValue({ 'StartDate': this.resultStartDate })
            //  this.vendorUpdate.patchValue({ 'StartDate': this.requestDetailsData.AssignedVendor[0].StartDate })

          }
        }

        this.serviceType = this.requestDetailsData.ServiceType
        this.vendorData = this.requestDetailsData.VendorProfile.filter(function (el: any) {

          return el.Status != "Cancelled";

        })
        for (let i = 0; i < this.requestDetailsData.VendorProfile.length; i++) {

          let obj: any
          obj = this.requestDetailsData.VendorProfile[i];
          if (obj.Status == 'Approved') {
            this.vendorStatus = 'Yes'
          }

        }
        if (this.requestDetailsData.ServiceType == 'Onetime' && requestData.data.AssignedVendor.length >= 1) {
          for (let i = 0; i < requestData.data.AssignedVendor.length; i++) {
            this.vendorIDData = requestData.data.AssignedVendor[i].VendorID
            this.vendorName = requestData.data.AssignedVendor[i].VendorName
          }
        }
        this.profileView = requestData.data.VendorProfile
        // for (let a of this.profileView) {
        //   // this.doc = a.ProfileUrl
        //   // console.log("this.doc",this.doc)
        // }
      } else {
        alert(requestData.data)
      }
    }, function (error) {
      alert(error.error.data)
    })
  }
  profileActed(profileID: any, Status: any, ID: any) {
    this.vendorIDData = ID
    console.log("iiii", this.vendorIDData, Status)
    this.UsersService.profileActed(this.reqID, profileID, Status, '').subscribe((Response) => {
      if (Response.code == "S001") {
    
        alert(Response.data)

        if (Status == 'Approved') {
          this.assignVendorForRequest()

        }
        if (Status == 'Rejected') {
        window.location.reload()
        }

        // window.location.reload()

        // window.location.reload()


      } else {
        alert(Response.data)
        window.location.reload()
      }


    }, function (error) {
      alert(error.error.data)
    })
  }
  showView(index:any) {
    
    this.doc=this.profileView[index].ProfileUrl
    console.log("this.doc",this.doc)
   
    window.open(this.doc, "_blank");
  }
  assignVendorForRequest() {
    console.log("assignvennn")
    // this.reqID = this.route.snapshot.queryParamMap.get("RequestID")

    console.log(this.vendorIDData, this.reqID)
    this.reqID = this.requestDetailsData.RequestID
    this.UsersService.assignVendorForRequest(this.reqID, this.vendorIDData).subscribe((Response) => {
      // this.vendorStatus = 'No'

      console.log(Response.data)
      console.log("assignvennn")
      if (Response.code == "S001") {
        // this.vendorStatus = 'Yes'
        alert(Response.data)
        window.location.reload()

      } else {
        alert(Response.data)
        window.location.reload()
      }
    }, function (error) {
      alert(error.error.data)
    })
  }
  vendorStatusUpdate() {
    this.vendorStatusbtn = true






    let da1 = new Date(this.vendorUpdate.value.StartDate);
    let selectedDate = new Date(da1.getTime());
    let result = this.datePipe.transform(selectedDate, 'dd/MM/YYYY HH:mm')
    this.vendorUpdate.value.StartDate = result


    if (this.vendorUpdate.value.EndDate != '') {
      let da2 = new Date(this.vendorUpdate.value.EndDate);
      let selectedEndDate = new Date(da2.getTime());
      let result2 = this.datePipe.transform(selectedEndDate, 'dd/MM/YYYY')
      this.vendorUpdate.value.EndDate = result2
      console.log(result2)
    }
    console.log(this.vendorUpdate.status)

    this.vendorUpdate.value.RequestID = this.reqID
    this.vendorUpdate.value.VendorID = this.requestDetailsData.AssignedVendor[0].VendorID





    this.UsersService.updateVendorStatus(this.vendorUpdate.value).subscribe((Response) => {
      if (Response.code == "S001") {
        alert(Response.data)
        window.location.reload()
      } else {
        alert(Response.data)
        // window.location.reload()
      }
    }, function (error) {
      alert(error.error.data)
    })
  }




  endDate(endDate: any) {
    let da2 = new Date((this.requestDetailsData.AssignedVendor[0].StartDate) * 1000);
    // console.log(da2);
    // let selectedEndDate = new Date(da2.getTime());
    this.resultStartDate = this.datePipe.transform(da2, 'MM/dd/YYYY')

    console.log(this.resultStartDate, "Start Date Db")
    // let sEndDate = new Date(endDate.target.value.getTime());
    this.resultEndDate = this.datePipe.transform(endDate.target.value, 'MM/dd/YYYY')
    console.log(this.resultEndDate, "End Date")
    const date1 = new Date(this.resultStartDate)
    const date2 = new Date(this.resultEndDate)
    let diff = date2.getTime() - date1.getTime()

    this.diffInDays = diff / (1000 * 3600 * 24)

    this.vendorUpdate.patchValue({ ActualDaysServed: this.diffInDays })





  }


  alertForJobs(data: any) {
    if (this.requestDetailsData.AssignedVendor[0].StartDate == null && this.vendorUpdate.value.Status == 'Job_Completed') {
      console.log(this.vendorUpdate.value.Status, "vvvv")
      alert('please select job started status first');
      // ($('#UpdateStatus') as any).modal('hide');
      location.reload()
      return;
    }
    if (this.requestDetailsData.AssignedVendor[0].StartDate != null) {
      if (this.vendorUpdate.value.Status == 'Job_Cancelled' && this.requestDetailsData.AssignedVendor[0].EndDate == null) {
        alert('please update status to completed');
        // ($('#UpdateStatus') as any).modal('hide');

        location.reload()
        return;



      }
    }
  }

}
