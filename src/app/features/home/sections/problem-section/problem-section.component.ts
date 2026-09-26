import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-problem-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-10 sm:py-14 lg:py-18 bg-[#F8F9FB] border-t border-slate-200/70 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        <!-- En-tête de section -->
        <div class="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-1.5 px-2 sm:px-0">
          <h2 class="font-heading text-base sm:text-lg md:text-xl lg:text-2xl text-primary font-bold tracking-tight leading-snug max-w-xl sm:max-w-2xl mx-auto">
            Comprendre les vraies difficultés pour mieux accompagner chaque jeune
          </h2>
          <div class="section-divider"></div>
          <p class="text-slate-600 text-xs sm:text-sm mt-1.5 font-medium max-w-lg sm:max-w-xl mx-auto leading-relaxed">
            ALTERNIA apporte une réponse concrète et sur-mesure aux défis éducatifs et culturels de notre jeunesse.
          </p>
        </div>

        <!-- Deux Grands Cadres Stylisés avec Entrée Individuelle au Scroll -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-stretch">
          
          <!-- ==========================================
               CADRE 1 : CULTURE (Entrée Individuelle Gauche)
               ========================================== -->
          <div
            #cultureCard
            class="bg-white rounded-3xl p-4 sm:p-6 border-2 border-accent/25 shadow-sm hover:border-accent/50 hover:shadow-md transition-all duration-[1300ms] ease-out flex flex-col justify-between space-y-3.5"
            [ngClass]="{
              'opacity-0 -translate-x-12 scale-95': !isCultureInView(),
              'opacity-100 translate-x-0 scale-100': isCultureInView()
            }"
          >
            
            <div class="space-y-3.5">
              <!-- En-tête du Cadre Culture -->
              <div class="flex items-center gap-3 pb-2.5 border-b border-accent/20">
                <div class="w-10 h-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center font-bold flex-shrink-0 shadow-xs">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                    <path d="M2 12h20"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-heading text-lg sm:text-xl font-bold text-slate-900">
                    Culture
                  </h3>
                  <p class="text-[10px] font-semibold uppercase tracking-wider text-accent mt-0.5">
                    Une richesse menacée
                  </p>
                </div>
              </div>

              <!-- Image de la Culture & Transmission (Format Réduit & Ajusté) -->
              <div class="w-full rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs bg-slate-50">
                <img
                  src="assets/images/parent1.png"
                  alt="Transmission de notre patrimoine culturel et familial avec ALTERNIA"
                  class="w-full h-44 sm:h-48 md:h-52 object-cover object-[center_16%] rounded-2xl hover:scale-[1.02] transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              <!-- Liste des 6 Points Culture -->
              <div class="space-y-2">
                @for (caseItem of cultureCases; track $index) {
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
               CADRE 2 : ÉDUCATION (Entrée Individuelle Droite)
               ========================================== -->
          <div
            #educationCard
            class="bg-white rounded-3xl p-4 sm:p-6 border-2 border-primary/20 shadow-sm hover:border-primary/45 hover:shadow-md transition-all duration-[1300ms] ease-out flex flex-col justify-between space-y-3.5"
            [ngClass]="{
              'opacity-0 translate-x-12 scale-95': !isEducationInView(),
              'opacity-100 translate-x-0 scale-100': isEducationInView()
            }"
          >
            
            <div class="space-y-3.5">
              <!-- En-tête du Cadre Éducation -->
              <div class="flex items-center gap-3 pb-2.5 border-b border-primary/20">
                <div class="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0 shadow-xs">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-heading text-lg sm:text-xl font-bold text-slate-900">
                    Éducation
                  </h3>
                  <p class="text-[10px] font-semibold uppercase tracking-wider text-primary mt-0.5">
                    Agir plus vite
                  </p>
                </div>
              </div>

              <!-- Image Éducation & Classe (Format Réduit & Harmonisé) -->
              <div class="w-full rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs bg-slate-50">
                <img
                  src="assets/images/ecole1.png"
                  alt="Accompagnement pédagogique et réussite scolaire avec ALTERNIA"
                  class="w-full h-44 sm:h-48 md:h-52 object-cover object-center rounded-2xl hover:scale-[1.02] transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              <!-- Liste des 7 Points Éducation -->
              <div class="space-y-2">
                @for (caseItem of educationCases; track $index) {
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
  @ViewChild('cultureCard') cultureCardRef?: ElementRef<HTMLElement>;
  @ViewChild('educationCard') educationCardRef?: ElementRef<HTMLElement>;

  readonly isCultureInView = signal<boolean>(false);
  readonly isEducationInView = signal<boolean>(false);
  private observer?: IntersectionObserver;

  readonly cultureCases = [
    {
      text: "Vous connaissez mieux les histoires et les contes venus d’Europe que ceux de l’Afrique.",
      iconPath: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    },
    {
      text: "Nos chants, nos danses et nos traditions se transmettent de moins en moins aux nouvelles générations.",
      iconPath: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
    },
    {
      text: "Nos villes, nos monuments et notre patrimoine historique racontent notre histoire, mais restent souvent méconnus des jeunes.",
      iconPath: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    },
    {
      text: "La transmission de notre patrimoine est menacée par la disparition progressive des sages et des griots.",
      iconPath: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    },
    {
      text: "De nombreuses pratiques, connaissances et savoir-faire traditionnels disparaissent sans être documentés ni accessibles aux nouvelles générations.",
      iconPath: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    },
    {
      text: "La technologie peut devenir un outil pour préserver notre culture, transmettre notre histoire et faire vivre notre patrimoine.",
      iconPath: "M13 10V3L4 14h7v7l9-11h-7z"
    }
  ];

  readonly educationCases = [
    {
      text: "Vous n’avez pas toujours le temps de reprendre les cours avec votre enfant après une journée de travail.",
      iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    },
    {
      text: "Un enseignant ne peut pas répondre individuellement à toutes les questions d’une classe.",
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
      text: "Les élèves n’apprennent pas tous au même rythme.",
      iconPath: "M13 10V3L4 14h7v7l9-11h-7z"
    },
    {
      text: "Après le cours, l’élève doit souvent attendre une nouvelle séance pour revoir son enseignant.",
      iconPath: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    },
    {
      text: "Les enseignants n’ont pas toujours les outils pour anticiper les difficultés et préparer les séances de remédiation.",
      iconPath: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    }
  ];

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (this.cultureCardRef && entry.target === this.cultureCardRef.nativeElement) {
            this.isCultureInView.set(entry.isIntersecting);
          }
          if (this.educationCardRef && entry.target === this.educationCardRef.nativeElement) {
            this.isEducationInView.set(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (this.cultureCardRef) this.observer.observe(this.cultureCardRef.nativeElement);
    if (this.educationCardRef) this.observer.observe(this.educationCardRef.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
