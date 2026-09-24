import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PwaInstallService } from '../core/services/pwa-install.service';

@Component({
  selector: 'app-pwa-install-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (pwaService.showBanner()) {
      <div
        role="dialog"
        aria-labelledby="pwa-title"
        aria-describedby="pwa-desc"
        class="fixed bottom-5 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 bg-white/95 backdrop-blur-md border border-primary/20 rounded-3xl shadow-[0_12px_40px_rgba(49,73,153,0.18)] p-5 sm:p-6 transition-all animate-fade-in"
      >
        <div class="flex items-start gap-3.5">
          
          <!-- Logo Officiel ALTERNIA -->
          <div class="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex-shrink-0 flex items-center justify-center p-1.5">
            <img
              src="assets/images/logo.svg"
              alt="Logo ALTERNIA"
              class="w-full h-full object-contain"
            />
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <h2 id="pwa-title" class="font-heading font-bold text-slate-900 text-sm sm:text-base">
                Installer ALTERNIA
              </h2>
              <span class="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 bg-secondary/15 text-secondary rounded-full">
                App
              </span>
            </div>
            <p id="pwa-desc" class="text-slate-600 text-xs mt-1 leading-relaxed">
              Ajoutez ALTERNIA sur votre écran d'accueil pour profiter d'un accès instantané et d'une expérience plein écran.
            </p>
          </div>

          <!-- Bouton Fermer -->
          <button
            type="button"
            class="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Fermer l'invitation"
            (click)="pwaService.dismiss()"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <!-- Actions : Installer / Plus tard -->
        <div class="flex items-center gap-2.5 mt-4 pt-1">
          @if (pwaService.canInstall()) {
            <button
              type="button"
              class="flex-1 bg-primary hover:bg-primary-600 active:scale-98 text-white text-xs font-bold py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-primary/30 flex items-center justify-center gap-2"
              (click)="pwaService.install()"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span>Installer l'application</span>
            </button>
          } @else if (pwaService.isIos()) {
            <!-- Guide d'installation iOS Safari -->
            <div class="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-[11px] text-slate-600 leading-tight flex items-center gap-2">
              <span>Appuyez sur <strong class="text-primary">Partager</strong> puis <strong class="text-primary">« Sur l'écran d'accueil »</strong></span>
            </div>
          }

          <button
            type="button"
            class="px-3.5 py-3 text-slate-500 hover:text-slate-800 text-xs font-semibold rounded-xl hover:bg-slate-100 transition-colors"
            (click)="pwaService.dismiss()"
          >
            Plus tard
          </button>
        </div>
      </div>
    }
  `
})
export class PwaInstallBannerComponent {
  constructor(readonly pwaService: PwaInstallService) {}
}
