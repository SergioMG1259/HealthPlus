import { Component, OnInit } from '@angular/core';
import { CardMetric } from '../../models/card-metric';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  cardMetrics: CardMetric[] = [
    {
      category: "appointment",
      amount :  38,
      percentage: 17,
      direction: "down"
    },
    {
      category: "patients",
      amount :  35,
      percentage: 17,
      direction: "up"
    },
    {
      category: "predicts",
      amount :  27,
      percentage: 17,
      direction: "up"
    },
    {
      category: "earning",
      amount :  9205,
      percentage: 17,
      direction: "up"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
