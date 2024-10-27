import { Component, Input, OnInit } from '@angular/core';

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
