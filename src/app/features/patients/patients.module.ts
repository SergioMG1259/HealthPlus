import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './pages/patients/patients.component';
import { PatientsListComponent } from './pages/patients-list/patients-list.component';
import { SharedModule } from "../../shared/shared.module";
import { FilterPatientComponent } from './components/filter-patient/filter-patient.component';
import { A11yModule } from '@angular/cdk/a11y';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    PatientsComponent,
    PatientsListComponent,
    FilterPatientComponent
  ],
  imports: [
    PatientsRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    A11yModule,
    ReactiveFormsModule
]
})
export class PatientsModule { }
