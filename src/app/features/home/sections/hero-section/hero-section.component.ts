import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Section Accueil Plein Écran (100% de la largeur et hauteur disponible) sous la capsule flottante -->
    <section id="accueil" class="relative w-full min-h-screen flex items-center overflow-hidden bg-slate-950">
      
      <!-- Image Principale Plein Écran sans bordures rognées (Optimisée) -->
      <img
        src="assets/images/picture principal.jpg"
        alt="Élèves ALTERNIA en apprentissage"
        class="absolute inset-0 w-full h-full object-cover object-[70%_center] sm:object-center pointer-events-none scale-[1.01]"
        loading="eager"
      />

      <!-- Voile dégradé translucide pour assurer une lisibilité absolue sur mobile et grand écran -->
      <div class="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/60 sm:via-slate-950/45 to-slate-950/20 pointer-events-none" aria-hidden="true"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 pointer-events-none" aria-hidden="true"></div>

      <!-- Contenu décalé avec marge supérieure pour la capsule flottante -->
      <div class="relative w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-14 pt-28 sm:pt-32 pb-16 z-10">
        <div class="max-w-3xl lg:ml-[4%] xl:ml-[6%] text-left space-y-5 sm:space-y-6">
          
          <!-- Badge Technologique avec pulsation verte 'En Direct' -->
          <div class="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-white text-xs font-semibold">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span class="tracking-wide">1ère EdTech IA 100% Hors-ligne au Mali</span>
            <span class="text-secondary font-mono text-[10px] hidden sm:inline">• Boîtier ALTA</span>
          </div>

          <!-- Titre Principal avec dégradé subtil et accroche percutante -->
          <h1 class="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-[1.14] tracking-tight drop-shadow-md">
            L’alternative pour apprendre <span class="text-secondary">l’essentiel</span> sans Internet.
          </h1>

          <!-- Phrase d'Accroche immersive et rassurante pour parents et écoles -->
          <p class="text-slate-100 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-xl sm:max-w-2xl font-normal drop-shadow">
            ALTERNIA est le premier boîtier intelligent autonome doté d'une IA éducative qui accompagne chaque élève dans la maîtrise du programme national (DEF & Bac) et la redécouverte de notre histoire africaine — partout, à tout moment, et sans aucun forfait de données.
          </p>

          <!-- Boutons d'Action Premium avec Démo IA en vedette -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
            
            <!-- CTA Principal 1 : Tester la Démo IA (Bouton lumineux) -->
            <a
              href="#demo-ia"
              (click)="scrollTo('demo-ia', $event)"
              class="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 rounded-full bg-accent hover:bg-[#d87212] text-white font-bold text-sm transition-all duration-200 shadow-lg hover:shadow-accent/40 hover:-translate-y-0.5 text-center group"
              aria-label="Tester le simulateur d'intelligence artificielle"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="group-hover:rotate-12 transition-transform duration-200">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
              <span>Tester l'IA en direct</span>
            </a>

            <!-- CTA Principal 2 : Découvrir le boîtier ALTA -->
            <a
              href="#education"
              (click)="scrollTo('education', $event)"
              class="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full border border-white/40 hover:border-white text-white font-semibold text-sm bg-slate-950/40 hover:bg-white/15 transition-all duration-200 backdrop-blur-sm hover:-translate-y-0.5 text-center"
              aria-label="Découvrir le boîtier ALTA"
            >
              <span>Découvrir le boîtier ALTA</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </a>

            <!-- CTA 3 : Contact rapide -->
            <a
              href="#contact"
              (click)="scrollTo('contact', $event)"
              class="inline-flex items-center justify-center px-5 py-3.5 text-slate-300 hover:text-white text-xs font-semibold transition-colors text-center underline underline-offset-4"
              aria-label="Contacter l'équipe ALTERNIA"
            >
              Nous contacter
            </a>

          </div>

          <!-- Micro-Piliers de Réassurance Glassmorphism (3 indicateurs clés) -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-3 sm:pt-4 max-w-2xl border-t border-white/15">
            
            <div class="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 backdrop-blur-xs border border-white/10 text-white/90 text-xs">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-secondary flex-shrink-0" aria-hidden="true">
                <line x1="1" y1="1" x2="23" y2="23"/>
                <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/>
                <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/>
                <path d="M10.71 5.05A16 16 0 0 1 22.58 9"/>
                <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/>
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
                <line x1="12" y1="20" x2="12.01" y2="20"/>
              </svg>
              <span class="font-medium">0 Ko d'Internet requis</span>
            </div>

            <div class="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 backdrop-blur-xs border border-white/10 text-white/90 text-xs">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-secondary flex-shrink-0" aria-hidden="true">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
              <span class="font-medium">100% Conforme DEF & Bac</span>
            </div>

            <div class="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 backdrop-blur-xs border border-white/10 text-white/90 text-xs">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-secondary flex-shrink-0" aria-hidden="true">
                <rect x="1" y="6" width="18" height="12" rx="2"/>
                <line x1="23" y1="11" x2="23" y2="13"/>
                <polygon points="11 8 8 13 11 13 10 16 14 11 11 11 11 8"/>
              </svg>
              <span class="font-medium">8h à 12h d'autonomie</span>
            </div>

          </div>

        </div>
      </div>

    </section>
  `
})
export class HeroSectionComponent {
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
