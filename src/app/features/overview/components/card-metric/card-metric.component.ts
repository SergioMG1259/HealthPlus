import { Component, Input, OnInit } from '@angular/core';
import { CardMetric } from '../../models/card-metric';

@Component({
  selector: 'app-card-metric',
  templateUrl: './card-metric.component.html',
  styleUrls: ['./card-metric.component.css']
})
export class CardMetricComponent implements OnInit {

  iconsDictionary: Record<string, string> = {
    appointments: "bx-calendar",
    patients: "bx-handicap",
    predicts: "bx-heart",
    earning: "bx-money"
  };
  
  @Input() metric!:CardMetric

  constructor() { }

  ngOnInit(): void {

  }
}