import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  expandedIndex:number|null = null
  allergiesForm!: FormGroup

  showOtherInput:boolean = false

  constructor(private formBuilder: FormBuilder) { }

  expandRow(index: number) {
    if(this.expandedIndex == index)
      this.expandedIndex = null
    else
      this.expandedIndex = index
  }

  // Getter para el FormArray
  get additionalAllergies(): FormArray {
    return this.allergiesForm.get('additionalAllergies') as FormArray
  }
    
  // Método para agregar un nuevo control de alergia adicional
  addAdditionalAllergy(): void {
    this.additionalAllergies.push(this.formBuilder.control('', Validators.required))
  }
  
  // Método para manejar el cambio del checkbox "Other"
  onOtherCheckboxChange(): void {
    // Verifica si el checkbox "other" está marcado antes de agregar el input
    const isOtherChecked = this.allergiesForm.get('allergies')!.get('other')?.value
    this.showOtherInput = isOtherChecked
  
    if (isOtherChecked)
      this.addAdditionalAllergy()
    else 
      this.additionalAllergies.clear()
      
  }
  
  // Método para eliminar un control de alergia adicional por índice
  removeAdditionalAllergy(index: number): void {
    this.additionalAllergies.removeAt(index)
  }

  ngOnInit(): void {
    this.allergiesForm = this.formBuilder.group({
      allergies: this.formBuilder.group({
        penicillin: [true],
        aspirin: [false],
        sulfonamides: [true],
        nsaids: [false],
        opioids: [false],
        cephalosporins: [false],
        tetracyclines: [false],
        other: [false]
      }),
      additionalAllergies: this.formBuilder.array([])
    })
  }

}
