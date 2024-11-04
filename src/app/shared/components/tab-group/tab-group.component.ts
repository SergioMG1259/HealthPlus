import { ChangeDetectorRef, Component, ContentChildren, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.css'],
})
export class TabGroupComponent implements OnInit {

  selectedIndex:number = 0
  focusedIndex:number = this.selectedIndex
  indicatorWidth:number = 0
  indicatorLeft:number = 0
  animate:boolean = false

  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>
  @ViewChildren('box') boxes!: QueryList<ElementRef>

  constructor(private cdr: ChangeDetectorRef) {}

  selectTab(index: number) {
    this.selectedIndex = index
    this.focusedIndex = index
    this.updateIndicator()
  }

  private updateIndicator() {
    const selectedBox = this.boxes.toArray()[this.selectedIndex].nativeElement
    this.indicatorWidth = selectedBox.offsetWidth
    this.indicatorLeft = selectedBox.offsetLeft
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      // Evitar que el evento Tab continúe hacia adelante.
      
      return;
    }

    if (event.key === 'Enter') {
      if(this.focusedIndex != this.selectedIndex)
        this.selectTab(this.focusedIndex)
    }
    
    if (event.key === 'ArrowRight') {

      if(this.focusedIndex == this.boxes.length - 1)
        this.focusedIndex = 0
      else
        this.focusedIndex++
    } else if (event.key === 'ArrowLeft') {

      if(this.focusedIndex == 0)
        this.focusedIndex = this.boxes.length - 1
      else
        this.focusedIndex--
    }

    this.boxes.toArray()[this.focusedIndex].nativeElement.focus();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.animate = true;
    }, 0)
  }

  ngAfterViewInit() {
    this.updateIndicator()
    // Forzar la detección de cambios
    this.cdr.detectChanges()
  }


}
