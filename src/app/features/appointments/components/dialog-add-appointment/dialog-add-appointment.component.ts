import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/core/services/dialog.service';

interface Patient {
  name: string
}

@Component({
  selector: 'app-dialog-add-appointment',
  templateUrl: './dialog-add-appointment.component.html',
  styleUrls: ['./dialog-add-appointment.component.css']
})
export class DialogAddAppointmentComponent implements OnInit {

  hours: number[] = []
  minDate: Date = new Date()

  startHour: number = 6
  finishHour: number = 7

  searching:boolean = false
  indexSelected: number|null = null

  patients:Patient[] = [{name:'Sergio Guanilo'}, {name:'Sergio Gonzales'}, 
    {name: 'Sergio Ruiz'}, {name: 'Sergio Lopez'}, {name: 'Sergio Martin'}]
  patientSelected: Patient|null = null

  constructor(private cdr: ChangeDetectorRef, private dialogService: DialogService) { 
    for (let i = 6; i <= 21; i++) {
      this.hours.push(i)
    }
  }

  onClickSearch() {
    this.searching = true
  }

  onClickSelectPatient(patient: Patient, index: number) {
    this.patientSelected = patient
    this.indexSelected = index
  }

  onClickCancel() {
    this.dialogService.close()
  }

  onClickSave() {
    this.dialogService.close("hola")
  }

  ngOnInit(): void {
    this.cdr.detectChanges()
  }
}
