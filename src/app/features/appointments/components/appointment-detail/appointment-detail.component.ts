import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

interface Event {
  start: Date
  finish: Date
}

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css']
})
export class AppointmentDetailComponent implements OnInit {

  @Input() appointment!: Event

  editing: boolean = false
  hours: number[] = []
  minDate: Date = new Date()

  startHour: number = 6
  finishHour: number = 7
  date!: Date

  constructor(private cdr: ChangeDetectorRef) {
    for (let i = 6; i <= 21; i++) {
      this.hours.push(i)
    }
  }

  onClickEdit(){
    this.editing = true
    this.cdr.detectChanges()
  }

  onClickStopEdit(){this.editing = false}

  compareDates(firstDate: Date, secondDate: Date): boolean {
    const date1 = new Date(firstDate)
    const date2 = new Date(secondDate)

    date1.setHours(0, 0, 0, 0)
    date2.setHours(0, 0, 0, 0)

    return date1.getTime() >= date2.getTime()
  }

  ngOnInit(): void {
    this.startHour = this.appointment.start.getHours()
    this.finishHour = this.appointment.finish.getHours()
    this.date = this.appointment.start
  }

}
