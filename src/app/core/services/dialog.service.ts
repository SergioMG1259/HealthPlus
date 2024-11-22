import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Injectable, Injector } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';
import { DIALOG_DATA } from '../models/dialogData';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private overlayRef: OverlayRef | null = null
  private afterClosed = new Subject<any>()

  constructor(private overlay: Overlay, private injector: Injector) {

  }

  open(component: any, config: { data?: any; width?: string } = {}): Observable<any> {
    // Close any existing dialog
    this.close()

    // Create an overlay with a backdrop
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dialog-bg',
      panelClass: 'dialog-panel',
      width: config.width,
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block()
    })

    // Listen for backdrop clicks to close the dialog
    this.overlayRef.backdropClick().subscribe(() => this.close())

    this.overlayRef
    .keydownEvents()
    .pipe(
      filter((event: KeyboardEvent) => event.key === 'Escape') // Detecta la tecla Escape
    )
    .subscribe(() => this.close())

    // Attach the dialog component to the overlay
    const injector = Injector.create({
      providers: [{ provide: DIALOG_DATA, useValue: config.data }],
      parent: this.injector,
    })

    const portal = new ComponentPortal(component, null, injector)
    this.overlayRef.attach(portal)

    return this.afterClosed.asObservable()
  }

  close(result?: any): void {
    if (this.overlayRef) {
      this.overlayRef.dispose()
      this.overlayRef = null
      this.afterClosed.next(result)
      this.afterClosed.complete()
      this.afterClosed = new Subject<any>()
    }
  }
}
