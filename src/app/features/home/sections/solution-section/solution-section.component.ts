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
      title: 'Pédagogie Socratique Active',
      desc: "L'IA ne donne jamais la réponse brute : elle décompose l'exercice, pose des questions guidées et amène l'élève au déclic par lui-même.",
      color: 'primary',
      iconSvg: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
    },
    {
      number: '02',
      title: 'RAG Spécialisé au Programme Malien',
      desc: "Indexation sémantique fidèle des manuels officiels (10ème Tronc Commun, 11ème, Terminale TSE, TSExp, TSS, TSEco, TLL et DEF).",
      color: 'secondary',
      iconSvg: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
    },
    {
      number: '03',
      title: 'Inférence Edge AI 100% Hors-Ligne',
      desc: "Modèle LLM local embarqué dans le boîtier. Zéro connexion Internet requise, zéro coût data et batterie 8h-12h résistante aux coupures.",
      color: 'accent',
      iconSvg: 'M13 10V3L4 14h7v7l9-11h-7z'
    },
    {
      number: '04',
      title: 'Vocal Duplex & Phonétisation Maths',
      desc: "Dialogue vocal naturel avec Faster-Whisper et synthèse vocale neuronale prononçant les équations, fractions et formules avec clarté.",
      color: 'primary',
      iconSvg: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z'
    },
    {
      number: '05',
      title: 'Pilotage & Détection du Décrochage (Alta)',
      desc: "Portail de supervision pour directeurs et parents : identification des notions non maîtrisées, quiz automatiques et fiches de révision.",
      color: 'secondary',
      iconSvg: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
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
