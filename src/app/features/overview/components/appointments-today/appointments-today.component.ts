import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointments-today',
  templateUrl: './appointments-today.component.html',
  styleUrls: ['./appointments-today.component.css']
})
export class AppointmentsTodayComponent implements OnInit {

  today = formatDate(new Date(),'dd', 'en-US');
  weekDays: { letter: string; date: string }[] = [];
  currentWeekRange: string = '';

  constructor() { this.getWeekDays() }

  getWeekDays(): void {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = domingo, 1 = lunes, ..., 6 = sábado
    const saturdayOffset = (dayOfWeek + 1) % 7; //sábado probar quitar el módulo
    // calcular cuántos días debes retroceder desde el día actual (today) para llegar al último sábado.

    const lastSaturday = new Date(today);
    lastSaturday.setDate(today.getDate() - saturdayOffset);
    // se generan los días de la semana
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(lastSaturday); // se clona el sábado
      currentDay.setDate(lastSaturday.getDate() + (i > 0 ? i+1 : 0)); // no se cuenta el domingo
      const formattedDate = formatDate(currentDay, 'dd', 'en-US');

      this.weekDays.push({
        letter: ['S', 'M', 'T', 'W', 'T', 'F', 'S'][i],//i se utiliza como índice para acceder a la letra correspondiente en el arreglo de letras de días.
        date: formattedDate
      });
    }

    //para rango de la semana
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const startDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - saturdayOffset), 'dd', 'en-US');
    const endDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - saturdayOffset + 7), 'dd', 'en-US');
    const monthAbbreviation = months[today.getMonth()]; // Obtiene la abreviatura del mes actual
  
    this.currentWeekRange = `${startDate} - ${endDate} ${monthAbbreviation}, ${today.getFullYear()}`;
  }

  ngOnInit(): void {
  }

}
