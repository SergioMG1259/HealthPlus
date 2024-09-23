import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'header-card-component flex'
  },
})
export class CardHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
