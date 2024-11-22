import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/core/services/dialog.service';

@Component({
  selector: 'app-dialog-edit-medical-information',
  templateUrl: './dialog-edit-medical-information.component.html',
  styleUrls: ['./dialog-edit-medical-information.component.css']
})
export class DialogEditMedicalInformationComponent implements OnInit {
  aux:string = ''
  constructor(private dialogService: DialogService) { }

  onClickSave() {
    this.dialogService.close("hola")
  }

  onClickCancel() {
    this.dialogService.close()
  }

  ngOnInit(): void {
  }

}
