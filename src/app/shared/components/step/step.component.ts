import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';

export type StepStatus = 'successful' | 'current' | 'pending';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit {

  private _title: string = ''
  private _status: StepStatus = 'pending'
  private _completed: boolean = true
  // @ViewChild('focusTrap', { static: false }) focusTrap!: ElementRef;

  @Output() next = new EventEmitter<void>();
  @ViewChild(TemplateRef, { static: true }) content!: TemplateRef<any>
  // onNext() {
  //   this.next.emit(); // Emite el evento cuando el botón es presionado
  //   this.focusFirstElement()
  // }
  // focusFirstElement() {
  //   // Establece el foco en el señuelo para evitar el salto fuera del stepper
  //   this.focusTrap.nativeElement.focus();
  //   console.log(this.focusTrap)
  // }
  constructor() { }

  @Input()
  set title(title:string) {
    this._title = title
  }
  get title() {return this._title}

  @Input()
  set status(status:StepStatus) {
    this._status = status
  }
  get status() {return this._status}

  @Input()
  set completed(completed:boolean) {
    this._completed = completed
  }
  get completed() {return this._completed}

  ngOnInit(): void {
  }

}
