import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './pages/patients/patients.component';
import { PatientsListComponent } from './pages/patients-list/patients-list.component';

const routes: Routes = [
  {
    path:'',
    component: PatientsComponent,
    children:[
      {path:'',component:PatientsListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
