import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Section Accueil Plein Écran (100% de la largeur et hauteur disponible) sous la capsule flottante -->
    <section id="accueil" class="relative w-full min-h-screen flex items-center overflow-hidden bg-slate-950">
      
      <!-- Image Principale Plein Écran sans bordures rognées -->
      <img
        src="assets/images/picture principal.png"
        alt="Élèves ALTERNIA en apprentissage"
        class="absolute inset-0 w-full h-full object-cover object-[70%_center] sm:object-center pointer-events-none scale-[1.01]"
        loading="eager"
      />

      <!-- Voile dégradé translucide pour assurer une lisibilité absolue sur mobile et grand écran -->
      <div class="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/60 sm:via-slate-950/45 to-slate-950/20 pointer-events-none" aria-hidden="true"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 pointer-events-none" aria-hidden="true"></div>

      <!-- Contenu décalé avec marge supérieure pour la capsule flottante -->
      <div class="relative w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-14 pt-28 sm:pt-32 pb-16 z-10">
        <div class="max-w-3xl lg:ml-[6%] xl:ml-[8%] text-left space-y-4 sm:space-y-6">
          
          <!-- Titre Principal avec 'l’essentiel' en bleu clair de la charte -->
          <h1 class="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-[1.14] tracking-tight drop-shadow-md">
            L’alternative pour apprendre <span class="text-secondary">l’essentiel</span>
          </h1>

          <!-- Phrase d'Accroche sur 4 lignes -->
          <p class="text-slate-100 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-xl sm:max-w-2xl font-normal drop-shadow">
            ALTERNIA est une solution culturelle et éducative dotée d'une intelligence artificielle qui accompagne chaque jeune dans l'apprentissage de son cours et la découverte de l’histoire africaine partout et à tout moment.
          </p>

          <!-- Boutons d'Action Mobile-First -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-2">
            
            <!-- CTA Principal : Nous contacter -->
            <a
              href="#contact"
              (click)="scrollTo('contact', $event)"
              class="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 rounded-full bg-primary hover:bg-primary-600 text-white font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5 text-center"
              aria-label="Nous contacter"
            >
              Nous contacter
            </a>

            <!-- CTA Secondaire : Découvrir ALTERNIA -->
            <a
              href="#education"
              (click)="scrollTo('education', $event)"
              class="inline-flex items-center justify-center px-6 sm:px-7 py-3.5 rounded-full border border-white/40 hover:border-white text-white font-semibold text-sm bg-slate-950/40 hover:bg-white/15 transition-all duration-200 backdrop-blur-sm hover:-translate-y-0.5 text-center"
              aria-label="Découvrir ALTERNIA"
            >
              Découvrir ALTERNIA
            </a>

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
