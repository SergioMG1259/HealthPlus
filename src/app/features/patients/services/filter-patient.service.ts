import { Overlay, OverlayRef, PositionStrategy, ScrollStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ElementRef, Injectable } from '@angular/core';
import { FilterPatientComponent } from '../components/filter-patient/filter-patient.component';

@Injectable({
  providedIn: 'root'
})
export class FilterPatientService {
  
  positionStrategy:PositionStrategy|null = null
  scrollStrategy:ScrollStrategy|null = null
  overlayRef!: OverlayRef;
  origin!:ElementRef
  classBack:string = 'cdk-overlay-transparent-backdrop'
  isOpen:boolean = false
  private boundKeydownHandler: (event: KeyboardEvent) => void;

  constructor(private overlay:Overlay) {
    this.boundKeydownHandler = this.handleKeydownOpen.bind(this);
  }

  get panelOpen(): boolean {
    return this.isOpen;
  }

  openFilter(origin:ElementRef) {
    if (this.isOpen)return
    this.isOpen = true
    this.origin = origin;
    this.updatePositionStrategy();
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: this.classBack,
      positionStrategy: this.positionStrategy!,
      scrollStrategy: this.scrollStrategy!
    })
    const filePreviewPortal = new ComponentPortal(FilterPatientComponent)

    this.overlayRef.attach(filePreviewPortal)

    this.overlayRef.backdropClick().subscribe(() => {this.closeFilter();this.isOpen = false})

    document.addEventListener('keydown', this.boundKeydownHandler);
  }

  updatePositionStrategy() {
    if (window.innerWidth <= 600) {
      this.classBack = 'dialog-bg'
      this.positionStrategy = this.overlay.position().global().right().top();

      this.scrollStrategy = this.overlay.scrollStrategies.block()

    } else {
      this.classBack = 'cdk-overlay-transparent-backdrop'
      this.positionStrategy = this.overlay.position().flexibleConnectedTo(this.origin).withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top'
        },
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'bottom'
        }
      ]);
      
      this.scrollStrategy = this.overlay.scrollStrategies.reposition()
    }
  }

  closeFilter() {
    if (this.overlayRef) {
      this.overlayRef.detach()
      this.isOpen = false
      // Eliminar el listener del evento 'keydown' al cerrar el filtro
      document.removeEventListener('keydown', this.boundKeydownHandler);
    }
  }

  updateOverlayPosition() {
    if (this.overlayRef) {
      this.updatePositionStrategy();
      this.overlayRef.updatePositionStrategy(this.positionStrategy!)
      this.overlayRef.updateScrollStrategy(this.scrollStrategy!)
    }
  }

  handleScreenResize() {
    if (this.overlayRef && this.isOpen) {
      this.closeFilter();
      this.updateOverlayPosition();
    }
  }

  handleKeydownOpen(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isOpen) {
      this.closeFilter();
    }
  }
}
