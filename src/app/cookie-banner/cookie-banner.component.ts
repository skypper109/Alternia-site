import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieConsentService } from '../core/services/cookie-consent.service';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (consentService.showBanner()) {
      <div
        role="dialog"
        aria-labelledby="cookie-title"
        aria-describedby="cookie-desc"
        class="fixed bottom-5 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-5 sm:p-6 animate-fade-in"
      >
        <div class="flex items-start gap-3.5">
          <!-- Icône Sécurité / Confidentialité -->
          <div class="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>

          <div class="flex-1 min-w-0">
            <h2 id="cookie-title" class="font-heading font-bold text-slate-900 text-sm sm:text-base">
              Respect de votre vie privée
            </h2>
            <p id="cookie-desc" class="text-slate-600 text-xs mt-1.5 leading-relaxed">
              Nous utilisons uniquement les cookies essentiels au bon fonctionnement du site. Des cookies facultatifs de mesure d'audience peuvent être activés avec votre consentement.
            </p>
          </div>
        </div>

        <!-- Boutons de Choix Explicite -->
        <div class="flex items-center gap-2.5 mt-4 pt-1">
          <button
            type="button"
            class="flex-1 bg-primary hover:bg-primary-600 active:scale-98 text-white text-xs font-bold py-2.5 px-3.5 rounded-xl transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            (click)="consentService.acceptAll()"
          >
            Tout accepter
          </button>
          
          <button
            type="button"
            class="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2.5 px-3.5 rounded-xl transition-colors focus-visible:outline-none"
            (click)="consentService.refuseOptional()"
          >
            Refuser non essentiels
          </button>
        </div>
      </div>
    }
  `
})
export class CookieBannerComponent {
  constructor(readonly consentService: CookieConsentService) {}
}
