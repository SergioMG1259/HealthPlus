import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Subscription } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'side-bar-component',
    '[class.side-bar-component-open]': 'isMenuResponsiveOpen',
  }
})
export class SideBarComponent implements OnInit {

  isMenuResponsiveOpen:boolean = false
  private _menuServiceSub!:Subscription
  private _resizeSub!:Subscription

  constructor(private menuService:MenuService,public breakpointObserver: BreakpointObserver) { }

  onClickCloseMenu() {
    this.menuService.closeMenu()
  }

  ngOnInit(): void {
    this._menuServiceSub = this.menuService.menuObservable$.subscribe(
      (isMenuOpen)=>{this.isMenuResponsiveOpen = isMenuOpen}
    )
    this._resizeSub = this.breakpointObserver.observe(['(min-width: 600px)']).subscribe((state: BreakpointState) => {
      if(state.matches) {
        this.isMenuResponsiveOpen = false
      }
  });  
  }

  ngOnDestroy():void {
    if(this._menuServiceSub) {
      this._menuServiceSub.unsubscribe()
    }
    if (this._resizeSub) {
      this._resizeSub.unsubscribe()
    }
  }

}
