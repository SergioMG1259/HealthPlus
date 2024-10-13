import { Component, OnInit } from '@angular/core';
import { FilterPatientService } from '../../services/filter-patient.service';

@Component({
  selector: 'app-filter-patient',
  templateUrl: './filter-patient.component.html',
  styleUrls: ['./filter-patient.component.css']
})
export class FilterPatientComponent implements OnInit {

  constructor(private filterService:FilterPatientService) { }

  close() {
    this.filterService.closeFilter()
  }

  ngOnInit(): void {
  }

}
