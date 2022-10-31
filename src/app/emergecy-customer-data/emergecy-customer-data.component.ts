import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
// import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { filter } from 'rxjs';

@Component({
  selector: 'app-emergecy-customer-data',
  templateUrl: './emergecy-customer-data.component.html',
  styleUrls: ['./emergecy-customer-data.component.css']
})
export class EmergecyCustomerDataComponent implements OnInit {
  emergencyCustomerData: any
  List: any = []
  list1: any = []
  RequestID: any
  customerEmergencyData: any = []
  NearestAmbulanceServices: any = []
  NearestHospitalSuperSpacality: any = []
  PreferdEmergencyHospital: any = []
  StatusTrack: any = []
  SupportCenterExecutive: any
  Executive: any = {}
  Name: any
  EmergencyData: any = [];
  data: any = []
  element: any = []
  constructor(private userservice: UsersService, private route: Router, private snap: ActivatedRoute) { }

  ngOnInit(): void {
    //  console.log('othercomponentdata',this.List) 
    this.RequestID = this.snap.snapshot.queryParamMap.get("RequestID")

    this.Executive.Name = this.SupportCenterExecutive
    // console.log('excicutive',this.Executive)

    // console.log('RequestID',this.RequestID)
    this.userservice.cutomerDetails(this.RequestID).subscribe(emergencyList => {
      //  console.log("full incoming data",emergencyList)
      this.List.push(emergencyList.data)

      // console.log("++++++++++++",this.List)
      this.customerEmergencyData = emergencyList.data.CustomersHealthPlanDetails;
      this.NearestAmbulanceServices = this.customerEmergencyData.NearestAmbulanceServices
      this.NearestHospitalSuperSpacality = this.customerEmergencyData.NearestSuperSpecialityHospitals
      this.PreferdEmergencyHospital = this.customerEmergencyData.PreferredEmergencyHospitals
      this.StatusTrack = emergencyList.data.StatusTrack
      // console.log('detailsObject',this.StatusTrack  )
    })

    this.userservice.emergencyList().subscribe(emergencys => {
      this.EmergencyData = emergencys.data;
    

      for (let i = 0; i < this.EmergencyData.length; i++) {
        // console.log('loop data',this.EmergencyData[i].RequestID)
        if (this.EmergencyData[i].RequestID == this.RequestID) {
          this.SupportCenterExecutive = this.EmergencyData[i].SupportCenterExecutive
          // console.log('done',this.SupportCenterExecutive)
        }
      }

    })
    //  console.log('newArray',this.EmergencyData)

  }





}
