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
  
  constructor(private filterService:FilterPatientService, public breakpointObserver: BreakpointObserver) { }
  
  openFilter() {
    if (this.filterService.panelOpen == false) {
      this.filterService.openFilter(this._button)
    }else {
      this.filterService.closeFilter()
    }
  }
  
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.filterResizeSub = this.breakpointObserver.observe(['(max-width: 600px)']).subscribe((state: BreakpointState) => {
      this.filterService.handleScreenResize();
    });
  }
}
