import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StepItem {
  number: string;
  title: string;
  desc: string;
  color: 'primary' | 'secondary' | 'accent';
  iconSvg: string;
}

@Component({
  selector: 'app-solution-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-10 sm:py-14 lg:py-18 bg-white relative border-t border-slate-200/70 overflow-hidden">
      
      <!-- ========================================================
           MOTIFS D'ARRIÈRE-PLAN : NOTRE SOLUTION (POSITIONNÉS EN DESSOUS DES TITRES & AU NIVEAU DES CARTES)
           ======================================================== -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        
        <!-- Polygone Géométrique Médian : Positionné sous l'en-tête & au niveau des cartes (Gris) -->
        <div class="absolute top-[44%] -left-16 sm:-left-6 lg:left-4 w-[380px] sm:w-[460px] h-[320px] sm:h-[380px] text-slate-400 opacity-20 animate-spin-in-place">
          <svg viewBox="0 0 600 500" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full">
            <polygon points="120,40 380,20 540,180 440,380 200,420 60,260" stroke-width="2.2"/>
            <polygon points="220,120 420,100 480,240 360,340 180,300" stroke-width="1.6"/>
            <line x1="120" y1="40" x2="220" y2="120"/>
            <line x1="380" y1="20" x2="420" y2="100"/>
            <line x1="540" y1="180" x2="480" y2="240"/>
            <line x1="440" y1="380" x2="360" y2="340"/>
            <line x1="200" y1="420" x2="180" y2="300"/>
            <line x1="60" y1="260" x2="220" y2="120"/>
            <circle cx="120" cy="40" r="4.5" fill="currentColor"/>
            <circle cx="380" cy="20" r="4.5" fill="currentColor"/>
            <circle cx="540" cy="180" r="4.5" fill="currentColor"/>
            <circle cx="440" cy="380" r="4.5" fill="currentColor"/>
            <circle cx="200" cy="420" r="4.5" fill="currentColor"/>
            <circle cx="60" cy="260" r="4.5" fill="currentColor"/>
          </svg>
        </div>

        <!-- Polygones & Maillage Géométrique Inférieur en Roulement de Tonneau Inverse (Gris) -->
        <div class="absolute -bottom-16 right-1/4 w-[480px] sm:w-[620px] h-[380px] sm:h-[480px] text-slate-400 opacity-20 animate-barrel-roll-2">
          <svg viewBox="0 0 600 500" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full">
            <polygon points="180,60 440,40 560,240 400,440 140,400 40,200" stroke-width="2.2"/>
            <polygon points="260,140 400,120 460,260 340,340 180,300" stroke-width="1.6"/>
            <line x1="180" y1="60" x2="260" y2="140"/>
            <line x1="440" y1="40" x2="400" y2="120"/>
            <line x1="560" y1="240" x2="460" y2="260"/>
            <line x1="400" y1="440" x2="340" y2="340"/>
            <line x1="140" y1="400" x2="180" y2="300"/>
            <line x1="40" y1="200" x2="260" y2="140"/>
            <circle cx="180" cy="60" r="4.5" fill="currentColor"/>
            <circle cx="440" cy="40" r="4.5" fill="currentColor"/>
            <circle cx="560" cy="240" r="4.5" fill="currentColor"/>
            <circle cx="400" cy="440" r="4.5" fill="currentColor"/>
            <circle cx="140" cy="400" r="4.5" fill="currentColor"/>
            <circle cx="40" cy="200" r="4.5" fill="currentColor"/>
          </svg>
        </div>

      </div>

      <div class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        <!-- En-tête avec titre centré harmonisé en 2 lignes et taille responsive -->
        <div class="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-1.5 px-2 sm:px-0">
          <span class="inline-block text-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-0.5 sm:px-3.5 sm:py-1 bg-primary/10 rounded-full border border-primary/20">
            Notre Solution
          </span>
          <h2 class="font-heading text-base sm:text-lg md:text-xl lg:text-2xl text-primary font-bold tracking-tight leading-snug max-w-xl sm:max-w-2xl mx-auto">
            ALTERNIA, accompagne votre enfant partout et à tout moment.
          </h2>
          <div class="section-divider"></div>
          <p class="text-slate-600 text-xs sm:text-sm mt-1.5 font-medium max-w-lg sm:max-w-xl mx-auto leading-relaxed">
            5 méthodes simples pour garantir la progression de chaque élève.
          </p>
        </div>

        <!-- ========================================================
             LES 5 MÉTHODES EN CARTES EMPILÉES AU SCROLL (STACKING DECK)
             ======================================================== -->
        <div class="max-w-3xl mx-auto relative px-2 sm:px-4 pb-12 sm:pb-20">
          
          <div class="relative space-y-5 sm:space-y-6">
            @for (step of steps; track step.title; let i = $index) {
              <div
                #stepCard
                class="sticky transition-all duration-[1200ms] ease-out origin-top"
                [style.top]="(80 + i * 12) + 'px'"
                [style.zIndex]="i + 10"
                [ngClass]="{
                  'opacity-0 translate-y-10 scale-95': !isCardInView(i),
                  'opacity-100 translate-y-0 scale-100': isCardInView(i)
                }"
              >
                <!-- Card Empilable Compacte 100% Blanche et Opaque avec Icône & Textes -->
                <div
                  class="bg-white rounded-2xl py-3 px-4 sm:py-3.5 sm:px-5 border border-slate-200/90 shadow-[0_-3px_15px_rgba(0,0,0,0.04),0_10px_28px_rgba(49,73,153,0.08)] hover:shadow-[0_-4px_20px_rgba(0,0,0,0.06),0_14px_34px_rgba(49,73,153,0.12)] transition-all duration-300 relative overflow-hidden"
                >
                  <div class="flex items-center gap-3 sm:gap-4">
                    
                    <!-- Icône Contextuelle Compacte -->
                    <div
                      class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xs"
                      [ngClass]="{
                        'bg-primary/10 text-primary': step.color === 'primary',
                        'bg-secondary/15 text-secondary': step.color === 'secondary',
                        'bg-accent/15 text-accent': step.color === 'accent'
                      }"
                    >
                      <svg class="w-4 h-4 sm:w-5 sm:h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
                        <path [attr.d]="step.iconSvg" />
                      </svg>
                    </div>

                    <!-- Titre et Description Harmonieux -->
                    <div class="space-y-0.5 min-w-0 flex-1">
                      <h3 class="font-heading font-bold text-slate-900 text-sm sm:text-base">
                        {{ step.title }}
                      </h3>
                      <p class="text-slate-600 text-xs leading-relaxed">
                        {{ step.desc }}
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            }
          </div>

        </div>

      </div>
    </section>
  `
})
export class SolutionSectionComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('stepCard') stepCardRefs!: QueryList<ElementRef<HTMLElement>>;
  
  readonly cardsInView = signal<boolean[]>([false, false, false, false, false]);
  private observer?: IntersectionObserver;

  isCardInView(index: number): boolean {
    return this.cardsInView()[index] ?? false;
  }

  readonly steps: StepItem[] = [
    {
      number: '01',
      title: 'Assistance disponible 24H/24',
      desc: "Accessible à tout moment pour répondre aux questions de l'élève dès qu'un besoin se présente.",
      color: 'primary',
      iconSvg: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      number: '02',
      title: 'Explications adaptées',
      desc: "Réponses formulées selon le niveau d'apprentissage, la classe et la compréhension de l'élève.",
      color: 'secondary',
      iconSvg: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
    },
    {
      number: '03',
      title: 'Préparation des examens',
      desc: "Exercices pratiques structurés et ciblés sur les épreuves officielles du programme scolaire malien.",
      color: 'accent',
      iconSvg: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
    },
    {
      number: '04',
      title: 'Identification des difficultés',
      desc: "Détection précise des points de blocage pour intervenir à temps et éviter le décrochage.",
      color: 'primary',
      iconSvg: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
    },
    {
      number: '05',
      title: 'Proposition de remédiations',
      desc: "Outils concrets pour anticiper, structurer et réussir les séances d'accompagnement ciblé.",
      color: 'secondary',
      iconSvg: 'M13 10V3L4 14h7v7l9-11h-7z'
    }
  ];

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardIndex = this.stepCardRefs.toArray().findIndex(
            (ref) => ref.nativeElement === entry.target
          );
          if (cardIndex !== -1) {
            this.cardsInView.update((states) => {
              const next = [...states];
              next[cardIndex] = entry.isIntersecting;
              return next;
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    this.stepCardRefs.forEach((ref) => {
      this.observer?.observe(ref.nativeElement);
    });
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
