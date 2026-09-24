import { Injectable, signal } from '@angular/core';
import { LegalDocType } from '../../shared/components/legal-modal/legal-modal.component';

@Injectable({
  providedIn: 'root'
})
export class LegalModalService {
  readonly activeDoc = signal<LegalDocType>(null);

  open(doc: LegalDocType): void {
    this.activeDoc.set(doc);
    if (typeof document !== 'undefined') {
      document.body.classList.add('overflow-hidden');
    }
  }

  close(): void {
    this.activeDoc.set(null);
    if (typeof document !== 'undefined') {
      document.body.classList.remove('overflow-hidden');
    }
  }
}
