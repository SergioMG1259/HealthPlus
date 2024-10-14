import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FilterPatientService } from '../../services/filter-patient.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit, AfterViewInit {

  aux:number = 3
  @ViewChild('overlayButton', {read: ElementRef}) private _button!: ElementRef;
  filterResizeSub!:Subscription
  
  constructor(private _filterService:FilterPatientService, public breakpointObserver: BreakpointObserver) { }
  
  openFilter() {
    if (this._filterService.panelOpen == false) {
      this._filterService.openFilter(this._button)
    }else {
      this._filterService.closeFilter()
    }
  }
  
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.filterResizeSub = this.breakpointObserver.observe(['(max-width: 600px)']).subscribe((state: BreakpointState) => {
      this._filterService.handleScreenResize();
    });
  }
}
