import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

export class OptionChange<T = any> {
  constructor(public source:DropdownOptionComponent<T>) {}
}

@Component({
  selector: 'app-dropdown-option',
  templateUrl: './dropdown-option.component.html',
  styleUrls: ['./dropdown-option.component.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.dropdown-option-selected]': 'selected',
    '[class.dropdown-option-focused]': 'focused',
    '(click)': 'select()',
    'class':'dropdown-option-component',
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownOptionComponent <T = any> implements OnInit {
  private _selected = false
  private _active = false
  private _focus = false
  private _disabled = false

  @Input() value?: T
  @Input() type:string = 'select'

  @Output() readonly selectionEmit = new EventEmitter<OptionChange<T>>()

  constructor(private _elementRef:ElementRef) {}

  get selected() {
    return this._selected
  }

  get textContent() {
    return (this._elementRef.nativeElement.textContent || '').trim()
  }

  get focused() {
    return this._focus
  }

  setFocus(value:boolean) {
    this._focus = value
  }

  select() {
    if(!this._selected && this.type == 'select') {
      this._selected = true
      this._focus = true
      // this.selectionEmit.emit(new OptionChange<T>(this))
    }
    this.selectionEmit.emit(new OptionChange<T>(this))
  }

  deselect() {
    this._selected = false
  }

  ngOnInit(): void {
  }

}
