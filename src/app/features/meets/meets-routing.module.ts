import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetsCalendarComponent } from './pages/meets-calendar/meets-calendar.component';

const routes: Routes = [
  {path:'', component:MeetsCalendarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetsRoutingModule { }
