import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './pages/patients/patients.component';
import { PatientsListComponent } from './pages/patients-list/patients-list.component';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    PatientsComponent,
    PatientsListComponent
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    SharedModule
]
})
export class PatientsModule { }
