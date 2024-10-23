import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FilterPatientService } from '../../services/filter-patient.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit, AfterViewInit, OnDestroy {

  inputSearch:string|null = null
  orderBy:string = 'default'
  page:number = 1

  @ViewChild('overlayButton', {read: ElementRef}) private _button!: ElementRef;

  private _filterResizeSub!:Subscription
  private _queryParamsSubscription!: Subscription
  
  constructor(private _filterService:FilterPatientService, public breakpointObserver: BreakpointObserver,
    private router:Router,private route:ActivatedRoute
  ) { }
  
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
    this.router.navigate(['/patients/add']);
  }
  
  ngOnInit(): void {
    this._queryParamsSubscription = this.route.queryParams.subscribe(params => {
      console.log(params)

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
