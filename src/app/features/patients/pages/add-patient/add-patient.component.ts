import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  firstStep!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  aux(){
    console.log('se envio')
  }

  ngOnInit(): void {
    this.firstStep = this.formBuilder.group({
      names: ['', Validators.required],
      lastNames: ['', Validators.required],
      dateOfBirth: [new Date(), Validators.required],  // Asumiendo que el date picker devuelve un Date
      age: [, [Validators.required, Validators.min(0), Validators.max(120)]],  // Puedes ajustar los límites según lo que necesites
      gender: ['', Validators.required],
      notes: ['']
    });
  }

}