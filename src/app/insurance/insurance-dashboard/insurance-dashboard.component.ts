import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../users.service';


@Component({
  selector: 'app-insurance-dashboard',
  templateUrl: './insurance-dashboard.component.html',
  styleUrls: ['./insurance-dashboard.component.css']
})
export class InsuranceDashboardComponent implements OnInit {

  constructor(private route: Router, private activatedRoute: ActivatedRoute, private userservice: UsersService) { }

  screen: any;

  id:any
  lifeInsuranceScreen: any = false;
  generalInsuranceScreen: any = false;
  GenralDetails:any
  GeneralInsurance: any = [];
  lifeInsurance: any = [];
  policyDetails: any
  totalGeneralInsuranceCount: any;
  life: any
  policylist:any
  Health:any
  totalLifeInsuranceCount:any
  ngOnInit(): void {



    this.userservice.policylist().subscribe(policy => {
      this.policylist = policy.data
      console.log("response", this.policylist)
      this.lifeInsurance = this.policylist.listOfLifeInsurances
      console.log("lifeInsurance", this.lifeInsurance)
      this.GeneralInsurance = this.policylist.listOfGeneralInsurances
      console.log('generalInsurance',this.GeneralInsurance)

    })



  }
  onMembers() {


    this.lifeInsuranceScreen = true; this.generalInsuranceScreen = false;

    this.screen = "Totallifeinsurance";

  }


  onFamilies() {

    this.lifeInsuranceScreen = false; this.generalInsuranceScreen = true;


    this.screen = "Generallifeinsurance";


  }

  lifeinsuranceForm() {

    this.route.navigate(["/insuranceform"], { queryParams: { type: "Health" } })
  }

  generalInsurance() {
    this.route.navigate(["/insuranceform"], { queryParams: { type: "genral" } })
  }

   details(data:any){
     console.log("params",data)
    this.route.navigate(["/insuranceform"],{ queryParams: { InsuranceType: data.InsuranceType ,InsuranceID:data.InsuranceID} })
      
   }

}

