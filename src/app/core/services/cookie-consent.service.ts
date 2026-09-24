import { Injectable, signal } from '@angular/core';

export type ConsentStatus = 'pending' | 'accepted' | 'refused';

const CONSENT_KEY = 'alternia_cookie_consent';

@Injectable({
  providedIn: 'root'
})
export class CookieConsentService {
  readonly status = signal<ConsentStatus>(this.loadStatus());
  readonly showBanner = signal<boolean>(this.status() === 'pending');

  private loadStatus(): ConsentStatus {
    if (typeof window === 'undefined') return 'pending';
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored === 'accepted' || stored === 'refused') return stored;
    } catch {
      return 'pending';
    }
    return 'pending';
  }

  acceptAll(): void {
    this.setStatus('accepted');
  }

  refuseOptional(): void {
    this.setStatus('refused');
  }

  private setStatus(newStatus: ConsentStatus): void {
    try {
      localStorage.setItem(CONSENT_KEY, newStatus);
    } catch { /* localStorage inaccessible */ }
    this.status.set(newStatus);
    this.showBanner.set(false);
  }

  openPreferences(): void {
    this.showBanner.set(true);
  }

  hasConsented(): boolean {
    return this.status() === 'accepted';
  }
}
