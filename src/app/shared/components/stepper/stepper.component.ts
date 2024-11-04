import { Component, ContentChildren, EventEmitter, OnInit, Output, QueryList } from '@angular/core';
import { StepComponent } from '../step/step.component';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {

  @ContentChildren(StepComponent) steps!: QueryList<StepComponent>
  @Output() stepperCompleted = new EventEmitter<void>()
  // currentStep!: StepComponent | undefined
  indexCurrent:number = 0

  constructor() { }

  // onNextStep(index: number) {
  //   // Verifica que el índice actual sea el correcto antes de avanzar
  //   if (index === this.indexCurrent && this.indexCurrent < this.steps.length - 1) {
  //     this.steps.toArray()[this.indexCurrent].status = 'successful';
  //     this.indexCurrent++;
  //     this.steps.toArray()[this.indexCurrent].status = 'current';
  //     // Aquí puedes actualizar el estado de los pasos (opcional)
  //   }
  // }


  onClickNextStep() {
    if (this.indexCurrent < this.steps.length - 1) {
      this.steps.toArray()[this.indexCurrent].status = 'successful';
      this.indexCurrent++;
      this.steps.toArray()[this.indexCurrent].status = 'current';
    }
  }

  onClickPrevStep() {
    if (this.indexCurrent > 0) {
      this.steps.toArray()[this.indexCurrent].status = 'pending';
      this.indexCurrent--;
      this.steps.toArray()[this.indexCurrent].status = 'current';
    }
  }

  nextDisabled() {
    if (this.indexCurrent == this.steps.length - 1) 
      return true
    if (!this.steps.toArray()[this.indexCurrent].completed)
      return true
    return false
  }

  completeDisabled() {
    if(!this.steps.toArray()[this.indexCurrent].completed)
      return true
    return false
  }

  emitStepperCompleted() {
    this.stepperCompleted.emit(); // Emitir evento al hacer clic en el botón
  }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    // Busca el paso con estado 'current' después de cargar los hijos
    const index = this.steps.toArray().findIndex(step => step.status === 'current')
    this.indexCurrent =  index == -1? 0 : index
    this.steps.toArray()[this.indexCurrent].status = 'current';

    // this.steps.forEach((step, index) => {
    //   // Suscribirse al evento `next` de cada `StepComponent`
    //   step.next.subscribe(() => this.onNextStep(index));
    // });
  }

}
