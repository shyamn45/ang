import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule}from'@angular/common/http';
import { AppComponent } from './app.component';
import { EmergencyListComponent } from './emergency-list/emergency-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SidenavbarComponent } from './sidenavbar/sidenavbar.component';
import { TopnavbarComponent } from './topnavbar/topnavbar.component';
// import { ConfigformComponent } from './configform/configform.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
// import { AserseComponent } from './asers/aserse.component';
// import { CustomerconfigurationdetailsComponent } from './customerconfigurationdetails/customerconfigurationdetails.component';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { NgChartsModule } from 'ng2-charts';
import { EmergecyCustomerDataComponent } from './emergecy-customer-data/emergecy-customer-data.component';
import { SupportDashboardComponent } from './support-dashboard/support-dashboard.component';
// import { AnchorsDashboardComponent } from './anchors-dashboard/anchors-dashboard.component';
import { AnchorModelModule } from './anchor-model/anchor-model.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DementiaModule } from './dementia_model/dementia.module';
import { DatePipe } from '@angular/common';
import { InsuranceModule } from './insurance/insurance.module';
import { OneTimeUserModule } from './one-time-user/one-time-user.module';
import { PartnersComponent } from './partner/partners/partners.component';
// import { FilterPipeModule } from 'ngx-filter-pipe';
import { RequestDetailsComponent } from './partner/request-details/request-details.component';
import { PartnerModule } from './partner/partner.module';
import { AppliationDashboardComponent } from './appliation-dashboard/appliation-dashboard.component';
import { CoustomerslistComponent } from './coustomerslist/coustomerslist.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { PartnerDashboardComponent } from './partner/partner-dashboard/partner-dashboard.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SupportModule } from './support/support.module';
import { NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown'





@NgModule({
  declarations: [
    AppComponent,
    EmergencyListComponent,
    LoginComponent,
    CoustomerslistComponent,
    SidenavbarComponent,
    TopnavbarComponent,
    EmergecyCustomerDataComponent,
    SupportDashboardComponent,
    AppliationDashboardComponent,
    RequestDetailsComponent,
    PartnerDashboardComponent,
    RequestDetailsComponent,
    PartnersComponent,
    RequestDetailsComponent,

   

  ],
  imports: [
    
    BrowserModule,
    OneTimeUserModule,
    AppRoutingModule, 
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AnchorModelModule,
    NgxSpinnerModule,
    AutocompleteLibModule,
    AutocompleteLibModule,
    Ng2SearchPipeModule,
    SupportModule,
    NgMultiSelectDropDownModule,
    
 
    // DpDatePickerModule,
  
   
    
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#960274",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
    NgChartsModule,
    AnchorModelModule,
    BrowserAnimationsModule,
    DementiaModule,
    InsuranceModule,
    // moment
   
    
    
    
  ],
  
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class DemoDatepickerModule {}
