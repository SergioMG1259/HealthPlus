import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {

  private _title:string = ''
  @ViewChild(TemplateRef, { static: true }) content!: TemplateRef<any>

  @Input()
  set title(title:string) {
    this._title = title
  }
  get title() {return this._title}

  constructor() { }

  ngOnInit(): void {
  }

}
