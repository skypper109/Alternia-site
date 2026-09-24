import { Injectable, signal } from '@angular/core';

const DISMISSED_KEY = 'alternia_pwa_dismissed';

@Injectable({ providedIn: 'root' })
export class PwaInstallService {
  readonly canInstall = signal<boolean>(false);
  readonly showBanner = signal<boolean>(false);
  readonly isIos = signal<boolean>(false);

  private deferredPrompt: BeforeInstallPromptEvent | null = null;

  initialize(): void {
    if (typeof window === 'undefined') return;

    // Détection iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    const isStandalone = (window.navigator as any).standalone === true || window.matchMedia('(display-mode: standalone)').matches;
    this.isIos.set(isIosDevice && !isStandalone);

    try {
      if (localStorage.getItem(DISMISSED_KEY)) return;
    } catch { return; }

    // Écoute de l'événement natif PWA BeforeInstallPrompt
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      this.deferredPrompt = e as BeforeInstallPromptEvent;
      this.canInstall.set(true);

      // Invitation élégante après 6 secondes d'arrivée sur le site
      setTimeout(() => {
        if (this.canInstall() && !this.isDismissed()) {
          this.showBanner.set(true);
        }
      }, 6000);
    });

    // Fallback pour iOS non installé : affichage après 8 secondes
    if (this.isIos()) {
      setTimeout(() => {
        if (!this.isDismissed()) {
          this.showBanner.set(true);
        }
      }, 8000);
    }

    // Confirmation d'installation
    window.addEventListener('appinstalled', () => {
      this.canInstall.set(false);
      this.showBanner.set(false);
      this.deferredPrompt = null;
    });
  }

  async install(): Promise<void> {
    if (!this.deferredPrompt) return;

    try {
      await this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        this.canInstall.set(false);
        this.showBanner.set(false);
      }
    } catch {
      // Ignorer si l'utilisateur annule
    }

    this.deferredPrompt = null;
  }

  dismiss(): void {
    this.showBanner.set(false);
    try {
      localStorage.setItem(DISMISSED_KEY, 'true');
    } catch { /* localStorage inaccessible */ }
  }

  private isDismissed(): boolean {
    try {
      return localStorage.getItem(DISMISSED_KEY) === 'true';
    } catch {
      return false;
    }
  }
}

/** Extended type for the beforeinstallprompt event */
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}
