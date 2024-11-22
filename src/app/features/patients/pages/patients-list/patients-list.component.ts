import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FilterPatientService } from '../../services/filter-patient.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/core/services/dialog.service';
import { DialogDeletePatientComponent } from '../../components/dialog-delete-patient/dialog-delete-patient.component';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit, AfterViewInit, OnDestroy {

  inputSearch:string|null = null
  orderBy:string = 'default'
  page:number = 1

  redirection:string|null = null

  @ViewChild('overlayButton', {read: ElementRef}) private _button!: ElementRef;

  private _filterResizeSub!:Subscription
  private _queryParamsSubscription!: Subscription
  
  constructor(private _filterService:FilterPatientService, public breakpointObserver: BreakpointObserver,
    private router:Router,private route:ActivatedRoute, private dialogService: DialogService) { }
  
  onClickSearch() {
    this.inputSearch == ''? this.inputSearch = null : this.inputSearch

    const queryParams: any = {
      search: this.inputSearch,
      page: null
    }

    this.router.navigate([], {
        queryParams: queryParams,
        queryParamsHandling: 'merge',
    });
  }

  openFilter() {
    if (this._filterService.panelOpen == false) {
      this._filterService.openFilter(this._button)
    }else {
      this._filterService.closeFilter()
    }
  }

  changePage(page:number) {
    const queryParams: any = {}
    this.page = page

    if(this.page == 1)
      queryParams['page'] = null
    else
      queryParams['page'] = this.page

    this.router.navigate([], {
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  changeOrderBy(orderBy:string) {
    const queryParams: any = {}
    this.orderBy = orderBy
    if(this.orderBy == "default")
      queryParams['orderby'] = null
    else
      queryParams['orderby'] = this.orderBy
  
    queryParams['page'] = null //Reiniciar páginas

    this.router.navigate([], {
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  onClickGoToAddPatient() {
    this.router.navigate(['/patients/add'])
  }

  onClickOpenDialogDeletePatient(id?:number) {
    const dialogRef = this.dialogService.open(DialogDeletePatientComponent,{data: { id: id}})
    dialogRef.subscribe(result => {
      console.log(result)
      if (result) {
        console.log('Dialog closed with result:', result);
      } else {
        console.log('Dialog closed without result');
      }
    })
  }

  redirections(value: string, id?:number) {
    this.redirection = value
    if(this.redirection == 'details')
      this.onClickGoToDetailsPatient()
    else if (this.redirection == 'delete')
      this.onClickOpenDialogDeletePatient(id)
    this.redirection = null
  }

  onClickGoToDetailsPatient() {
    this.router.navigate(['/patients/details']) // Cambia '/ruta-destino' por la ruta deseada
  }
  
  ngOnInit(): void {
    this._queryParamsSubscription = this.route.queryParams.subscribe(params => {

      this.inputSearch = params['search']? params['search'] : null
      this.page = params['page']? +params['page'] : 1
      this.orderBy = params['orderby']? params['orderby'] : 'default' 
      
    })
  }

  ngAfterViewInit(): void {
    this._filterResizeSub = this.breakpointObserver.observe(['(max-width: 600px)']).subscribe((state: BreakpointState) => {
      this._filterService.handleScreenResize();
    });
  }

  ngOnDestroy(): void {
    if(this._queryParamsSubscription)
      this._queryParamsSubscription.unsubscribe()

    if(this._filterResizeSub)
      this._filterResizeSub.unsubscribe()
  }
}
