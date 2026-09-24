import { Component, ElementRef, ViewChild, ViewChildren, QueryList, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CulturalPillar {
  number: string;
  title: string;
  desc: string;
  theme: 'secondary' | 'accent' | 'primary';
  image: string;
}

@Component({
  selector: 'app-culture-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="culture" class="py-10 sm:py-14 lg:py-18 bg-white border-t border-slate-200/70 relative overflow-hidden">
      
      <!-- ========================================================
           MOTIFS D'ARRIÈRE-PLAN : CULTURE (POSITIONNÉS EN DESSOUS DES TITRES & TEXTES)
           ======================================================== -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        
        <!-- Anneaux Circulaires Concentriques Supérieur Gauche (Positionnés au niveau du Conteur - Orange) -->
        <div class="absolute top-[34%] -left-12 sm:-left-6 w-64 sm:w-80 h-64 sm:h-80 text-accent opacity-20 animate-circle-pulse">
          <svg viewBox="0 0 400 400" fill="none" stroke="currentColor" class="w-full h-full">
            <circle cx="180" cy="180" r="170" stroke-width="3" stroke-dasharray="16 8"/>
            <circle cx="180" cy="180" r="130" stroke-width="2.5"/>
            <circle cx="180" cy="180" r="90" stroke-width="3"/>
            <circle cx="180" cy="180" r="50" stroke-width="2"/>
          </svg>
        </div>

        <!-- Spirale & Arcs Circulaires en Croissant (Positionnés au niveau des 4 cartes - Orange) -->
        <div class="absolute top-[62%] -left-12 w-64 sm:w-76 h-64 sm:h-76 text-accent opacity-20 animate-circle-spin">
          <svg viewBox="0 0 300 300" fill="none" stroke="currentColor" stroke-linecap="round" class="w-full h-full">
            <path d="M40,150 C40,89.25 89.25,40 150,40 C210.75,40 260,89.25 260,150 C260,210.75 210.75,260 150,260" stroke-width="8"/>
            <path d="M70,150 C70,105.8 105.8,70 150,70 C194.2,70 230,105.8 230,150" stroke-width="12"/>
            <path d="M100,150 C100,122.4 122.4,100 150,100" stroke-width="16"/>
          </svg>
        </div>

        <!-- Effet de Rayon Circulaire Zoom / Pulsation (Centré dans le périmètre des 4 cartes) -->
        <div class="absolute top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] lg:w-[900px] h-[550px] sm:h-[750px] lg:h-[900px] text-accent animate-ray-zoom">
          <svg viewBox="0 0 800 800" fill="none" stroke="currentColor" class="w-full h-full">
            <circle cx="400" cy="400" r="380" stroke-width="2.5" stroke-dasharray="16 8"/>
            <circle cx="400" cy="400" r="310" stroke-width="3"/>
            <circle cx="400" cy="400" r="240" stroke-width="2" stroke-dasharray="24 12"/>
            <circle cx="400" cy="400" r="170" stroke-width="3"/>
            <circle cx="400" cy="400" r="100" stroke-width="2"/>
            <line x1="400" y1="20" x2="400" y2="780" stroke-width="1" stroke-dasharray="8 8"/>
            <line x1="20" y1="400" x2="780" y2="400" stroke-width="1" stroke-dasharray="8 8"/>
            <line x1="130" y1="130" x2="670" y2="670" stroke-width="1" stroke-dasharray="8 8"/>
            <line x1="670" y1="130" x2="130" y2="670" stroke-width="1" stroke-dasharray="8 8"/>
          </svg>
        </div>

        <!-- Anneaux Circulaires Discrets Bas Droit (Orange) -->
        <div class="absolute -bottom-24 -right-24 w-72 sm:w-80 h-72 sm:h-80 text-accent opacity-15 animate-circle-spin" style="animation-direction: reverse; animation-duration: 45s;">
          <svg viewBox="0 0 400 400" fill="none" stroke="currentColor" class="w-full h-full">
            <circle cx="200" cy="200" r="190" stroke-width="2.5"/>
            <circle cx="200" cy="200" r="140" stroke-width="2"/>
            <circle cx="200" cy="200" r="90" stroke-width="1.5"/>
          </svg>
        </div>

      </div>

      <div class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        <!-- En-tête : À la découverte du passé avec Titre Harmonisé en 2 lignes -->
        <div class="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-1.5 px-2 sm:px-0">
          <span class="inline-block text-accent text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-0.5 sm:px-3.5 sm:py-1 bg-accent/10 rounded-full border border-accent/20">
            À la découverte du passé
          </span>
          <h2 class="font-heading text-base sm:text-lg md:text-xl lg:text-2xl text-primary font-bold tracking-tight leading-snug max-w-xl sm:max-w-2xl mx-auto">
            L'Histoire, les contes et faits marquants de l'Afrique à Portée de Voix
          </h2>
          <div class="section-divider"></div>
          <p class="text-slate-600 text-xs sm:text-sm mt-1.5 font-medium max-w-lg sm:max-w-xl mx-auto leading-relaxed">
            Apprendre le monde sans oublier d'où l'on vient : ALTERNIA fait revivre notre identité, les traditions orales et les grandes figures du continent.
          </p>
        </div>

        <!-- ========================================================
             PRÉSENTATION DU GRAND-PÈRE CONTEUR (ENTRÉE DYNAMIQUE AU SCROLL)
             ======================================================== -->
        <div #conteurCard class="mb-12 sm:mb-16 rounded-3xl bg-white border-2 border-accent/30 p-5 sm:p-7 lg:p-8 shadow-[0_8px_30px_rgba(241,133,31,0.06)] hover:border-accent/50 transition-all duration-300 max-w-5xl mx-auto relative overflow-hidden">
          
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            <!-- Colonne Image Grand-Père à Gauche : Entrée douce au scroll -->
            <div
              class="lg:col-span-6 flex flex-col items-center justify-center transition-all duration-[1300ms] ease-out"
              [ngClass]="{
                'opacity-0 -translate-x-14 scale-95': !isConteurInView(),
                'opacity-100 translate-x-0 scale-100': isConteurInView()
              }"
            >
              <div class="relative w-full">
                <div class="absolute -inset-1.5 bg-gradient-to-tr from-accent to-secondary rounded-[1.75rem] opacity-35 transform -rotate-1"></div>
                <div class="relative rounded-[1.5rem] overflow-hidden border-4 border-white shadow-lg bg-slate-100 aspect-[16/10] sm:aspect-[16/9] max-h-72 flex items-center justify-center">
                  <img
                    src="assets/images/vieux.png"
                    alt="Le Grand-Père Conteur et les auditeurs sous l'arbre"
                    class="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <!-- Colonne Textes à Droite : Entrée depuis la droite au scroll -->
            <div
              class="lg:col-span-6 space-y-3.5 text-slate-700 transition-all duration-[1300ms] ease-out delay-150"
              [ngClass]="{
                'opacity-0 translate-x-14': !isConteurInView(),
                'opacity-100 translate-x-0': isConteurInView()
              }"
            >
              
              <div class="inline-block px-3 py-1 rounded-xl bg-accent/15 text-accent text-[11px] font-bold uppercase tracking-wider">
                Comme sous l'arbre à palabres
              </div>

              <div class="space-y-0.5">
                <h3 class="font-heading text-lg sm:text-xl font-bold text-slate-900">
                  Le Grand-Père Conteur
                </h3>
                <p class="text-xs sm:text-sm font-semibold text-accent">
                  Gardien de l'histoire et de la sagesse
                </p>
              </div>

              <p class="text-xs sm:text-sm leading-relaxed text-slate-800 font-medium font-heading pt-1">
                Dans la partie culturelle d'ALTERNIA, un personnage virtuel de type grand-père prend la parole pour faire revivre les histoires d’autrefois.
              </p>

            </div>

          </div>
        </div>

        <!-- ========================================================
             DÉCOUVRIR NOTRE HISTOIRE EN 4 POINTS (ENTRÉES INDIVIDUELLES AU SCROLL)
             ======================================================== -->
        <div>
          <div class="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-1">
            <span class="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary">
              Découvrir notre histoire en 4 points
            </span>
            <h3 class="font-heading text-base sm:text-lg md:text-xl font-bold text-slate-900">
              Un voyage immersif dans le patrimoine
            </h3>
          </div>

          <!-- Ligne de liaison pointillée horizontale -->
          <div class="relative max-w-6xl mx-auto pt-4 sm:pt-6">
            
            <div class="hidden md:block absolute top-[26px] left-12 right-12 h-0.5 border-t-2 border-dashed border-primary/30 z-0"></div>

            <!-- Grille des 4 Cartes Animées Individuellement au scroll avec Images Soignées -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 relative z-10">
              @for (pillar of culturalPillars; track pillar.number; let i = $index) {
                <div
                  #pillarCard
                  class="flex flex-col items-center group transition-all duration-[1300ms] ease-out"
                  [ngClass]="{
                    'opacity-0 translate-y-12 scale-95': !isPillarCardInView(i),
                    'opacity-100 translate-y-0 scale-100': isPillarCardInView(i)
                  }"
                >
                  
                  <!-- Numéro en haut relié sur la ligne pointillée -->
                  <div
                    class="w-11 h-11 rounded-2xl bg-white flex items-center justify-center font-heading font-extrabold text-sm shadow-md border-2 z-20"
                    [ngClass]="{
                      'border-secondary text-secondary': pillar.theme === 'secondary',
                      'border-accent text-accent': pillar.theme === 'accent',
                      'border-primary text-primary': pillar.theme === 'primary'
                    }"
                  >
                    {{ pillar.number }}
                  </div>

                  <!-- Connecteur vertical pointillé reliant le numéro directement à la carte -->
                  <div class="w-0.5 h-4 border-l-2 border-dashed border-primary/40 z-10"></div>

                  <!-- Carte Directement Accrochée -->
                  <div class="w-full bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-[0_6px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.10)] hover:border-primary/40 transition-all duration-300 flex flex-col justify-between flex-1">
                    
                    <div class="space-y-3">
                      <!-- Image Réelle du Dossier images avec Affichage Parfaitement Cadré (Non Rogné) -->
                      <div class="w-full h-36 sm:h-40 rounded-2xl overflow-hidden border border-slate-100 bg-slate-100/60 relative shadow-inner flex items-center justify-center">
                        <img
                          [src]="pillar.image"
                          [alt]="pillar.title"
                          class="w-full h-full object-cover object-top sm:object-center group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>

                      <!-- Titre et Description -->
                      <div class="space-y-1 text-left">
                        <h4 class="font-heading font-bold text-slate-900 text-sm sm:text-base leading-snug">
                          {{ pillar.title }}
                        </h4>
                        <p class="text-slate-600 text-xs leading-relaxed">
                          {{ pillar.desc }}
                        </p>
                      </div>
                    </div>

                  </div>

                </div>
              }
            </div>

          </div>
        </div>

      </div>
    </section>
  `
})
export class CultureSectionComponent implements AfterViewInit, OnDestroy {
  @ViewChild('conteurCard') conteurCardRef?: ElementRef<HTMLElement>;
  @ViewChildren('pillarCard') pillarCardRefs!: QueryList<ElementRef<HTMLElement>>;

  readonly isConteurInView = signal<boolean>(false);
  readonly pillarsInView = signal<boolean[]>([false, false, false, false]);
  private observer?: IntersectionObserver;

  isPillarCardInView(index: number): boolean {
    return this.pillarsInView()[index] ?? false;
  }

  readonly culturalPillars: CulturalPillar[] = [
    {
      number: '01',
      title: 'Héros & Grandes Figures',
      desc: 'L’histoire et le courage qui inspirent les générations.',
      theme: 'secondary',
      image: 'assets/images/hero.jpg'
    },
    {
      number: '02',
      title: 'Histoires, Contes & Récits',
      desc: 'Les fables et légendes porteuses de sagesse.',
      theme: 'accent',
      image: 'assets/images/conte.jpg'
    },
    {
      number: '03',
      title: 'Devinettes & Traditions',
      desc: 'Les proverbes et coutumes qui éveillent l’esprit.',
      theme: 'primary',
      image: 'assets/images/devinette.jpg'
    },
    {
      number: '04',
      title: 'Grandes Villes & Histoire',
      desc: 'L’exploration des cités millénaires africaines.',
      theme: 'primary',
      image: 'assets/images/ville.jpg'
    }
  ];

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (this.conteurCardRef && entry.target === this.conteurCardRef.nativeElement) {
            this.isConteurInView.set(entry.isIntersecting);
          }

          const pillarIndex = this.pillarCardRefs.toArray().findIndex(
            (ref) => ref.nativeElement === entry.target
          );
          if (pillarIndex !== -1) {
            this.pillarsInView.update((states) => {
              const next = [...states];
              next[pillarIndex] = entry.isIntersecting;
              return next;
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    if (this.conteurCardRef) this.observer.observe(this.conteurCardRef.nativeElement);
    this.pillarCardRefs.forEach((ref) => this.observer?.observe(ref.nativeElement));
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
