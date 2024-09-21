import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Subscription } from 'rxjs';

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

  constructor(private menuService:MenuService) { }

  onClickCloseMenu() {
    this.menuService.closeMenu()
  }

  ngOnInit(): void {
    this._menuServiceSub = this.menuService.menuObservable$.subscribe(
      (isMenuOpen)=>{this.isMenuResponsiveOpen = isMenuOpen}
    )
  }

  ngOnDestroy():void {
    if(this._menuServiceSub) {
      this._menuServiceSub.unsubscribe()
    }
  }

}
