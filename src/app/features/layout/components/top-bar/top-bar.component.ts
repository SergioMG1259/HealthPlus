import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(private menuService:MenuService) { }

  onClickOpenMenu() {
    this.menuService.openMenu()
  }

  ngOnInit(): void {
  }

}
