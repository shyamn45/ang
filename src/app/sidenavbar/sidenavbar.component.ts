import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent implements OnInit {
  title = 'anvayaa_web';
  Status = ""
  token: any
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('x-fiftyaccess-token')
    // console.log("side",this.token)
  }

  doactivesidebar() {
    console.log(this.Status)
    if (this.Status == "") {
      this.Status = "active"
    } else {
      this.Status = ""
    }
    // console.log(this.Status)
  }
  onProfile() {
    this.route.navigate(['/supportDashBoard'])
  }
  onDementiaClick() {
    this.route.navigate(['/dementia/dementiaSchedule'])
  }
  onDementiaAssesmentForm() {
    this.route.navigate(['/assesmentform'])
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

   Insurance(){
    this.route.navigate(['/insurancedashboard'])

   }
   onOneTimeUser(){
    this.route.navigate(['/OneTimeUser'])

   }
   datepicker(){
     this.route.navigate(['/datepic'])
   }
   partner(){
     this.route.navigate(['/partner/partnersTask'])
   }
   onClickSupport(){
    this.route.navigate(['/support/requestDashboard'])
   }
}
