import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './pages/patients/patients.component';
import { PatientsListComponent } from './pages/patients-list/patients-list.component';
import { SharedModule } from "../../shared/shared.module";
import { FilterPatientComponent } from './components/filter-patient/filter-patient.component';
import { A11yModule } from '@angular/cdk/a11y';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddPatientComponent } from './pages/add-patient/add-patient.component';
import { PatientDetailsComponent } from './pages/patient-details/patient-details.component';
import { DialogDeletePatientComponent } from './components/dialog-delete-patient/dialog-delete-patient.component';
import { DialogEditMedicalInformationComponent } from './components/dialog-edit-medical-information/dialog-edit-medical-information.component';
import { DialogEditBasicInformationComponent } from './components/dialog-edit-basic-information/dialog-edit-basic-information.component';


@NgModule({
  declarations: [
    PatientsComponent,
    PatientsListComponent,
    FilterPatientComponent,
    AddPatientComponent,
    PatientDetailsComponent,
    DialogDeletePatientComponent,
    DialogEditMedicalInformationComponent,
    DialogEditBasicInformationComponent
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
