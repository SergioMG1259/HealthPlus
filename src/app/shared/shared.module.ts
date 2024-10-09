import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { CardHeaderComponent } from './components/card-header/card-header.component';
import { DropdownOptionComponent } from './components/dropdown-option/dropdown-option.component';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { DropdownComponent } from './components/dropdown/dropdown.component';



@NgModule({
  declarations: [
    CardComponent,
    CardHeaderComponent,
    DropdownOptionComponent,
    DropdownComponent
  ],
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    FormsModule
  ],
  exports: [
    CardComponent,
    CardHeaderComponent,
    DropdownComponent,
    DropdownOptionComponent
  ]
})
export class SharedModule { }
