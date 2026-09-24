import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TeamMember {
  id: string;
  prenom: string;
  nom: string;
  poste: string;
  description: string;
  photo: string;
  linkedin: string;
  facebook: string;
}

@Component({
  selector: 'app-team-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mb-12 sm:mb-14">
      
      <!-- En-tête avec Titre Harmonisé et marges responsives -->
      <div class="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-1.5 px-2 sm:px-0">
        <span class="inline-block text-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-0.5 sm:px-3.5 sm:py-1 bg-primary/10 rounded-full">
          Porteurs du Projet
        </span>
        <h2 class="font-heading text-base sm:text-lg md:text-xl lg:text-2xl text-primary font-bold tracking-tight leading-snug max-w-xl sm:max-w-2xl mx-auto">
          L'Équipe ALTERNIA
        </h2>
        <div class="section-divider"></div>
        <p class="text-slate-600 text-xs sm:text-sm mt-1.5 font-medium max-w-lg sm:max-w-xl mx-auto leading-relaxed">
          Nous œuvrons pour une éducation d’excellence et une culture qui rayonne.
        </p>
      </div>

      <!-- Grille des 4 Membres avec Animation d'Entrée Individuelle Progressive au Scroll (Haut->Bas et Bas->Haut) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        @for (member of team; track member.id; let i = $index) {
          <div
            #memberCard
            class="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-primary/40 hover:shadow-md transition-all duration-[1200ms] ease-out flex flex-col justify-between items-center text-center group"
            [style.transitionDelay]="(i * 180) + 'ms'"
            [ngClass]="{
              'opacity-0 -translate-x-12 scale-95': !isMemberInView(i),
              'opacity-100 translate-x-0 scale-100': isMemberInView(i)
            }"
          >
            
            <div class="space-y-2.5 w-full flex flex-col items-center">
              <!-- Photo Professionnelle Réelle -->
              <div class="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-xs group-hover:scale-105 group-hover:border-secondary transition-all duration-300">
                <img
                  [src]="member.photo"
                  [alt]="member.prenom + ' ' + member.nom"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div>
                <h3 class="font-heading font-bold text-slate-900 text-sm sm:text-base group-hover:text-primary transition-colors">
                  {{ member.prenom }} {{ member.nom }}
                </h3>
                <p class="text-[10px] font-bold text-primary uppercase tracking-wider mt-0.5">
                  {{ member.poste }}
                </p>
              </div>

              <p class="text-slate-600 text-xs leading-relaxed">
                {{ member.description }}
              </p>
            </div>

            <!-- Icônes Facebook & LinkedIn en Bleu Cyan de la charte graphique -->
            <div class="flex items-center gap-2 mt-3.5 pt-2.5 border-t border-slate-100 w-full justify-center">
              @if (member.linkedin) {
                <a
                  [href]="member.linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-7 h-7 rounded-lg bg-secondary/15 text-secondary hover:bg-primary hover:text-white flex items-center justify-center transition-colors shadow-xs"
                  [attr.aria-label]="'Profil LinkedIn de ' + member.prenom + ' ' + member.nom"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              }
              @if (member.facebook) {
                <a
                  [href]="member.facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-7 h-7 rounded-lg bg-secondary/15 text-secondary hover:bg-primary hover:text-white flex items-center justify-center transition-colors shadow-xs"
                  [attr.aria-label]="'Profil Facebook de ' + member.prenom + ' ' + member.nom"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              }
            </div>

          </div>
        }
      </div>

    </div>
  `
})
export class TeamSectionComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('memberCard') memberCardRefs!: QueryList<ElementRef<HTMLElement>>;

  readonly membersInView = signal<boolean[]>([false, false, false, false]);
  private observer?: IntersectionObserver;

  isMemberInView(index: number): boolean {
    return this.membersInView()[index] ?? false;
  }

  readonly team: TeamMember[] = [
    {
      id: 'hamza',
      prenom: 'Hamza',
      nom: 'SANMO',
      poste: 'Business Manager & Product Lead',
      description: "Responsable du pilotage produit, de la stratégie, du développement commercial et de la coordination globale du projet.",
      photo: 'assets/images/team/hamza-sanmo.jpeg',
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com'
    },
    {
      id: 'ibrahim',
      prenom: 'Ibrahim Sory',
      nom: 'DIALLO',
      poste: 'Technical Lead & AI Architect',
      description: "Responsable de l'architecture technique, des systèmes intelligents, de la data science et de la conception électronique du boîtier.",
      photo: 'assets/images/team/ibrahim-diallo.jpg',
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com'
    },
    {
      id: 'niakale',
      prenom: 'Niakalé',
      nom: 'DIAKITE',
      poste: 'Full Stack Developer',
      description: "Responsable de la conception et du développement de l’application web et mobile.",
      photo: 'assets/images/team/niakale-diakite.jpg',
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com'
    },
    {
      id: 'jeanne',
      prenom: 'Jeanne - Marie',
      nom: 'SAMAKE',
      poste: 'Brand Designer',
      description: "Chargé de l'identité visuelle, de l'UI/UX design et de la cohérence de la marque sur l'ensemble des canaux de communication.",
      photo: 'assets/images/team/jeanne-samake.jpg',
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com'
    }
  ];

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardIndex = this.memberCardRefs.toArray().findIndex(
            (ref) => ref.nativeElement === entry.target
          );
          if (cardIndex !== -1) {
            this.membersInView.update((states) => {
              const next = [...states];
              next[cardIndex] = entry.isIntersecting;
              return next;
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    this.memberCardRefs.forEach((ref) => {
      this.observer?.observe(ref.nativeElement);
    });
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
