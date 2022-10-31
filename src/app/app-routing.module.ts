import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoustomerslistComponent } from './coustomerslist/coustomerslist.component';
import { EmergencyListComponent } from "./emergency-list/emergency-list.component"
import { LoginComponent } from './login/login.component';
import { SidenavbarComponent } from './sidenavbar/sidenavbar.component';
import { TopnavbarComponent } from './topnavbar/topnavbar.component';
// import { ConfigformComponent } from './configform/configform.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
// import { AserseComponent } from './asers/aserse.component';
// import { CustomerconfigurationdetailsComponent } from './customerconfigurationdetails/customerconfigurationdetails.component';
import { EmergecyCustomerDataComponent } from './emergecy-customer-data/emergecy-customer-data.component'
import { SupportDashboardComponent } from './support-dashboard/support-dashboard.component';
// import { AnchorsDashboardComponent } from './anchors-dashboard/anchors-dashboard.component';
import { AnchorDashboardComponent } from './anchor-model/anchor-dashboard/anchor-dashboard.component';
import { ProfileComponent } from './anchor-model/profile/profile.component';
import { CompanyprofileComponent } from './anchor-model/companyprofile/companyprofile.component';
import { RevenueComponent } from './anchor-model/revenue/revenue.component';
import { PartnerRevenueComponent } from './support/partner-revenue/partner-revenue.component'
import { UpdatePartnerRevenueComponent } from './support/update-partner-revenue/update-partner-revenue.component'
import { ContactDetailsComponent } from './anchor-model/contact-details/contact-details.component'
import { BankDetailsComponent } from './anchor-model/bank-details/bank-details.component'
import { AgreementDetailsComponent } from './anchor-model/agreement-details/agreement-details.component'
import { AgreementdetailsComponent } from './anchor-model/agreementdetails/agreementdetails.component'
import { LocationDetailsComponent } from './anchor-model/location-details/location-details.component'
import { DementiaScheduleModelComponent } from './dementia_model/dementia-schedule-model/dementia-schedule-model.component';
import { DementiaCustomersComponent } from './dementia_model/dementia-customers/dementia-customers.component';
import { DementiaCreateScheduleComponent } from './dementia_model/dementia-create-schedule/dementia-create-schedule.component';
import { DementiaInitialAssessmentFormComponent } from './dementia_model/dementia-initial-assessment-form/dementia-initial-assessment-form.component';
import { AnchorManagerComponent } from './anchor-model/anchor-manager/anchor-manager.component'
import { InsuranceDashboardComponent } from './insurance/insurance-dashboard/insurance-dashboard.component'
import { InsuranceFormComponent } from './insurance/insurance-form/insurance-form.component'
import { OTMDashboardComponent } from './one-time-user/otm-dashboard/otm-dashboard.component';
import { PartnersComponent } from './partner/partners/partners.component';
import { PartnerDashboardComponent } from './partner/partner-dashboard/partner-dashboard.component';
import { RequestDetailsComponent } from './partner/request-details/request-details.component';
import { AppliationDashboardComponent } from './appliation-dashboard/appliation-dashboard.component';
// import { RequestDetailsComponent } from './partner/request-details/request-details.component';
import { RequestDashboardComponent } from './support/support-request-dashboard/request-dashboard.component';
import { AllRequestScreenComponent } from './support/all-request-screen/all-request-screen.component';
import { EmployeeRequestComponent } from './support/employee-request/employee-request.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { RequestConfigurationComponent } from './partner/request-configuration/request-configuration.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: 'full' },
  {
    path: "Dashboard", component: AppliationDashboardComponent,
    children: [
      { path: "Customerslist", component: CoustomerslistComponent },
      { path: "Permission", component: PermissionsComponent },


      {
        path: "support",
        children: [
          { path: 'requestDashboard', component: RequestDashboardComponent },
          { path: 'allRequestDetails', component: AllRequestScreenComponent },
          { path: 'employeeRequest', component: EmployeeRequestComponent }
        ]
      },
      {
        path: "partner",

        children: [
          { path: 'partnersTask', component: PartnersComponent },
          { path: 'partnersDashBoard', component: PartnerDashboardComponent },
          { path: 'requestDetails', component: RequestDetailsComponent },
          { path: 'RequestConfiguration', component: RequestConfigurationComponent },



        ]
      },

      {
        path: "dementia", children: [
          { path: "dementiaSchedule", component: DementiaScheduleModelComponent },
          { path: "assesmentform", component: DementiaInitialAssessmentFormComponent },
          { path: "dementiaCreateSchedule", component: DementiaCreateScheduleComponent },
          { path: "dementiaAllCustomers", component: DementiaCustomersComponent },
        ]
      },


    ],

  },







  { path: "emergencyList", component: EmergencyListComponent },
  { path: "emergencyCustomerData", component: EmergecyCustomerDataComponent },
  { path: "login", component: LoginComponent },
  { path: "sidenavbar", component: SidenavbarComponent },

  // {path:"configform", component: ConfigformComponent},
  { path: "ppformyself", component: CustomerDetailsComponent },
  // {path:"Aserse", component:AserseComponent},
  // {path:"customerconfigurationdetails", component:CustomerconfigurationdetailsComponent},
  { path: "supportDashBoard", component: SupportDashboardComponent },
  // {path:"anchorsdashboard",component:AnchorsDashboardComponent},
  { path: "anchorboard", component: AnchorDashboardComponent },
  { path: "anchorprofiel", component: ProfileComponent },
  { path: "companyprofile", component: CompanyprofileComponent },

  { path: "contactdetails", component: ContactDetailsComponent },
  { path: "bankdetails", component: BankDetailsComponent },

  { path: "Agreementdetails", component: AgreementDetailsComponent },
  { path: "AgreementDetails", component: AgreementdetailsComponent },
  { path: "LocationDetails", component: LocationDetailsComponent },
  // {path:"Agreementdetls",component:AgreementdetailsComponent},
  { path: "Revenue", component: RevenueComponent },

  { path: "OneTimeUser", component: OTMDashboardComponent },
  { path: "AnchorManager", component: AnchorManagerComponent },
  { path: "insurancedashboard", component: InsuranceDashboardComponent },
  { path: "insuranceform", component: InsuranceFormComponent },



  {
    path: "partner",

    children: [
      { path: 'partnersTask', component: PartnersComponent },
      { path: 'partnersDashBoard', component: PartnerDashboardComponent },
      { path: 'requestDetails', component: RequestDetailsComponent },
    ]
  },

  {
    path: "revenue",
    children: [
      { path: 'revenueList', component: PartnerRevenueComponent },
      { path: 'updateRevenue', component: UpdatePartnerRevenueComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
