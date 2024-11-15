import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetsRoutingModule } from './meets-routing.module';
import { MeetsCalendarComponent } from './pages/meets-calendar/meets-calendar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { FormsModule } from '@angular/forms';
import { WeeklyCalendarComponent } from './components/weekly-calendar/weekly-calendar.component';
import { MonthlyCalendarComponent } from './components/monthly-calendar/monthly-calendar.component';


@NgModule({
  declarations: [
    MeetsCalendarComponent,
    WeeklyCalendarComponent,
    MonthlyCalendarComponent
  ],
  imports: [
    CommonModule,
    MeetsRoutingModule,
    SharedModule,
    FormsModule,
    OverlayModule,
    A11yModule
  ]
})
export class MeetsModule { }
