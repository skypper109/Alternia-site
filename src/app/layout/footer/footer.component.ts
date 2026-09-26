import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalModalService } from '../../core/services/legal-modal.service';
import { LegalDocType } from '../../shared/components/legal-modal/legal-modal.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- ========================================================
         SÉPARATION DISTINCTE AVANT LE FOOTER
         ======================================================== -->
    <div class="w-full border-t border-slate-200/90 bg-[#F8F9FB] pt-6 pb-2" aria-hidden="true">
      <div class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-center">
        <div class="flex items-center gap-3">
          <div class="h-px w-20 sm:w-36 bg-gradient-to-r from-transparent to-slate-300"></div>
          <div class="w-1.5 h-1.5 rounded-full bg-secondary"></div>
          <div class="w-2.5 h-2.5 rounded-full bg-primary/80"></div>
          <div class="w-1.5 h-1.5 rounded-full bg-accent"></div>
          <div class="h-px w-20 sm:w-36 bg-gradient-to-l from-transparent to-slate-300"></div>
        </div>
      </div>
    </div>

    <!-- Zone Globale Footer avec Fond Harmonisé & Filigrane ALTERNIA en Sinusoïde Continue -->
    <div class="w-full bg-[#F8F9FB]">
      <div class="w-full relative overflow-hidden pt-1 pb-1 pointer-events-none select-none flex justify-center items-center" aria-hidden="true">
        
        <svg class="w-full h-14 sm:h-18 md:h-22 overflow-visible" viewBox="0 0 1600 140" fill="none" preserveAspectRatio="none">
          <defs>
            <!-- Tracé étendu de la courbe sinusoïdale continue périodique -->
            <path id="sineWaveCurve" d="M -2400,70 C -2150,-15 -1850,155 -1600,70 C -1350,-15 -1050,155 -800,70 C -550,-15 -250,155 0,70 C 250,-15 550,155 800,70 C 1050,-15 1350,155 1600,70 C 1850,-15 2150,155 2400,70 C 2650,-15 2950,155 3200,70 C 3450,-15 3750,155 4000,70 C 4250,-15 4550,155 4800,70" />
          </defs>

          <!-- Texte ALTERNIA ondulant en boucle parfaite sans aucune pause ni vide -->
          <text class="font-heading font-black tracking-[0.25em] uppercase text-3xl sm:text-5xl fill-primary/30">
            <textPath href="#sineWaveCurve" startOffset="0%">
              <animate
                attributeName="startOffset"
                from="-25%"
                to="0%"
                dur="18s"
                repeatCount="indefinite"
                calcMode="linear"
              />
              ✦ ALTERNIA ✦ ALTERNIA ✦ ALTERNIA ✦ ALTERNIA ✦ ALTERNIA ✦ ALTERNIA ✦ ALTERNIA ✦ ALTERNIA ✦ ALTERNIA ✦ ALTERNIA ✦ ALTERNIA ✦ ALTERNIA ✦ ALTERNIA ✦ ALTERNIA ✦ ALTERNIA ✦ ALTERNIA ✦ ALTERNIA ✦ ALTERNIA ✦ ALTERNIA ✦ ALTERNIA ✦ ALTERNIA ✦ ALTERNIA
            </textPath>
          </text>

        </svg>
      </div>

      <!-- Section Footer en Card Compact aux Bords Arrondis -->
      <footer class="pt-0 pb-6 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10" role="contentinfo">
        
        <!-- Conteneur Card avec Hauteur Réduite et Bords Arrondis -->
        <div class="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] px-5 sm:px-8 py-4 sm:py-5">
        
        <!-- Grille Principale Compacte et Épurée -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 pb-3">
          
          <!-- Colonne Gauche : Logo, Phrase Clé & Réseaux Sociaux -->
          <div class="lg:col-span-5 space-y-2">
            
            <!-- Logo & Nom de Marque -->
            <a
              href="#accueil"
              (click)="scrollTo('accueil', $event)"
              class="inline-flex items-center gap-2 focus-visible:outline-none group"
              aria-label="ALTERNIA — Accueil"
            >
              <img
                src="assets/images/logo.svg"
                alt="Logo ALTERNIA"
                class="h-6 sm:h-7 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                loading="lazy"
              />
              <span class="font-heading font-extrabold text-lg sm:text-xl tracking-tight select-none">
                <span class="text-primary">Altern</span><span class="text-secondary">iA</span>
              </span>
            </a>

            <!-- Description Courte -->
            <p class="text-slate-600 text-xs leading-relaxed max-w-sm">
              L'alternative pour apprendre l'essentiel, sans oublier notre culture.
            </p>

            <!-- Icônes des Réseaux Sociaux Minimalistes -->
            <div class="flex items-center gap-2.5 pt-0.5">
              @for (social of socials; track social.name) {
                <a
                  [href]="social.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-slate-700 hover:text-primary transition-all duration-200 hover:scale-110"
                  [attr.aria-label]="social.name"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path [attr.d]="social.path" />
                  </svg>
                </a>
              }
            </div>

          </div>

          <!-- Colonnes Droite : 3 Colonnes Simples et Claires -->
          <div class="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            
            <!-- Colonne 1 : Plateforme -->
            <div class="space-y-1.5">
              <h4 class="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                Plateforme
              </h4>
              <ul class="space-y-1 text-xs text-slate-600">
                <li>
                  <a href="#accueil" (click)="scrollTo('accueil', $event)" class="hover:text-primary transition-colors">
                    Accueil
                  </a>
                </li>
                <li>
                  <a href="#education" (click)="scrollTo('education', $event)" class="hover:text-primary transition-colors">
                    Éducation
                  </a>
                </li>
                <li>
                  <a href="#demo-ia" (click)="scrollTo('demo-ia', $event)" class="hover:text-primary transition-colors font-medium text-secondary">
                    Démo IA en direct
                  </a>
                </li>
                <li>
                  <a href="#culture" (click)="scrollTo('culture', $event)" class="hover:text-primary transition-colors">
                    Culture & Traditions
                  </a>
                </li>
                <li>
                  <a href="#faq" (click)="scrollTo('faq', $event)" class="hover:text-primary transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <!-- Colonne 2 : Offres & Boîtier -->
            <div class="space-y-1.5">
              <h4 class="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                Offres
              </h4>
              <ul class="space-y-1 text-xs text-slate-600">
                <li>
                  <a href="#education" (click)="scrollTo('education', $event)" class="hover:text-primary transition-colors">
                    Version de Base
                  </a>
                </li>
                <li>
                  <a href="#education" (click)="scrollTo('education', $event)" class="hover:text-primary transition-colors">
                    Version Premium
                  </a>
                </li>
                <li>
                  <a href="#education" (click)="scrollTo('education', $event)" class="hover:text-primary transition-colors">
                    Application mobile
                  </a>
                </li>
                <li>
                  <a href="#contact" (click)="scrollTo('contact', $event)" class="hover:text-primary transition-colors">
                    Sur mesure (Écoles)
                  </a>
                </li>
              </ul>
            </div>

            <!-- Colonne 3 : Contact -->
            <div class="col-span-2 sm:col-span-1 space-y-1.5">
              <h4 class="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                Contact
              </h4>
              <ul class="space-y-1 text-xs text-slate-600">
                <li>
                  <a href="mailto:contact@alternia.ml" class="hover:text-primary transition-colors underline font-medium">
                    contact&#64;alternia.ml
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/22375260610?text=Bonjour%20ALTERNIA%2C%20je%20souhaite%20des%20informations."
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:text-primary transition-colors font-medium"
                  >
                    +223 75 26 06 10
                  </a>
                </li>
                <li class="text-slate-500 text-[11px]">
                  Bamako, République du Mali
                </li>
                <li>
                  <a href="#contact" (click)="scrollTo('contact', $event)" class="text-accent hover:text-primary font-bold transition-colors">
                    Formulaire de contact →
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>

        <!-- Ligne Inférieure avec Séparateur Fin & Modales Légales -->
        <div class="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 font-medium">
          <p class="text-slate-600">
            © {{ currentYear }} ALTERNIA. Tous droits réservés. Conçu avec fierté au Mali.
          </p>

          <div class="flex flex-wrap items-center gap-4">
            <button
              type="button"
              (click)="openLegal('mentions')"
              class="hover:text-primary transition-colors cursor-pointer"
            >
              Mentions Légales
            </button>
            <button
              type="button"
              (click)="openLegal('confidentialite')"
              class="hover:text-primary transition-colors cursor-pointer"
            >
              Politique de Confidentialité
            </button>
            <button
              type="button"
              (click)="openLegal('cookies')"
              class="hover:text-primary transition-colors cursor-pointer"
            >
              Cookies
            </button>
          </div>
        </div>

      </div>

    </footer>
    </div>
  `
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();

  constructor(private legalModalService: LegalModalService) {}

  openLegal(doc: LegalDocType): void {
    this.legalModalService.open(doc);
  }

  readonly socials = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/alternia-ml',
      path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/alternia.ml',
      path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@alternia_ml',
      path: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z'
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/alternia.ml',
      path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'
    }
  ];

  scrollTo(targetId: string, event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${targetId}`);
    }
  }
}
