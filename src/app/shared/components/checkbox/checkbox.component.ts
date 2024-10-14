import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ]
})
export class CheckboxComponent implements OnInit {

  // value:boolean = false
  // @Input() value:boolean = false
  // @Input() colorCode:string|null = null
  // @Output() valueChange = new EventEmitter<boolean>()
  // @Output() changeEvent = new EventEmitter<void>();

  // constructor() { }

  // onClick() { this.valueChange.emit(!this.value) }

  // onCheckboxChange() {
  //   this.changeEvent.emit();
  // }

  // getCheckboxStyles() {
  //   let style = {}
  //   if (this.colorCode) {
  //     if(this.colorCode == '#FFFFFF') {
  //       style = {
  //         'background-color': this.colorCode,
  //         'border-color': '#000000'
  //       }
  //     }
  //     else {
  //       style = {
  //         'background-color': this.colorCode,
  //         'border-color': this.colorCode
  //       }
  //     }
  //     return style
  //   }
  //   return {};
  // }

  // ngOnInit(): void {
  // }

  @Input() colorCode: string | null = null;
  @Output() changeEvent = new EventEmitter<void>();

  // El valor actual del checkbox (vinculado a ngModel)
  value: boolean = false;

  // Funciones de callback para ControlValueAccessor
  onChange: (value: boolean) => void = () => {};
  onTouched: () => void = () => {};

  constructor() { }

  onClick() {
    this.value = !this.value;  // Invertimos el valor del checkbox
    this.onChange(this.value);  // Notificamos el cambio al sistema de formularios
  }

  onCheckboxChange() {
    this.changeEvent.emit();  // Emitimos el evento personalizado
  }

  getCheckboxStyles() {
    let style = {};
    if (this.colorCode) {
      if (this.colorCode == '#FFFFFF') {
        style = {
          'background-color': this.colorCode,
          'border-color': '#000000',
        };
      } else {
        style = {
          'background-color': this.colorCode,
          'border-color': this.colorCode,
        };
      }
      return style;
    }
    return {};
  }

  // Métodos para ControlValueAccessor
  writeValue(value: boolean): void {
    this.value = value;  // Actualizamos el valor del checkbox
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;  // Registramos el callback para notificar cambios
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;  // Registramos el callback para cuando el campo es "tocado"
  }

  ngOnInit(): void {
    
  }
}
