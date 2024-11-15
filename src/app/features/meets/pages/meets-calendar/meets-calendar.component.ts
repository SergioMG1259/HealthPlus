import { ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';

interface Event {
  start: Date
  finish: Date
}

@Component({
  selector: 'app-meets-calendar',
  templateUrl: './meets-calendar.component.html',
  styleUrls: ['./meets-calendar.component.css']
})
export class MeetsCalendarComponent implements OnInit {

  events: Event[] = [
    {
      start: new Date(2024, 10, 10, 6, 0),
      finish: new Date(2024, 10, 10, 7, 0)
    },{
      start: new Date(2024, 9, 3, 8, 0),
      finish: new Date(2024, 9, 3, 9, 0)
    },{
      start: new Date(2024, 10, 10, 9, 0),
      finish: new Date(2024, 10, 10, 12, 0)
    },{
      start: new Date(2024, 10, 13, 20, 0),
      finish: new Date(2024, 10, 13, 22, 0)
    },{
      start: new Date(2024, 10, 16, 13, 0),
      finish: new Date(2024, 10, 16, 15, 0)
    }
  ]

  type:string = 'weekly'

  toggleDropdowns() {
      this.type = 'monthly'
    this.cdr.detectChanges();
  }

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }
}
