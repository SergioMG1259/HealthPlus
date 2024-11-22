import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/core/services/dialog.service';

@Component({
  selector: 'app-dialog-edit-basic-information',
  templateUrl: './dialog-edit-basic-information.component.html',
  styleUrls: ['./dialog-edit-basic-information.component.css']
})
export class DialogEditBasicInformationComponent implements OnInit {

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
