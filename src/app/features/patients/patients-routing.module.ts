import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './pages/patients/patients.component';
import { PatientsListComponent } from './pages/patients-list/patients-list.component';
import { AddPatientComponent } from './pages/add-patient/add-patient.component';
import { PatientDetailsComponent } from './pages/patient-details/patient-details.component';

const routes: Routes = [
  {
    // path:'',
    // component: PatientsComponent,
    // children:[
    //   {path:'',component:PatientsListComponent},{path:'add',component:AddPatientComponent}
    // ]
    path:'', component:PatientsListComponent
  }, {
    path:'add', component:AddPatientComponent
  }, {
    path: 'details', component: PatientDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
