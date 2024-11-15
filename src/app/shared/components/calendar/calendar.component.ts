import { Component, ElementRef, forwardRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

interface Day {
  date: Date;
  isOtherMonth: boolean;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarComponent),
      multi: true,
    },
  ], 
})
export class CalendarComponent implements OnInit {

  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  indexMonth!:number
  years: number[] = []
  indexYear!:number

  value: Date | null = null // Fecha inicial
  days: Day[] = []
  monthDateCurrent:Date = new Date()
  indexFocus:number = 0
  
  @ViewChildren('dayButton') dayButtons!: QueryList<ElementRef>
  @Input() minYear:number = new Date().getFullYear() - 100
  @Input() maxYear:number = new Date().getFullYear() + 5

  onChange: (value: Date) => void = () => {};
  onTouched: () => void = () => {};

  constructor() { }

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
    this.days = []
    while (current <= endDay) {
      const isOtherMonth = current.getMonth() !== month
      this.days.push({
        date: new Date(current),
        isOtherMonth: isOtherMonth,
      })
      current.setDate(current.getDate() + 1) // Pasar al siguiente día
    }
  }

  // setFocusToCurrentDay() {
  //   const dayIndex = this.days.findIndex((day) => this.isActive(day))
  //   if (dayIndex !== -1) {
  //     this.indexFocus = dayIndex
  //   }
  // }

  selectDay(day: Date) {
    this.value = new Date(day.getFullYear(),day.getMonth(), day.getDate())
    this.onChange(this.value);
  }

  isActive(day: Day): boolean {
    if (!this.value) {
      return false
    }

    return this.value.getDate() === day.date.getDate() && this.value.getMonth() === day.date.getMonth() && 
            this.value.getFullYear() == day.date.getFullYear() && !day.isOtherMonth
  }

  isToday(day: Day):boolean {
    const aux = new Date()
    return aux.getDate() === day.date.getDate() && aux.getMonth() === day.date.getMonth() && 
    aux.getFullYear() == day.date.getFullYear() && !day.isOtherMonth
  }

  handleKeyDown(event: KeyboardEvent, index: number,day:Date) {
    let newIndex = index

    if (event.key === 'Tab') {
      return // Permitir el comportamiento natural de la tecla Tab
    }

    if (event.key === 'Enter'){
      return
    }
    
    if (event.key === 'ArrowRight') {
      newIndex = index + 1
    } else if (event.key === 'ArrowLeft') {
      newIndex = index - 1
    } else if (event.key === 'ArrowDown') {
      newIndex = index + 7
    } else if (event.key === 'ArrowUp') {
      newIndex = index - 7
    }

    this.focusDay(newIndex)
    event.preventDefault()
  }

  focusDay(index: number) {
    const buttons = document.querySelectorAll('.grid button');

    // // Asegurarse de que el índice está dentro del rango
    // while (index >= 0 && index < buttons.length) {
    //   const button = buttons[index] as HTMLElement;
    //   const isOtherMonth = button.classList.contains('other-month');

    //   if (!isOtherMonth) {
    //     button.focus();
    //     break;
    //   }
      
    //   // Mover el índice en dirección positiva o negativa según las flechas
    //   index += (index > buttons.length / 2 ? -1 : 1);// Esto es por si el indice cae en un día de otro mes
    // }
    let button
    let isOtherMonth
    if (index >= 0 && index < buttons.length) {

      button = buttons[index] as HTMLElement
      isOtherMonth = button.classList.contains('other-month')

      if (!isOtherMonth) {
        this.indexFocus = index
        button.focus()
      }
      if(index > buttons.length / 2 && isOtherMonth) {
        this.fillCalendar(new Date(this.monthDateCurrent.getFullYear(), this.monthDateCurrent.getMonth() + 1, 1))
        this.setFocusToDayInNewMonth()
      } else if (index < buttons.length / 2 && isOtherMonth) {
        this.fillCalendar(new Date(this.monthDateCurrent.getFullYear(), this.monthDateCurrent.getMonth() - 1, 1))
        this.setFocusToDayInNewMonth()
      }

    } else if (index >= buttons.length) {
      this.fillCalendar(new Date(this.monthDateCurrent.getFullYear(), this.monthDateCurrent.getMonth() + 1, 1))
      this.setFocusToDayInNewMonth()
    } else if (index < 0) {
      this.fillCalendar(new Date(this.monthDateCurrent.getFullYear(), this.monthDateCurrent.getMonth() - 1, 1))
      this.setFocusToDayInNewMonth()
    }
  }

  findFirstCurrentMonthIndex() {
    const firstCurrentMonthIndex = this.days.findIndex(day => !day.isOtherMonth)
    //encuentra le indice del primer día del mes actual, ya que a veces, las primeras celdas corresponden a los
    //últimos días del mes anterior
    if (firstCurrentMonthIndex !== -1) {
      this.indexFocus = firstCurrentMonthIndex
    }
  }

  setFocusToDayInNewMonth() {
    this.findFirstCurrentMonthIndex()
    // Usar setTimeout para asegurar que el enfoque se aplique después de que el DOM se haya actualizado
    setTimeout(() => {
      const buttonsArray = this.dayButtons.toArray();
      const button = buttonsArray[this.indexFocus]?.nativeElement; // Acceder a nativeElement

      // Verifica si button existe y es un elemento HTML
      if (button) {
          button.focus(); // Enfocar el botón correcto
      } else {
          console.error('Button not found', button);
        }
    });
  }

  onClickchangeMonth(i : 'next'|'prev') {
    if(i == 'next')
      this.fillCalendar(new Date(this.monthDateCurrent.getFullYear(), this.monthDateCurrent.getMonth() + 1, 1))
    else
      this.fillCalendar(new Date(this.monthDateCurrent.getFullYear(), this.monthDateCurrent.getMonth() - 1, 1))

    this.findFirstCurrentMonthIndex()
  }

  ngOnInit(): void {
    this.years = Array.from({ length: this.maxYear - this.minYear + 1 }, (_, i) =>this.maxYear - i)
    this.fillCalendar(this.value? this.value:new Date())
    // this.setFocusToCurrentDay()
  }

  monthChange(index:number) {
    this.fillCalendar(new Date(this.indexYear, index, 1))
  }

  yearChange(index:number) {
    this.fillCalendar(new Date(index, this.indexMonth, 1))
  }

  // Métodos para ControlValueAccessor
  writeValue(value: Date): void {
    this.value = value;  // Actualizamos el valor
    this.fillCalendar(this.value? this.value:new Date())
  }
  
  registerOnChange(fn: any): void {
    this.onChange = fn;  // Registramos el callback para notificar cambios
  }
  
  registerOnTouched(fn: any): void {
    this.onTouched = fn;  // Registramos el callback para cuando el campo es "tocado"
  }

}
