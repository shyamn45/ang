import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DementiaRoutingModule } from './dementia-routing.module';
import { DementiaScheduleModelComponent } from './dementia-schedule-model/dementia-schedule-model.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DementiaCustomersComponent } from './dementia-customers/dementia-customers.component';
import { DementiaCreateScheduleComponent } from './dementia-create-schedule/dementia-create-schedule.component';
import { DementiaInitialAssessmentFormComponent } from './dementia-initial-assessment-form/dementia-initial-assessment-form.component';
import { NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown'

import { BrowserModule } from '@angular/platform-browser'
@NgModule({
  declarations: [
    DementiaScheduleModelComponent,
    DementiaCustomersComponent,
    DementiaCreateScheduleComponent,
    DementiaInitialAssessmentFormComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    DementiaRoutingModule,
    NgxSpinnerModule   ,
    FormsModule, 
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    
  ]
})
export class DementiaModule { }
