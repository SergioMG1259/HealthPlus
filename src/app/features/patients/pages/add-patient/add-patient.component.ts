import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  firstStep!: FormGroup
  secondStep!: FormGroup
  allergiesForm!: FormGroup

  showOtherInput:boolean = false

  constructor(private formBuilder: FormBuilder) { }

  aux(){
    console.log('se envio')
  }

  // Método para saber si un campo es inválido y fue tocado
  isFieldInvalid(formGroup:FormGroup,field: string): boolean | undefined {
    return formGroup.get(field)?.invalid && formGroup.get(field)?.touched
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

    if (isOtherChecked) {
      this.addAdditionalAllergy()
    } else {
      this.additionalAllergies.clear()
    }
  }

  // Método para eliminar un control de alergia adicional por índice
  removeAdditionalAllergy(index: number): void {
    this.additionalAllergies.removeAt(index)
  }

  // Validación personalizada
  // additionalAllergiesValidator(): ValidatorFn {
  //   return (formGroup: AbstractControl): ValidationErrors | null => {
  //     // Si el array está vacío, la validación pasa
  //     if (this.additionalAllergies.length === 0) return null;

  //     // Si el array tiene controles, verifica que todos estén llenos
  //     const invalid = this.additionalAllergies.controls.some(control => control.invalid);
  //     return invalid ? { additionalAllergiesRequired: true } : null;
  //   };
  // }

  ngOnInit(): void {
    this.firstStep = this.formBuilder.group({
      names: ['', Validators.required],
      lastNames: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      age: [, [Validators.required, Validators.min(0), Validators.max(120)]],
      gender: ['', Validators.required],
      dni: ['', Validators.required],
      notes: ['']
    })

    this.secondStep = this.formBuilder.group({
      phone: ['', Validators.required],
      email: ['', Validators.required],
      adress1: ['', Validators.required],
      adress2: ['']
    })

    this.allergiesForm = this.formBuilder.group({
      allergies: this.formBuilder.group({
        penicillin: [false],
        aspirin: [false],
        sulfonamides: [false],
        nsaids: [false],
        opioids: [false],
        cephalosporins: [false],
        tetracyclines: [false],
        other: [false]
      }),
      additionalAllergies: this.formBuilder.array([])  // Aquí se almacenarán las alergias adicionales
    })
    // this.allergiesForm.setValidators(this.additionalAllergiesValidator());
  }

}