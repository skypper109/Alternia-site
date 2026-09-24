import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-problem-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-10 sm:py-14 lg:py-18 bg-[#F8F9FB] border-t border-slate-200/70 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        <!-- En-tête de section avec 'Origine du projet' -->
        <div class="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-1.5 px-2 sm:px-0">
          <span class="inline-block text-secondary text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-0.5 sm:px-3.5 sm:py-1 bg-secondary/10 rounded-full">
            Origine du projet
          </span>
          <h2 class="font-heading text-base sm:text-lg md:text-xl lg:text-2xl text-primary font-bold tracking-tight leading-snug max-w-xl sm:max-w-2xl mx-auto">
            Comprendre les vraies difficultés pour mieux accompagner chaque élève
          </h2>
          <div class="section-divider"></div>
          <p class="text-slate-600 text-xs sm:text-sm mt-1.5 font-medium max-w-lg sm:max-w-xl mx-auto leading-relaxed">
            ALTERNIA apporte une réponse concrète et sur-mesure aux besoins quotidiens des familles et des établissements scolaires.
          </p>
        </div>

        <!-- Deux Grands Cadres Stylisés avec Entrée Individuelle au Scroll -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-stretch">
          
          <!-- ==========================================
               CADRE 1 : POUR LES PARENTS (Entrée Individuelle Gauche)
               ========================================== -->
          <div
            #parentCard
            class="bg-white rounded-3xl p-4 sm:p-6 border-2 border-accent/25 shadow-sm hover:border-accent/50 hover:shadow-md transition-all duration-[1300ms] ease-out flex flex-col justify-between space-y-3.5"
            [ngClass]="{
              'opacity-0 -translate-x-12 scale-95': !isParentInView(),
              'opacity-100 translate-x-0 scale-100': isParentInView()
            }"
          >
            
            <div class="space-y-3.5">
              <!-- En-tête du Cadre Parents avec Icône Famille/Parent expressive -->
              <div class="flex items-center gap-3 pb-2.5 border-b border-accent/20">
                <div class="w-10 h-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center font-bold flex-shrink-0 shadow-xs">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-heading text-lg sm:text-xl font-bold text-slate-900">
                    Pour les parents
                  </h3>
                  <p class="text-[10px] font-semibold uppercase tracking-wider text-accent mt-0.5">
                    Partout à la maison
                  </p>
                </div>
              </div>

              <!-- Image Compacte & Propre des Parents -->
              <div class="w-full rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs bg-slate-50">
                <img
                  src="assets/images/parent1.png"
                  alt="Accompagnement des parents à la maison avec ALTERNIA"
                  class="w-full h-44 sm:h-52 md:h-56 object-cover object-center rounded-2xl hover:scale-[1.02] transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              <!-- Liste des 5 Cas -->
              <div class="space-y-2">
                @for (caseItem of parentCases; track $index) {
                  <div class="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-accent/30 hover:shadow-xs transition-all duration-150 flex items-start gap-2.5">
                    <div class="w-6 h-6 rounded-lg bg-accent/15 text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <path [attr.d]="caseItem.iconPath" />
                      </svg>
                    </div>
                    <p class="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                      {{ caseItem.text }}
                    </p>
                  </div>
                }
              </div>
            </div>

          </div>

          <!-- ==========================================
               CADRE 2 : POUR LES ÉTABLISSEMENTS (Entrée Individuelle Droite)
               ========================================== -->
          <div
            #schoolCard
            class="bg-white rounded-3xl p-4 sm:p-6 border-2 border-primary/20 shadow-sm hover:border-primary/45 hover:shadow-md transition-all duration-[1300ms] ease-out flex flex-col justify-between space-y-3.5"
            [ngClass]="{
              'opacity-0 translate-x-12 scale-95': !isSchoolInView(),
              'opacity-100 translate-x-0 scale-100': isSchoolInView()
            }"
          >
            
            <div class="space-y-3.5">
              <!-- En-tête du Cadre Établissements -->
              <div class="flex items-center gap-3 pb-2.5 border-b border-primary/20">
                <div class="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0 shadow-xs">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-heading text-lg sm:text-xl font-bold text-slate-900">
                    Pour les établissements
                  </h3>
                  <p class="text-[10px] font-semibold uppercase tracking-wider text-primary mt-0.5">
                    Partout dans l'école
                  </p>
                </div>
              </div>

              <!-- Image Compacte & Propre des Établissements -->
              <div class="w-full rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs bg-slate-50">
                <img
                  src="assets/images/ecole1.png"
                  alt="Utilisation d'ALTERNIA dans les établissements scolaires"
                  class="w-full h-44 sm:h-52 md:h-56 object-cover object-center rounded-2xl hover:scale-[1.02] transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              <!-- Liste des 6 Cas -->
              <div class="space-y-2">
                @for (caseItem of schoolCases; track $index) {
                  <div class="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-primary/30 hover:shadow-xs transition-all duration-150 flex items-start gap-2.5">
                    <div class="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <path [attr.d]="caseItem.iconPath" />
                      </svg>
                    </div>
                    <p class="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                      {{ caseItem.text }}
                    </p>
                  </div>
                }
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  `
})
export class ProblemSectionComponent implements AfterViewInit, OnDestroy {
  @ViewChild('parentCard') parentCardRef?: ElementRef<HTMLElement>;
  @ViewChild('schoolCard') schoolCardRef?: ElementRef<HTMLElement>;

  readonly isParentInView = signal<boolean>(false);
  readonly isSchoolInView = signal<boolean>(false);
  private observer?: IntersectionObserver;

  readonly parentCases = [
    {
      text: "Vous n'avez pas toujours le temps de reprendre les cours avec votre enfant.",
      iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    },
    {
      text: "Vous ne maîtrisez pas forcément toutes les matières qu'il doit apprendre.",
      iconPath: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    },
    {
      text: "Vous devez parfois faire appel à un répétiteur coûteux pour assurer son suivi.",
      iconPath: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
    },
    {
      text: "Vous aimeriez savoir où votre enfant rencontre réellement des difficultés.",
      iconPath: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    },
    {
      text: "Même avec votre présence, certaines notions restent difficiles à expliquer souvent.",
      iconPath: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    }
  ];

  readonly schoolCases = [
    {
      text: "Un enseignant ne peut pas répondre individuellement à toutes les questions d'une classe.",
      iconPath: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    },
    {
      text: "Identifier les difficultés de chaque élève demande du temps.",
      iconPath: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    },
    {
      text: "Le suivi personnalisé devient difficile lorsque les effectifs augmentent.",
      iconPath: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    },
    {
      text: "Les élèves n'apprennent pas tous au même rythme.",
      iconPath: "M13 10V3L4 14h7v7l9-11h-7z"
    },
    {
      text: "Après le cours, l'élève doit souvent attendre une nouvelle séance pour revoir son enseignant.",
      iconPath: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    },
    {
      text: "Vous n’avez pas d’outils pouvant vous aider à anticiper les séances de remediations.",
      iconPath: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    }
  ];

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (this.parentCardRef && entry.target === this.parentCardRef.nativeElement) {
            this.isParentInView.set(entry.isIntersecting);
          }
          if (this.schoolCardRef && entry.target === this.schoolCardRef.nativeElement) {
            this.isSchoolInView.set(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (this.parentCardRef) this.observer.observe(this.parentCardRef.nativeElement);
    if (this.schoolCardRef) this.observer.observe(this.schoolCardRef.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
