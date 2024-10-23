import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './pages/patients/patients.component';
import { PatientsListComponent } from './pages/patients-list/patients-list.component';
import { AddPatientComponent } from './pages/add-patient/add-patient.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
