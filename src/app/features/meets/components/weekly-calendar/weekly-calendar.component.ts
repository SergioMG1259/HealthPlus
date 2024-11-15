import { ConnectedPosition } from '@angular/cdk/overlay';
import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

interface Event {
  start: Date
  finish: Date
}

@Component({
  selector: 'app-weekly-calendar',
  templateUrl: './weekly-calendar.component.html',
  styleUrls: ['./weekly-calendar.component.css']
})
export class WeeklyCalendarComponent implements OnInit {

  daysOfWeek:Date[] = []
  gridData: { day: Date, hour: number }[] = []

  @Input() events: Event[] = []

  indexDay: Date = new Date()

  private _isOpenCalendar:boolean = false

  constructor() { }

  toggle() {
    this._isOpenCalendar? this.close() : this.open()
  }

  open() {
    this._isOpenCalendar = true
  }

  close() {
    if (this._isOpenCalendar) {
      this._isOpenCalendar = false
    }
  }

  get _positions(): ConnectedPosition[] {
    let positions: ConnectedPosition[] = [
      {
        originX: 'start',   // Alinea el overlay con el borde izquierdo del origen
        originY: 'bottom',  // Posiciona el overlay debajo del origen
        overlayX: 'start',  // Comienza el overlay desde el borde izquierdo
        overlayY: 'top'     // Aparece desde la parte superior del overlay
      },
    ]

    return positions
  }

  get panelOpen(): boolean {
    return this._isOpenCalendar
  }

  onClickOpenCalendar() {
    this.toggle()
  }

  selectedDate(date: Date) {
    this.generateGridData(date)
    this.close()
  }

  fillDaysArray(date: Date) {
    this.daysOfWeek = []

    for (let i = 0; i < 7; i++) {
      const day = new Date(date)
      day.setDate(date.getDate() + i) // Sumar el día al startDate
      this.daysOfWeek.push(day)
    }
  }

  // Función para generar las celdas de la semana basadas en una fecha de referencia
  generateGridData(startDate: Date): void {
    // Calcula el inicio de la semana (domingo)
    const startOfWeek = new Date(startDate)
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
    this.indexDay = new Date(startDate) //día índice para encontrar la semana
    //obtiene el número de día del mes - el día de la semana 0 domingo, 1 lunes...
  
    this.fillDaysArray(startOfWeek)

    this.gridData = []
    const hoursInDay = 16 // Horas de 6 AM a 9 PM
    const startHour = 6
  
    for (let hour = 0; hour < hoursInDay; hour++) {
      for (let day = 0; day < 7; day++) {
        const cellDate = new Date(startOfWeek)
        cellDate.setDate(startOfWeek.getDate() + day); // Incrementa por día
        this.gridData.push({ day: cellDate, hour: startHour + hour })
      }
    }
  }

  hasEventAt(startDate:Date, dayCalendar: Date, hour: number): boolean {
    if(
      startDate.getFullYear() == dayCalendar.getFullYear() &&
      startDate.getMonth() == dayCalendar.getMonth() &&
      startDate.getDate() == dayCalendar.getDate() &&
      startDate.getHours() == hour
    )
      return true
    return false
  }

  getEventHeight(event: Event): number {
    const diffInMs = event.finish.getTime() - event.start.getTime() // Diferencia en milisegundos
    const diffInHours = diffInMs / (1000 * 60 * 60) // Convertir a horas
    return (diffInHours * 100) + (diffInHours - 1) * 3 // 3 es por el gap, 2 es para que no sea tan alto
  }

  isToday(day: Date): boolean {
    const aux = new Date()
    return aux.getDate() === day.getDate() && aux.getMonth() === day.getMonth() && 
    aux.getFullYear() == day.getFullYear()
  }

  generateWeekRange(): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const startDate = formatDate(this.daysOfWeek[0], 'dd', 'en-US')
    const endDate = formatDate(this.daysOfWeek[6], 'dd', 'en-US')
    const monthAbbreviation = months[this.daysOfWeek[6].getMonth()]

    return `${startDate} - ${endDate} ${monthAbbreviation}, ${this.daysOfWeek[6].getFullYear()}`
  }

  changeWeek(i : 'next'|'prev'): void {
    if(i == 'next')
      this.generateGridData(new Date(this.indexDay.getFullYear(), this.indexDay.getMonth(), this.indexDay.getDate() + 7))
    else if (i == 'prev')
      this.generateGridData(new Date(this.indexDay.getFullYear(), this.indexDay.getMonth(), this.indexDay.getDate() - 7))
  }

  ngOnInit(): void {
    this.generateGridData(this.indexDay)
  }

}
