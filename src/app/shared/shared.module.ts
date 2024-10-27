import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { CardHeaderComponent } from './components/card-header/card-header.component';
import { DropdownOptionComponent } from './components/dropdown-option/dropdown-option.component';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { A11yModule } from '@angular/cdk/a11y';
import { StepperComponent } from './components/stepper/stepper.component';
import { StepComponent } from './components/step/step.component';



@NgModule({
  declarations: [
    CardComponent,
    CardHeaderComponent,
    DropdownOptionComponent,
    DropdownComponent,
    PaginatorComponent,
    CheckboxComponent,
    CalendarComponent,
    DatePickerComponent,
    StepperComponent,
    StepComponent
  ],
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    A11yModule,
    FormsModule
  ],
  exports: [
    CardComponent,
    CardHeaderComponent,
    DropdownComponent,
    DropdownOptionComponent,
    PaginatorComponent,
    CheckboxComponent,
    CalendarComponent,
    DatePickerComponent,
    StepperComponent,
    StepComponent
  ]
})
export class SharedModule { }
