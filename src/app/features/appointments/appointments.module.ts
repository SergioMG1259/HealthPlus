import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { WeeklyCalendarComponent } from './components/weekly-calendar/weekly-calendar.component';
import { MonthlyCalendarComponent } from './components/monthly-calendar/monthly-calendar.component';
import { AppointmentsCalendarComponent } from './pages/appointments-calendar/appointments-calendar.component';
import { AppointmentDetailComponent } from './components/appointment-detail/appointment-detail.component';
import { DialogAddAppointmentComponent } from './components/dialog-add-appointment/dialog-add-appointment.component';


@NgModule({
  declarations: [
    WeeklyCalendarComponent,
    MonthlyCalendarComponent,
    AppointmentsCalendarComponent,
    AppointmentDetailComponent,
    DialogAddAppointmentComponent
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    SharedModule,
    FormsModule,
    OverlayModule,
    A11yModule
  ]
})
export class AppointmentsModule { }
