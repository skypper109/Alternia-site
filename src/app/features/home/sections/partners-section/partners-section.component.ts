import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Partner {
  name: string;
  badge: string;
  color: string;
  logo?: string;
}

@Component({
  selector: 'app-partners-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-10 sm:py-14 bg-[#F8F9FB] border-y border-slate-200/80 overflow-hidden" aria-label="Partenaires de confiance">
      
      <!-- En-tête avec titre harmonisé et soulignement artistique stylisé -->
      <div class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-6 sm:mb-8 text-center">
        <div class="inline-block relative">
          <h2 class="font-heading text-xl sm:text-2xl md:text-3xl text-primary font-bold tracking-tight leading-snug">
            Ils nous font confiance
          </h2>
          
          <!-- Trait de soulignement artistique calligraphique / brush stroke -->
          <svg
            class="brush-stroke-svg w-full h-3.5 text-secondary -bottom-2.5 left-0"
            viewBox="0 0 320 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M3 14C60 6 180 3 317 12C240 7 120 9 5 17"
              stroke="currentColor"
              stroke-width="4.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>

      <!-- Bandeau défilant avec vrais logos et badges partenaires -->
      <div class="marquee-wrapper pt-2">
        <div class="marquee-content">
          @for (partner of partnersDoubled; track $index) {
            <div class="flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-white border border-slate-200 shadow-sm flex-shrink-0 hover:border-primary/40 hover:shadow-md transition-all">
              
              <!-- Logo Image Officiel ou Badge stylisé -->
              @if (partner.logo) {
                <div class="w-10 h-10 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center p-1 flex-shrink-0 shadow-xs">
                  <img
                    [src]="partner.logo"
                    [alt]="partner.name"
                    class="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              } @else {
                <div
                  class="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0"
                  [ngClass]="{
                    'bg-primary/10 text-primary': partner.color === 'primary',
                    'bg-secondary/15 text-secondary': partner.color === 'secondary',
                    'bg-accent/15 text-accent': partner.color === 'accent'
                  }"
                >
                  {{ partner.badge }}
                </div>
              }

              <!-- Nom de l'établissement / partenaire -->
              <span class="font-heading font-bold text-slate-800 text-sm whitespace-nowrap">
                {{ partner.name }}
              </span>

            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class PartnersSectionComponent {
  readonly partners: Partner[] = [
    {
      name: 'Orange Digital Center',
      badge: 'ODC',
      color: 'accent',
      logo: 'assets/images/Partenaires/ODC.jpg'
    },
    {
      name: 'Lycée Rosé Abantara',
      badge: 'LRA',
      color: 'secondary',
      logo: 'assets/images/Partenaires/Rosey Abantara.jpg'
    },
    {
      name: 'Complexe scolaire Adiara',
      badge: 'CSA',
      color: 'primary',
      logo: 'assets/images/Partenaires/CSM Adiara.png'
    },
    {
      name: 'Lycée Relais des Mamans',
      badge: 'LRM',
      color: 'secondary'
    },
    {
      name: 'Lycée Kanitao',
      badge: 'LK',
      color: 'accent'
    },
    {
      name: 'Lycée BMS',
      badge: 'BMS',
      color: 'primary'
    }
  ];

  get partnersDoubled(): Partner[] {
    return [...this.partners, ...this.partners, ...this.partners];
  }
}
