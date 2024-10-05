import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { A11yModule } from '@angular/cdk/a11y';


@NgModule({
  declarations: [
    SideBarComponent,
    LayoutComponent,
    TopBarComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    A11yModule
  ]
})
export class LayoutModule { }
