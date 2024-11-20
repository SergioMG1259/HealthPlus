import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { AppointmentDetailComponent } from '../components/appointment-detail/appointment-detail.component';
import { ComponentPortal } from '@angular/cdk/portal';

interface Event {
  start: Date
  finish: Date
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentDetailService {

  private _isOpen:boolean = false
  overlayRef!: OverlayRef
  private boundKeydownHandler: (event: KeyboardEvent) => void;
  
  constructor(private overlay:Overlay) {
    this.boundKeydownHandler = this.handleKeydownOpen.bind(this);
   }

  get open(): boolean {
    return this._isOpen;
  }

  set open(value: boolean) {
    this._isOpen = value
  }

  openDetail(appointment: Event) {
    if (this._isOpen)return
    this._isOpen = true
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dialog-bg',
      positionStrategy: this.overlay.position().global().right().top(),
      scrollStrategy: this.overlay.scrollStrategies.block()
    })
    const filePreviewPortal = new ComponentPortal(AppointmentDetailComponent)

    const componentRef = this.overlayRef.attach(filePreviewPortal)

    this.overlayRef.backdropClick().subscribe(() => {this.closeDetail();this._isOpen = false})

    componentRef.instance.appointment = appointment

    document.addEventListener('keydown', this.boundKeydownHandler);
  }

  closeDetail() {
    if (this.overlayRef) {
      this.overlayRef.detach()
      this._isOpen = false
      this.overlayRef.dispose()
      // Eliminar el listener del evento 'keydown' al cerrar el filtro
      document.removeEventListener('keydown', this.boundKeydownHandler);
    }
  }

  handleKeydownOpen(event: KeyboardEvent) {
    if (event.key === 'Escape' && this._isOpen) {
      this.closeDetail();
    }
  }

}
