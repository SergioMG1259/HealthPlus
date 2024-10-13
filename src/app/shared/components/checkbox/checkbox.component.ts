import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  // value:boolean = false
  @Input() value:boolean = false
  @Input() colorCode:string|null = null
  @Output() valueChange = new EventEmitter<boolean>()
  @Output() changeEvent = new EventEmitter<void>();

  constructor() { }

  onClick() { this.valueChange.emit(!this.value) }

  onCheckboxChange() {
    this.changeEvent.emit();
  }

  getCheckboxStyles() {
    let style = {}
    if (this.colorCode) {
      if(this.colorCode == '#FFFFFF') {
        style = {
          'background-color': this.colorCode,
          'border-color': '#000000'
        }
      }
      else {
        style = {
          'background-color': this.colorCode,
          'border-color': this.colorCode
        }
      }
      return style
    }
    return {};
  }

  ngOnInit(): void {
  }
}
