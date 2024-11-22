import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

interface Event {
  start: Date
  finish: Date
}

@Component({
  selector: 'app-appointments-calendar',
  templateUrl: './appointments-calendar.component.html',
  styleUrls: ['./appointments-calendar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppointmentsCalendarComponent implements OnInit {

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
      start: new Date(2024, 10, 18, 20, 0),
      finish: new Date(2024, 10, 18, 22, 0)
    },{
      start: new Date(2024, 10, 22, 8, 0),
      finish: new Date(2024, 10, 22, 10, 0)
    }
  ]

  type:string = 'weekly'

  changeToMonthly() {
    this.type = 'monthly'
    this.changeDetectorRef.markForCheck()
  }

  constructor(protected changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

}
