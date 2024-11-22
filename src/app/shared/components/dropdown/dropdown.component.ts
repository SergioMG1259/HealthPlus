import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, HostBinding, Input, NgZone, OnDestroy, OnInit, Output, QueryList, SimpleChanges, ViewChild } from '@angular/core';
import {ConnectedPosition, ScrollStrategyOptions, ViewportRuler} from '@angular/cdk/overlay'
import {ViewEncapsulation} from '@angular/core';
import { Observable, Subject, defer, merge, startWith, switchMap, take, takeUntil } from 'rxjs';
import { DropdownOptionComponent, OptionChange } from '../dropdown-option/dropdown-option.component';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'dropdown-component',
    '[class.dropdown-component-open]': '_isOpen',
    '[attr.tabindex]': '0',
    '(keydown)':"_handleKeydown($event)",
    '[attr.role]' : 'combobox',
    // '[attr.aria-expanded]' : '_isOpen',
    '[attr.aria-haspopup]' : 'listbox',
    '[attr.aria-controls]' : 'panelId'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent implements OnInit, AfterContentInit, OnDestroy {
  @ContentChildren(DropdownOptionComponent) options?:QueryList<DropdownOptionComponent>
  @ViewChild('trigger') trigger!: ElementRef
  @Input() placeholder:string = ''
  @Input() type: string = 'select'
  @Input() value:any
  @Output() valueChange:EventEmitter<any> = new EventEmitter<any>()

  private _isOpen:boolean = false
  private _selectedOption:DropdownOptionComponent|null = null
  selectedOptionText:string|null = null
  protected readonly destroy = new Subject<void>()
  widthOptionsList:number = 80
  focusedOptionIndex:number = 0

  get _positions(): ConnectedPosition[] {
    let positions: ConnectedPosition[] = [
      {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
      },
      {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'bottom',
      }
    ]

    if (this.type != 'select'){
      positions[0].originX = 'end'
      positions[0].overlayX = 'end'
    }

    return positions
  }

  @HostBinding("class") get hostClass(): string {
    return this.type == 'select' ? "border" : "";
  }

  readonly optionSelectionChanges: Observable<OptionChange> = defer(() => {
    const options = this.options;
    if (options) {
      return options.changes.pipe(
        startWith(options),  //cambia el option por el selectionEmit(event emitter) de cada option
        switchMap(() => merge(...options.map(option => option.selectionEmit))),
        //merge combina varios observables en uno solo, asi que combina todos los selectionEmit en uno solo
      );
    }
    return this._ngZone.onStable.pipe(//si options es undefined, devuelve un observable que espera a que Angular este estable
      take(1),//toma solo la primera emisión de este observable
      switchMap(() => this.optionSelectionChanges),//se vuelve a suscribir a optionSelectionChanges
    );
  }) as Observable<OptionChange>

  constructor(protected viewportRuler: ViewportRuler,protected changeDetectorRef: ChangeDetectorRef, 
    private scrollStrategyOptions: ScrollStrategyOptions,private _ngZone:NgZone, private elementRef: ElementRef) { }

  toggle() {
    this._isOpen? this.close() : this.open()
  }

  @ViewChild('prueba') myInput!: ElementRef;
  open() {
    this._isOpen = true
    if (this.type == 'select') {
      this.widthOptionsList = this.trigger.nativeElement.getBoundingClientRect().width
      this.focusedOptionIndex = this.findFocus()//encuentra el indice del elemento seleccionado y le da el foco
      this.options?.get(this.focusedOptionIndex)!.setFocus(true)
    } else {
      this.options?.get(0)!.setFocus(true)
    }
    
    this.changeDetectorRef.markForCheck()
  }
  onOverlayAttached(): void {

    // setTimeout(() => {
    //   if (this.myInput) {
    //     this.myInput.nativeElement.focus();
    //     console.log(this.myInput);
    //     console.log('Elemento actualmente enfocado:', document.activeElement)
    //   }
    // })
  }

  close() {
    if (this._isOpen) {
      this._isOpen = false
      this.options!.get(this.focusedOptionIndex)!.setFocus(false)//al ultimo elemento donde estuvo el foco se lo quita
      // this.elementRef.nativeElement.focus()
      this.changeDetectorRef.markForCheck()
    }
  }

  get panelOpen(): boolean {
    return this._isOpen;
  }

  get scrollStrategy() {
    return this.scrollStrategyOptions.reposition();
  }

  selectOption(option:DropdownOptionComponent) {

    if (this._selectedOption && option !== this._selectedOption) {
      this._selectedOption.deselect()
      this._selectedOption.setFocus(false)
    }

    this._selectedOption = option
    this.selectedOptionText = this._selectedOption.textContent
    this.value = this._selectedOption.value
    this.valueChange.emit(this.value)
    this.close()
  }

  initSelectOption() {
    const matchedOption = this.options?.find((option) => {return option.value === this.value})
    if (matchedOption) {
      matchedOption.select() //emite el evento
      this.changeDetectorRef.markForCheck()
    }
  }

  findFocus():number {
    //si no encuentra coindicencia, incluso si es null, regresa el primer elemento
    const index = this.options!.toArray().findIndex((option) => option.value === this._selectedOption?.value);
    return index == -1 ? 0 : index;
  }

  _handleKeydown(event: KeyboardEvent) {
    this.panelOpen? this._handleKeydownOpen(event):this._handleKeydownClosed(event)
  }

  _handleKeydownClosed(event: KeyboardEvent) {
    if(event.key == 'Enter' || event.key == 'space'){
      event.preventDefault()
      this.open()
    }
  }

  _handleKeydownOpen(event: KeyboardEvent) {
    if(event.key == 'Escape' || event.key=='Tab'){
      event.preventDefault()
      this.close()
    }
    if(event.key == 'ArrowDown') {
      event.preventDefault()
      this.focusNextOption()
    }
    if (event.key == 'ArrowUp') {
      event.preventDefault()
      this.focusPrevOption()
    }
    if(event.key == 'Enter') {
      event.preventDefault()
      this.options?.get(this.focusedOptionIndex)!.select()
    }
  }

  focusPrevOption() {
    if (this.options && this.focusedOptionIndex > 0){
      this.options.toArray()[this.focusedOptionIndex].setFocus(false)
      this.focusedOptionIndex--;
      this.options.toArray()[this.focusedOptionIndex].setFocus(true)
    }
  }

  focusNextOption() {
    if (this.options && this.focusedOptionIndex < this.options.length - 1) {
      this.options.toArray()[this.focusedOptionIndex].setFocus(false)
      this.focusedOptionIndex++;
      this.options.toArray()[this.focusedOptionIndex].setFocus(true)
    }
  }

  ngOnInit(): void {
    //esto es cuando el elemento trigger cambia su tamaño, como un flex por ejemplo
    this.viewportRuler
    .change()
    .pipe(takeUntil(this.destroy))
    .subscribe(() => {
      if (this._isOpen) {
        if (this.type == 'select')
          this.widthOptionsList = this.trigger.nativeElement.getBoundingClientRect().width
        this.changeDetectorRef.markForCheck()
      }
    })
  }
  
  ngAfterContentInit() {
    this.optionSelectionChanges
      .pipe(takeUntil(this.destroy))
      .subscribe(selectedOption=>{this.selectOption(selectedOption.source)})

    if(this.options){
      this.initSelectOption()
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['value'])
      this.initSelectOption()
  }

  ngOnDestroy():void {
    this.destroy.next();
    this.destroy.complete();
  }

}