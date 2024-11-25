import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { AppointmentDetailComponent } from '../components/appointment-detail/appointment-detail.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { filter } from 'rxjs';

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
  
  constructor(private overlay:Overlay) {

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
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    })
    const filePreviewPortal = new ComponentPortal(AppointmentDetailComponent)

    const componentRef = this.overlayRef.attach(filePreviewPortal)

    this.overlayRef.backdropClick().subscribe(() => {this.closeDetail();this._isOpen = false})

    this.overlayRef
    .keydownEvents()
    .pipe(
      filter((event: KeyboardEvent) => event.key === 'Escape')
    )
    .subscribe(() => this.closeDetail())

    componentRef.instance.appointment = appointment

  }

  closeDetail() {
    if (this.overlayRef) {
      this.overlayRef.detach()
      this._isOpen = false
      this.overlayRef.dispose()
    }
  }

}
