import { Component, OnInit } from '@angular/core';

interface Patient {
  name: string
}
@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent implements OnInit {

  searching:boolean = false
  indexSelected: number|null = null
  patients:Patient[] = [{name:'Sergio Guanilo'}, {name:'Sergio Gonzales'}, {name: 'Sergio Ruiz'}]
  patientSelected: Patient| null = null
  percent:number | null = null

  constructor() { }

  onClickSearch() {
    this.searching = true
  }

  onClickSelectPatient(patient: Patient, index: number) {
    this.patientSelected = patient
    this.indexSelected = index
  }

  getClassPercent(): string {
    if(this.percent && this.percent >= 0 && this.percent <= 20)
      return 'low-text'
    else if (this.percent && this.percent > 20 && this.percent <= 50)
      return 'moderate-text'
    else if (this.percent && this.percent > 50 && this.percent <= 80)
      return 'height-text'
    else (this.percent && this.percent > 80 && this.percent <= 100)
      return 'ver-height-text'
  }

  ngOnInit(): void {
  }

}
