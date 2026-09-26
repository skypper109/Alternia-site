import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Partner {
  name: string;
  badge: string;
  color: string;
  logo?: string;
  colorClasses?: string;
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
            Ils sont avec nous
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
              
              <!-- Logo Image Officiel ou Icône SVG stylisée aux couleurs distinctes -->
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
                  class="w-10 h-10 rounded-xl flex items-center justify-center shadow-xs flex-shrink-0"
                  [ngClass]="partner.colorClasses"
                >
                  <!-- Une seule et unique icône académique élégante, déclinée en différentes couleurs -->
                  <svg class="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
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
  readonly partners: (Partner & { colorClasses: string })[] = [
    {
      name: 'Orange Digital Center',
      badge: 'ODC',
      color: 'accent',
      colorClasses: 'bg-accent/15 text-accent',
      logo: 'assets/images/Partenaires/ODC.jpg'
    },
    {
      name: 'Lycée Rosé Abantara',
      badge: 'LRA',
      color: 'secondary',
      colorClasses: 'bg-secondary/15 text-secondary',
      logo: 'assets/images/Partenaires/Rosey Abantara.jpg'
    },
    {
      name: 'Complexe scolaire Adiara',
      badge: 'CSA',
      color: 'primary',
      colorClasses: 'bg-primary/10 text-primary',
      logo: 'assets/images/Partenaires/CSM Adiara.png'
    },
    {
      name: 'Lycée Relais des Mamans',
      badge: 'LRM',
      color: 'emerald',
      colorClasses: 'bg-emerald-50 text-emerald-600 border border-emerald-200/60'
    },
    {
      name: 'Lycée Kanitao',
      badge: 'LK',
      color: 'amber',
      colorClasses: 'bg-amber-50 text-amber-600 border border-amber-200/60'
    },
    {
      name: 'Lycée BMS',
      badge: 'BMS',
      color: 'indigo',
      colorClasses: 'bg-indigo-50 text-indigo-600 border border-indigo-200/60'
    }
  ];

  get partnersDoubled(): Partner[] {
    return [...this.partners, ...this.partners, ...this.partners];
  }
}
