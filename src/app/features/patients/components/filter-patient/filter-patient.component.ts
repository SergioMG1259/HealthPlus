import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilterPatientService } from '../../services/filter-patient.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter-patient',
  templateUrl: './filter-patient.component.html',
  styleUrls: ['./filter-patient.component.css']
})
export class FilterPatientComponent implements OnInit, OnDestroy {

  gender = this._formBuilder.group({
    female: false,
    male: false
  });

  // minWeight:number|null = null
  // maxWeight:number|null = null
  // minHeight:number|null = null
  // maxHeight:number|null = null
  minAge:number|null = null
  maxAge:number|null = null

  private _queryParamsSubscription!: Subscription

  constructor(private _filterService:FilterPatientService, private _formBuilder:FormBuilder, 
    private router:Router, private route:ActivatedRoute) { }

  onClickCloseFilter() {
    this.applyFilters()
    this._filterService.closeFilter()
  }

  applyFilters(): void {
    
    // Obtener los valores de los checkboxes desde el FormGroup
    const female = this.gender.get('female')!.value
    const male = this.gender.get('male')!.value

    const queryParams: any = {
      // minHeight: this.minHeight,
      // maxHeight: this.maxHeight,
      // minWeight: this.minWeight,
      // maxWeight: this.maxWeight,
      minAge: this.minAge,
      maxAge: this.maxAge,
      page: null
    }

    // Solo agregar a la URL si es true
    female? queryParams['female'] = true: queryParams['female'] = null
    male? queryParams['male'] = true: queryParams['male'] = null

    // Establecer los parámetros de la URL con los filtros actuales
    this.router.navigate([], {
      queryParams: queryParams,
      queryParamsHandling: 'merge', // Mantener otros parámetros de la URL
    });
  }

  onClickResetFilters(): void {
    this.gender.patchValue({
      female: null, // Convertir el string a booleano
      male: null
    })
    // this.minHeight = null
    // this.maxHeight = null
    // this.minWeight = null
    // this.maxWeight = null
    this.minAge = null
    this.maxAge = null

    // Navega a la misma ruta pero sin los parámetros de consulta
    // this.router.navigate([], {
    //   queryParams: {}, // Parametros vacíos
    // });
  }

  ngOnInit(): void {
    
    this._queryParamsSubscription = this.route.queryParams.subscribe(params => {

      // Inicializar los checkboxes con los valores de los parámetros
      this.gender.patchValue({
        female: params['female'] === 'true', // Convertir el string a booleano
        male: params['male'] === 'true'
      })

      // Obtener los parámetros de la URL al inicializar el componente, (+) es para convertirlo a número
      // this.minHeight = params['minHeight'] ? +params['minHeight'] : null
      // this.maxHeight = params['maxHeight'] ? +params['maxHeight'] : null
      // this.minWeight = params['minWeight'] ? +params['minWeight'] : null
      // this.maxWeight = params['maxWeight'] ? +params['maxWeight'] : null
      this.minAge = params['minAge'] ? +params['minAge'] : null
      this.maxAge = params['maxAge'] ? +params['maxAge'] : null
    })

  }

  ngOnDestroy(): void {
    this._queryParamsSubscription.unsubscribe()
  }
}
