import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceDashboardComponent } from './insurance-dashboard/insurance-dashboard.component'
// import { UsersService } from '../users.service';
import { InsuranceFormComponent } from './insurance-form/insurance-form.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InsuranceDashboardComponent,
    InsuranceFormComponent,
    

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // UsersService,
    FormsModule,
  ],
  exports:[
    InsuranceDashboardComponent,
    InsuranceFormComponent,
  ]
  
})
export class InsuranceModule{ }
