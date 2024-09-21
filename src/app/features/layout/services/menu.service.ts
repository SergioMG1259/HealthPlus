import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private _menuSubject = new BehaviorSubject<boolean>(false);
  menuObservable$ = this._menuSubject.asObservable()
  
  constructor() { }

  openMenu() {
    this._menuSubject.next(true)
  }

  closeMenu() {
    this._menuSubject.next(false)
  }
}
