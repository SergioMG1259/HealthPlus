import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'card-component'
  },
})
export class CardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
