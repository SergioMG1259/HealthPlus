import { Component, Inject, OnInit } from '@angular/core';
import { DIALOG_DATA } from 'src/app/core/models/dialogData';
import { DialogService } from 'src/app/core/services/dialog.service';

@Component({
  selector: 'app-dialog-delete-patient',
  templateUrl: './dialog-delete-patient.component.html',
  styleUrls: ['./dialog-delete-patient.component.css']
})
export class DialogDeletePatientComponent implements OnInit {

  constructor(@Inject(DIALOG_DATA) public data: any, private dialogService: DialogService) { }

  close() {
    this.dialogService.close("hola")
  }

  ngOnInit(): void {
  }

}
