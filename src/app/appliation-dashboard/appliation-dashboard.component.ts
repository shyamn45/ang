import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service'
import { Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';


import { DatePipe } from '@angular/common'


@Component({
  selector: 'app-appliation-dashboard',
  templateUrl: './appliation-dashboard.component.html',
  styleUrls: ['./appliation-dashboard.component.css']
})
export class AppliationDashboardComponent implements OnInit {

  token: any
  Status = ""

  keyword: any

  data: any = []
  CustRecID: any
  userDetails: any = []
  ServiceAreaID: any
  categaryDetails: any = []
  keyword1: any
  categoryID: any
  SubCategoryID: any
  serviceData: any
  serviceHistory: any
  CategoryID: any
  customerCity: String = ''
  ServiceID: string;
  Covered: string;
  NotCovered: string;
  serviceType: String
  public createRequestData: FormGroup;
  public Recuring: FormGroup;
  dropdownSettings: Object = {}
  selectedItems: Array<String> = []
  notCoveredInPlan: boolean = false
  TotalPrice: number
  CoverdPlan: boolean = false
  paymentmode: String
  Beneficiaries: any = []
  CategoryTypeID: String
  pmsVerify: boolean = false
  formDetails: boolean = false
  daysData: any = []
  planType:String
  PackageNature:String
  Days: Array<string> = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]
  constructor(private userservice: UsersService, private route: Router, private spinner: NgxSpinnerService, private Router: Router, private UsersService: UsersService, private FormBuilder: FormBuilder, private DatePipe: DatePipe) { }
  ngOnInit(): void {
   
    this.token = localStorage.getItem('x-fiftyaccess-token')

    this.createRequestData = this.FormBuilder.group({
      RequestedStartDate: [''],
      RequestedEndDate: [''],
      Note: [''],
      PaymentMode: [''],
      ServiceType: [''],
      days: [''],
      ServiceRequestType: ['']





    })

    //  this.createRequestData.patchValue({RequestType:"InHouse"})
    // this.dropdownSettings = {
    //   idField: 'item_id',
    //   textField: 'item_text',
    //   selectAllText: 'Select All',
    //   unSelectAllText: 'UnSelect All',
    //   onDeSelect: 'item_text',
    //   itemsShowLimit: 8,
    //   allowSearchFilter: true,
    // }
  }

  logout() {
    localStorage.removeItem("x-fiftyaccess-token")
    this.route.navigate(["/login"]);
  }


  doactivesidebar() {
    if (this.Status == "") {
      this.Status = "active";
    } else {
      this.Status = "";
    }
    // console.log(this.Status)
  }
  onProfile() {
    this.route.navigate(['/supportDashBoard'])
  }
  onDementiaClick() {
    this.route.navigate(['Dashboard/dementia/dementiaSchedule'])
  }
  onDementiaAssesmentForm() {
    this.route.navigate(['Dashboard/dementia/assesmentform'])
  }

  emergencyList() {
    this.route.navigate(['/emergencyList'])

  }

  CustomerList() {
    this.route.navigate(['/customerslist'])

  }

  AnchorDashBoard() {
    this.route.navigate(['/anchorboard'])
  }

  Insurance() {
    this.route.navigate(['/insurancedashboard'])

  }
  onOneTimeUser() {
    this.route.navigate(['/OneTimeUser'])
  }
  datepicker() {
    this.route.navigate(['/datepic'])
  }
  partner() {
    this.spinner.show();
    this.route.navigate(['Dashboard/partner/partnersTask'])
    this.spinner.hide();
  }
  revenue() {
    this.route.navigate(['/revenue/revenueList'])
  }
  support() {
    // this.route.navigate(['/dashboard/support/requestDashboard'])
    this.route.navigate(["/Dashboard/support/employeeRequest"]);
  }

  PermissionsClick() {
    this.route.navigate(["/Dashboard/Permission"]);

  }
  allRequestDashboard() {
    this.Router.navigate(['/support/allRequestDetails'])
  }


  customerDetails() {
    this.keyword = 'Name'
    this.UsersService.CustomerDetailsData().subscribe((customerDetails) => {
      if (customerDetails.code == "S001") {
        //("customerDetails", customerDetails.data)
        console.log("customerDetails", customerDetails.data)
        this.data = customerDetails.data
      } else {
        alert(customerDetails.data)
      }



    }, function (error) {
      alert(error.error.data)
    })

  }
  selectEvent(data: any) {
    this.CustRecID = data.CustRecID
    console.log("cust", this.CustRecID)
    console.log(data)
    this.viewUserData()
    //("custrecID", data.CustRecID)
  }
  onChangeSearch(data: any) {
    this.userDetails = []
  }
  onFocused(data: any) {
    this.userDetails = []
    this.serviceData = ''
    this.serviceHistory = ''
    this.planType=''
  }

  viewUserData() {
    this.UsersService.viewUser(this.CustRecID).subscribe((userData) => {
      if (userData.code == "S001") {
        this.userDetails.push(userData.data)
        this.Beneficiaries = userData.data.Beneficiaries
        this.ServiceAreaID = userData.data.CustomerPackageObj.ServiceAreaID
        this.customerCity = userData.data.City
        console.log("city", userData.data.CustomerPackageObj.AliasName)
        this.planType=userData.data.CustomerPackageObj.AliasName
        this.PackageNature=userData.data.CustomerPackageObj.PackageNature
        this.viewAllCategaryDetailsData()
      } else {
        alert(userData.data)
      }
    }, function (error) {
      alert(error.error.data)
    })
  }
  onChangePlan(data: any) {
    this.serviceData = ''
    this.serviceHistory = ''
  }
  onFocuse(data: any) {
    this.serviceData = ''
    this.NotCovered = ''
    this.Covered = ''
    this.TotalPrice = 0
  }
  viewAllCategaryDetailsData() {
    this.keyword1 = "AliasName"
    this.UsersService.viewAllCategaryDetails(this.CustRecID, this.ServiceAreaID).subscribe((viewAllCategaryDetailsData) => {
      if (viewAllCategaryDetailsData.code == 'S001') {
        for (let a in viewAllCategaryDetailsData.data.subcategories) {
          if (viewAllCategaryDetailsData.data.subcategories[a].Status === "Active") {
            this.categaryDetails.push(viewAllCategaryDetailsData.data.subcategories[a])

          } else {
            console.log("--")
          }
        }
      } else {
        alert(viewAllCategaryDetailsData.data)
      }
    }, function (error) {
      alert(error.error.data)
    })
  }
  selectCategory(data: any) {
    this.SubCategoryID = data.SubCategoryID
    this.categoryID = data.CategoryID
    this.CategoryTypeID = data.CategoryTypeID
    console.log("data", this.CategoryTypeID)
    this.formDetails = true
    this.subscriptionDetails()

  }
  subscriptionDetails() {
    this.UsersService.packageSubscription(this.CustRecID, this.SubCategoryID).subscribe((subscriptionData) => {
      if (subscriptionData.code == "SR01") {
        this.Covered = subscriptionData.data
        this.CoverdPlan = true
        console.log(subscriptionData.data)
        this.CoverdPlan = false
        this.viewServiceDetailsData()
      } else {
        this.NotCovered = subscriptionData.data
        this.notCoveredInPlan = true
        this.viewServiceDetailsData()
      }
    }, function (error) {
      // alert(error.error.data)
    })
  }
  viewServiceDetailsData() {

    this.UsersService.viewServiceDetails(this.CustRecID, this.SubCategoryID).subscribe((serviceDetails) => {
      this.serviceData = ''
      if (serviceDetails.code == "S001") {

        if (serviceDetails.data.servicesdetails.InHouseRequest == 'Yes') {
          this.createRequestData.patchValue({ServiceRequestType: 'InHouseRequest' })
        }
        if (serviceDetails.data.servicesdetails.ThirdPartyRequest == 'Yes') {
          this.createRequestData.patchValue({ServiceRequestType: 'ThirdPartyRequest' })
        }
        this.createRequestData.patchValue({ ServiceType: serviceDetails.data.servicesdetails.ServiceType })
        this.serviceType = serviceDetails.data.servicesdetails.ServiceType

        this.TotalPrice = serviceDetails.data.servicesdetails.TotalPrice
        this.CategoryID = serviceDetails.data.servicesdetails.CategoryID
        this.pmsVarify()
      } else {
        alert(serviceDetails.data)
      }
    }, function (error) {
      alert(error.error.data)
    })
  }
  createRequests() {

    console.log(this.createRequestData.status)
   
    let ReqDate = this.DatePipe.transform(this.createRequestData.value.RequestedStartDate, 'dd-MM-YYYY hh:mm')
    let ReqEndDate = this.DatePipe.transform(this.createRequestData.value.RequestedEndDate, 'dd-MM-YYYY')
    this.createRequestData.value.CustRecID = this.CustRecID
    this.createRequestData.value.ServiceID = this.SubCategoryID
    this.createRequestData.value.ServiceAreaID = this.ServiceAreaID
    this.createRequestData.value.RequestedStartDate = ReqDate
    this.createRequestData.value.RequestedEndDate = ReqEndDate
    this.createRequestData.value.PaymentMode = this.paymentmode
    this.createRequestData.value.days = this.daysData
    console.log(ReqDate, ReqEndDate)
    console.log(this.createRequestData.value)
    return;
    this.UsersService.creteRequest(this.createRequestData.value).subscribe((Response) => {
      if (Response.code == "S001") {
        alert(Response.message)
        this.Router.navigate(['/Dashboard/support/employeeRequest'])
      } else {
        alert(Response.message)
      }
    }, function (error) {
      alert(error.error.message)
    })

  }
  checkbox(values: any) {
    console.log(values.target.defaultValue)
  }
  pmsVarify() {
    this.UsersService.pmsVarification(this.CustRecID, this.TotalPrice).subscribe((Response) => {
      if (Response.code == "F002") {
        this.pmsVerify = true
      } else {
        // alert(Response.data)
        this.pmsVerify = false
      }
    }, (error) => {
      alert(error.error.data)
    })
  }
  paymentMode(type: any) {
    console.log(type.target.defaultValue)


    // this.createRequestData.value.PaymentMode=type.target.defaultValue
    // console.log(this.createRequestData.value.PaymentMode)
    this.paymentmode = type.target.defaultValue
  }
  DaysSelect(days: any) {
    let day = days.target.defaultValue
    console.log(days.target.checked)
    if (days.target.checked === true) {
      this.daysData.push(day); 
    }
    if (days.target.checked === false)
      for (var i = this.daysData.length - 1; i >= -1; i--) {
        if (this.daysData[i] === day) {
          this.daysData.splice(i, 1); 
        }
      }
  }

  plus(){
    this.customerDetails()
  }
}
