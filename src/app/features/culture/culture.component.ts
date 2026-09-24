import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { CtaButtonComponent } from '../../shared/components/cta-button/cta-button.component';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';
import { SeoService } from '../../core/services/seo.service';

interface CultureCategory {
  title: string;
  description: string;
  iconPath: string;
  examples: string[];
}

@Component({
  selector: 'app-culture',
  standalone: true,
  imports: [RouterLink, SectionTitleComponent, CtaButtonComponent, FadeInDirective],
  template: `
    <!-- ======== HERO CULTURE ======== -->
    <section class="py-16 md:py-24 bg-white relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div class="absolute top-0 left-0 w-72 h-72 bg-accent/4 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/4 translate-y-1/4"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto text-center" [appFadeIn]="0">
          <app-section-title
            label="Culture africaine"
            title="Apprendre le monde sans oublier d'où l'on vient."
            subtitle="ALTERNIA ne s'arrête pas aux matières scolaires. Il ouvre également une fenêtre sur l'histoire, les récits et la richesse culturelle du continent africain."
            [centered]="true"
          />
          <div class="mt-8">
            <app-cta-button routerLink="/avatar" variant="primary" size="md" [shimmer]="true">
              Découvrir l'avatar culturel
            </app-cta-button>
          </div>
        </div>
      </div>
    </section>

    <!-- ======== PERSONNAGE GRAND-PÈRE ======== -->
    <section class="py-16 md:py-24 bg-primary">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <!-- Avatar representation -->
          <div [appFadeIn]="0" class="flex justify-center lg:justify-start">
            <div class="relative">
              <!-- Avatar circle -->
              <div class="w-56 h-56 md:w-64 md:h-64 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20 relative">
                <!-- Decorative ring -->
                <div class="absolute inset-0 rounded-full border border-white/10 scale-110"></div>
                <div class="absolute inset-0 rounded-full border border-white/5 scale-125"></div>

                <!-- Silhouette of elder -->
                <div class="w-36 h-36 flex flex-col items-center justify-end">
                  <!-- Head -->
                  <div class="w-14 h-14 bg-white/20 rounded-full mb-1 flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.5" aria-hidden="true">
                      <circle cx="12" cy="8" r="4"/>
                      <path d="M20 21a8 8 0 1 0-16 0"/>
                    </svg>
                  </div>
                  <!-- Body suggestion -->
                  <div class="w-20 h-16 bg-white/10 rounded-t-2xl"></div>
                </div>

                <!-- Animated speaking dots -->
                <div class="absolute bottom-4 right-4 flex items-center gap-1">
                  <div class="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce" style="animation-delay:0ms"></div>
                  <div class="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce" style="animation-delay:150ms"></div>
                  <div class="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce" style="animation-delay:300ms"></div>
                </div>
              </div>

              <!-- Label badge -->
              <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-semibold px-4 py-1.5 rounded-full whitespace-nowrap shadow-lg">
                Le conteur — Avatar culturel
              </div>
            </div>
          </div>

          <!-- Text -->
          <div [appFadeIn]="100">
            <span class="inline-block text-secondary/80 text-xs font-semibold tracking-widest uppercase mb-4 px-3 py-1 bg-white/10 rounded-full">
              Transmission & mémoire
            </span>
            <h2 class="font-heading text-3xl md:text-4xl text-white mb-5 leading-tight">
              Le Grand-Père virtuel — un conteur de mémoire
            </h2>
            <p class="text-white/70 text-base leading-relaxed mb-5">
              Dans la partie culturelle d'ALTERNIA, un personnage virtuel de type « grand-père » prend la parole pour raconter. Sa voix, chaleureuse et posée, donne une sensation de transmission, de proximité et de mémoire.
            </p>
            <p class="text-white/70 text-base leading-relaxed">
              Ce n'est pas un cours. C'est une expérience de découverte — comme écouter un aîné raconter l'histoire de son peuple, les légendes de son village, les parcours de figures qui ont marqué l'Afrique.
            </p>
            <div class="mt-6 flex flex-wrap gap-3">
              @for (tag of storytellerTags; track tag) {
                <span class="bg-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full border border-white/10">
                  {{ tag }}
                </span>
              }
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ======== CE QUE VOUS DÉCOUVRIREZ ======== -->
    <section class="py-16 md:py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div [appFadeIn]="0">
          <app-section-title
            label="Contenu culturel"
            title="Ce que vous allez découvrir"
            subtitle="Quatre domaines de découverte pour enrichir la vision de l'élève au-delà des cours."
            [centered]="true"
          />
        </div>

        <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          @for (category of categories; track $index) {
            <div [appFadeIn]="$index * 100" class="card-base p-7">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                       [attr.stroke]="$index % 2 === 0 ? '#314999' : '#40BBCC'"
                       stroke-width="2" aria-hidden="true">
                    <path [attr.d]="category.iconPath"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-heading font-semibold text-primary text-lg mb-2">{{ category.title }}</h3>
                  <p class="text-gray-500 text-sm leading-relaxed mb-4">{{ category.description }}</p>
                  <div class="flex flex-wrap gap-2">
                    @for (example of category.examples; track example) {
                      <span class="bg-secondary/8 text-secondary text-xs px-2.5 py-1 rounded-full border border-secondary/15">
                        {{ example }}
                      </span>
                    }
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ======== EXPLORATION VIRTUELLE ======== -->
    <section class="py-16 md:py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div [appFadeIn]="0">
            <app-section-title
              label="Exploration"
              title="Les grandes villes africaines à portée de voix"
              subtitle="L'élève peut découvrir l'histoire, la géographie et la culture de grandes villes du continent africain."
              [centered]="false"
            />

            <div class="mt-8 space-y-4">
              @for (city of cities; track city.name) {
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-primary/8 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#314999" stroke-width="2" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <span class="font-medium text-primary text-sm">{{ city.name }}</span>
                    <span class="text-gray-400 text-xs ml-2">{{ city.country }}</span>
                  </div>
                </div>
              }
            </div>

            <div class="mt-8">
              <p class="text-gray-400 text-sm italic">
                Et bien d'autres villes et régions du continent africain...
              </p>
            </div>
          </div>

          <!-- Map illustration -->
          <div [appFadeIn]="100" class="flex justify-center">
            <div class="relative w-72 h-72 md:w-80 md:h-80">
              <div class="absolute inset-0 bg-primary/5 rounded-full border border-primary/10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" class="w-32 h-32 text-primary/20" fill="currentColor" aria-hidden="true">
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM2.5 12h19M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10A15.3 15.3 0 0 1 8 12a15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <!-- City dots -->
                @for (dot of cityDots; track $index) {
                  <div
                    class="absolute w-3 h-3 bg-accent rounded-full shadow-sm animate-pulse"
                    [style.top]="dot.top"
                    [style.left]="dot.left"
                    [style.animation-delay]="dot.delay"
                  ></div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ======== CTA CULTURE ======== -->
    <section class="py-12 bg-gray-50">
      <div class="max-w-2xl mx-auto px-4 sm:px-6 text-center" [appFadeIn]="0">
        <h2 class="font-heading text-2xl text-primary mb-4">
          L'identité culturelle fait partie de l'apprentissage
        </h2>
        <p class="text-gray-500 text-base mb-6">
          Connaître d'où l'on vient renforce la confiance en soi et donne du sens aux études.
        </p>
        <app-cta-button routerLink="/contact" variant="primary" size="md" [shimmer]="true">
          Nous contacter
        </app-cta-button>
      </div>
    </section>
  `
})
export class CultureComponent implements OnInit {
  readonly storytellerTags = [
    'Histoires', 'Contes', 'Légendes', 'Événements historiques', 'Grandes figures'
  ];

  readonly categories: CultureCategory[] = [
    {
      title: 'Héros & grandes figures africaines',
      description: "Découvrir les femmes et hommes qui ont façonné l'histoire du continent. Des récits inspirants pour chaque génération.",
      iconPath: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
      examples: ['Soundiata Keïta', 'Thomas Sankara', 'Yaa Asantewaa', 'Patrice Lumumba']
    },
    {
      title: 'Contes, histoires & récits',
      description: "La tradition orale africaine transmise aux nouvelles générations. Des récits qui portent des valeurs, de la sagesse et de l'imagination.",
      iconPath: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 0 6.5 7H20',
      examples: ['Contes du Mali', 'Légendes mandingues', 'Récits de l\'Empire du Ghana', 'Fables africaines']
    },
    {
      title: 'Traditions & devinettes culturelles',
      description: "Les traditions qui font l'identité des peuples africains. Les devinettes, proverbes et coutumes qui transmettent le savoir-vivre.",
      iconPath: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01',
      examples: ['Proverbes bambara', 'Devinettes africaines', 'Cérémonies & rites', 'Savoirs ancestraux']
    },
    {
      title: 'Les grandes villes africaines',
      description: "Explorer virtuellement les cités emblématiques du continent, leur histoire, leur architecture et leur rôle dans le développement de l'Afrique.",
      iconPath: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
      examples: ['Bamako', 'Tombouctou', 'Dakar', 'Accra', 'Abidjan']
    }
  ];

  readonly cities = [
    { name: 'Bamako', country: 'Mali' },
    { name: 'Tombouctou', country: 'Mali — cité historique' },
    { name: 'Dakar', country: 'Sénégal' },
    { name: 'Accra', country: 'Ghana' },
    { name: 'Abidjan', country: "Côte d'Ivoire" },
    { name: 'Addis-Abeba', country: 'Éthiopie' }
  ];

  readonly cityDots = [
    { top: '30%', left: '40%', delay: '0ms' },
    { top: '25%', left: '35%', delay: '300ms' },
    { top: '40%', left: '32%', delay: '600ms' },
    { top: '35%', left: '52%', delay: '900ms' },
    { top: '45%', left: '48%', delay: '200ms' }
  ];

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setMeta({
      title: 'Culture & Patrimoine Africain',
      description: "Découvrez la dimension culturelle d'ALTERNIA : héros africains, contes, traditions, grandes villes. Le personnage virtuel grand-père transmet la mémoire collective."
    });
  }
}
