import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  value:Date | null = null
  cadena:string = this.getDateAsString(this.value)

  constructor() { }

  getDateAsString(date: Date | null): string {
    if (!date) {
      return ''
    }
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    
    return `${day}/${month}/${year}`
  }

  onInput(event: Event): void {
    const input = (event.target as HTMLInputElement)
    const value = input.value.replace(/\D/g, '') // Remover caracteres no numéricos

    // Detectar si el usuario está borrando para manejar el formato correctamente
    if (input.value.length < 10 && input.value.endsWith('/')) {
      input.value = input.value.slice(0, -1) // Eliminar la barra si es lo último que queda
    } else {
      // Formatear la fecha al escribir
      const formattedValue = this.formatDate(value)
      input.value = formattedValue
    }
  }
  onBlur(event: Event): void {
    const input = (event.target as HTMLInputElement)
    const value = input.value

    // Verificar si la fecha es válida
    if (value.length === 10) {
      const [day, month, year] = value.split('/').map(Number);
      if (!this.isValidDate(day, month, year)) {
        input.value = '' // Borrar el valor si la fecha es inválida
        this.cadena = ''
        this.value = null
      } else {
        this.value = new Date(year,month - 1, day)
        console.log(new Date(year,month - 1, day))
      }
    } else {
      // Si la fecha está incompleta, también borrar el valor
      input.value = ''
      this.cadena = ''
      this.value = null
    }
  }

  private formatDate(value: string): string {
    let result = '';

    // Agregar la parte de día
    if (value.length >= 2) {
      result += value.substring(0, 2) + '/'
    } else if (value.length === 1) {
      result += value.substring(0, 1)
    }

    // Agregar la parte de mes
    if (value.length >= 4) {
      result += value.substring(2, 4) + '/'
    } else if (value.length >= 3) {
      result += value.substring(2, 3)
    }

    // Agregar la parte de año
    if (value.length >= 6) {
      result += value.substring(4, 8)
    } else if (value.length >= 5) {
      result += value.substring(4, 5)
    }

    return result
  }

  // Función para validar si la fecha es correcta
  private isValidDate(day: number, month: number, year: number): boolean {
    const daysInMonth = [31, this.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    // Validar mes
    if (month < 1 || month > 12) {
      return false
    }

    // Validar día según el mes
    if (day < 1 || day > daysInMonth[month - 1]) {
      return false
    }

    return true
  }

  // Función para verificar si un año es bisiesto
  private isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  }

  ngOnInit(): void {
  }

}
