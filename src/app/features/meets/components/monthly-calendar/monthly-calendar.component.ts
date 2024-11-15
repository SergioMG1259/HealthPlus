import { Component, Input, OnInit } from '@angular/core';

interface Event {
  start: Date
  finish: Date
}

@Component({
  selector: 'app-monthly-calendar',
  templateUrl: './monthly-calendar.component.html',
  styleUrls: ['./monthly-calendar.component.css']
})
export class MonthlyCalendarComponent implements OnInit {

  @Input() events: Event[] = []
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  years: number[] = []

  maxYear:number = new Date().getFullYear() + 5
  minYear:number = 2020
  type:string = 'monthly'

  gridData: { day: Date, isOtherMonth: boolean }[] = []
  monthDateCurrent:Date = new Date()
  indexMonth!:number
  indexYear!:number

  constructor() {}

  fillCalendar(date: Date) {
    const year = date.getFullYear()
    const month = date.getMonth()
    this.indexMonth = month
    this.indexYear = year
    // Primer día del mes
    const firstDay = new Date(year, month, 1)
    // Último día del mes
    const lastDay = new Date(year, month + 1, 0)
    
    // Determinar el día de la semana del primer día del mes (0 = Domingo, 6 = Sábado)
    const startDay = new Date(firstDay)
    this.monthDateCurrent = new Date(firstDay)
    //0, último día del mes anterior, -1 penúltimo día
    startDay.setDate(1 - firstDay.getDay()) // Retroceder hasta el domingo
 
    // Calcular hasta el último día del mes en la semana
    const endDay = new Date(lastDay)
    endDay.setDate(lastDay.getDate() + (6 - lastDay.getDay())); // Avanzar hasta el sábado
    // Llenar los días
    let current = startDay
    this.gridData = []

    while (current <= endDay) {
      const isOtherMonth = current.getMonth() !== month
      this.gridData.push({
        day: new Date(current),
        isOtherMonth: isOtherMonth,
      })
      current.setDate(current.getDate() + 1) // Pasar al siguiente día
    }
  }

  monthChange(index:number) {
    this.fillCalendar(new Date(this.indexYear, index, 1))
  }

  yearChange(index:number) {
    this.fillCalendar(new Date(index, this.indexMonth, 1))
  }

  isToday(day: Date): boolean {
    const aux = new Date()
    return aux.getDate() === day.getDate() && aux.getMonth() === day.getMonth() && 
    aux.getFullYear() == day.getFullYear()
  }

  hasEventAt(day:Date, eventDay: Date): boolean {
    if(
      day.getFullYear() == eventDay.getFullYear() &&
      day.getMonth() == eventDay.getMonth() &&
      day.getDate() == eventDay.getDate()
    )
      return true
    return false
  }

  getEventsForDay(day: Date) {
    const dayEvents = this.events.filter(event => this.hasEventAt(day, event.start))
    return {
      events: dayEvents.slice(0, 3),
      remaining: dayEvents.length > 3 ? dayEvents.length - 3 : 0
    }
  }

  onClickchangeMonth(i : 'next'|'prev') {
    if(i == 'next')
      this.fillCalendar(new Date(this.monthDateCurrent.getFullYear(), this.monthDateCurrent.getMonth() + 1, 1))
    else
      this.fillCalendar(new Date(this.monthDateCurrent.getFullYear(), this.monthDateCurrent.getMonth() - 1, 1))
  }

  ngOnInit(): void {
    this.years = Array.from({ length: this.maxYear - this.minYear + 1 }, (_, i) =>this.maxYear - i)
    this.fillCalendar(new Date())
  }
}
