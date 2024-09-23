import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './pages/overview/overview.component';
import { CardMetricComponent } from './components/card-metric/card-metric.component';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    OverviewComponent,
    CardMetricComponent
  ],
  imports: [
    CommonModule,
    OverviewRoutingModule,
    SharedModule
]
})
export class OverviewModule { }
