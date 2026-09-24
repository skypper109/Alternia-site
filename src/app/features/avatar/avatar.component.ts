import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { CtaButtonComponent } from '../../shared/components/cta-button/cta-button.component';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';
import { SeoService } from '../../core/services/seo.service';

interface AvatarType {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  color: 'primary' | 'secondary' | 'accent';
  badge: string;
  features: string[];
}

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionTitleComponent, CtaButtonComponent, FadeInDirective],
  template: `
    <!-- ======== HERO AVATAR ======== -->
    <section class="py-16 md:py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto text-center" [appFadeIn]="0">
          <app-section-title
            label="Avatars personnalisés"
            title="Une présence virtuelle familière, proche et rassurante"
            subtitle="L'avatar n'est pas un personnage générique. C'est une représentation personnalisée qui rapproche l'élève de son enseignant, de son parent ou de la culture de son peuple."
            [centered]="true"
          />
        </div>
      </div>
    </section>

    <!-- ======== LES 3 AVATARS ======== -->
    <section class="py-16 md:py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          @for (avatar of avatarTypes; track avatar.id) {
            <div
              [appFadeIn]="$index * 100"
              class="card-base p-7 flex flex-col relative overflow-hidden group"
            >
              <!-- Color accent top -->
              <div class="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
                   [ngClass]="{
                     'bg-primary': avatar.color === 'primary',
                     'bg-secondary': avatar.color === 'secondary',
                     'bg-accent': avatar.color === 'accent'
                   }"></div>

              <!-- Avatar visual -->
              <div class="flex justify-center mb-6">
                <div
                  class="w-20 h-20 rounded-2xl flex items-center justify-center"
                  [ngClass]="{
                    'bg-primary/10': avatar.color === 'primary',
                    'bg-secondary/10': avatar.color === 'secondary',
                    'bg-accent/10': avatar.color === 'accent'
                  }"
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                       [attr.stroke]="avatar.color === 'primary' ? '#314999' : avatar.color === 'secondary' ? '#40BBCC' : '#F1851F'"
                       stroke-width="1.5" aria-hidden="true">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                  </svg>
                </div>
              </div>

              <!-- Badge -->
              <div class="text-center mb-4">
                <span
                  class="inline-block text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                  [ngClass]="{
                    'bg-primary/10 text-primary': avatar.color === 'primary',
                    'bg-secondary/10 text-secondary': avatar.color === 'secondary',
                    'bg-accent/10 text-accent': avatar.color === 'accent'
                  }"
                >
                  {{ avatar.badge }}
                </span>
              </div>

              <h3 class="font-heading font-semibold text-primary text-xl text-center mb-1">{{ avatar.title }}</h3>
              <p
                class="text-xs font-medium text-center mb-3"
                [ngClass]="{
                  'text-primary/60': avatar.color === 'primary',
                  'text-secondary/70': avatar.color === 'secondary',
                  'text-accent/70': avatar.color === 'accent'
                }"
              >{{ avatar.subtitle }}</p>
              <p class="text-gray-500 text-sm leading-relaxed text-center mb-5">{{ avatar.description }}</p>

              <ul class="space-y-2 mt-auto">
                @for (feat of avatar.features; track feat) {
                  <li class="flex items-start gap-2 text-xs text-gray-500">
                    <div class="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                         [ngClass]="{
                           'bg-primary/10': avatar.color === 'primary',
                           'bg-secondary/10': avatar.color === 'secondary',
                           'bg-accent/10': avatar.color === 'accent'
                         }">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none"
                           [attr.stroke]="avatar.color === 'primary' ? '#314999' : avatar.color === 'secondary' ? '#40BBCC' : '#F1851F'"
                           stroke-width="3" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    {{ feat }}
                  </li>
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ======== EXPÉRIENCE VOCALE (diagramme animé) ======== -->
    <section class="py-16 md:py-24 bg-white">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div [appFadeIn]="0">
          <app-section-title
            label="L'expérience"
            title="Une interaction naturelle et fluide"
            subtitle="Les échanges avec le boîtier se font principalement par la voix. Voici comment cela se passe."
            [centered]="true"
          />
        </div>

        <!-- Flow diagram -->
        <div [appFadeIn]="100" class="mt-14">

          <!-- Desktop flow -->
          <div class="hidden md:flex items-center justify-center gap-0">
            @for (step of flowSteps; track $index) {
              <div class="flex items-center">
                <!-- Step node -->
                <div class="flex flex-col items-center gap-3 w-36">
                  <div
                    class="w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm"
                    [ngClass]="{
                      'bg-primary': $index === 0,
                      'bg-secondary': $index === 1,
                      'bg-primary/10': $index === 2,
                      'bg-secondary/10': $index === 3
                    }"
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                         [attr.stroke]="$index < 2 ? 'white' : $index === 2 ? '#314999' : '#40BBCC'"
                         stroke-width="1.8" aria-hidden="true">
                      <path [attr.d]="step.iconPath"/>
                    </svg>
                  </div>
                  <div class="text-center">
                    <p class="font-semibold text-primary text-sm leading-tight">{{ step.label }}</p>
                    <p class="text-gray-400 text-xs mt-1 leading-snug">{{ step.sublabel }}</p>
                  </div>
                </div>

                <!-- Arrow between steps -->
                @if ($index < flowSteps.length - 1) {
                  <div class="flex flex-col items-center px-2">
                    <svg width="40" height="16" viewBox="0 0 40 16" aria-hidden="true">
                      <line x1="0" y1="8" x2="32" y2="8"
                            [attr.stroke]="$index === 0 ? '#314999' : '#40BBCC'"
                            stroke-width="1.5" stroke-dasharray="4 3" class="flow-arrow"/>
                      <polyline points="26,3 36,8 26,13"
                                [attr.stroke]="$index === 0 ? '#314999' : '#40BBCC'"
                                stroke-width="1.5" fill="none"/>
                    </svg>
                  </div>
                }
              </div>
            }
          </div>

          <!-- Mobile flow (vertical) -->
          <div class="md:hidden space-y-4">
            @for (step of flowSteps; track $index) {
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  [ngClass]="{
                    'bg-primary': $index === 0,
                    'bg-secondary': $index === 1,
                    'bg-primary/10': $index === 2,
                    'bg-secondary/10': $index === 3
                  }"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                       [attr.stroke]="$index < 2 ? 'white' : $index === 2 ? '#314999' : '#40BBCC'"
                       stroke-width="2" aria-hidden="true">
                    <path [attr.d]="step.iconPath"/>
                  </svg>
                </div>
                <div class="flex-1 card-base p-3">
                  <p class="font-semibold text-primary text-sm">{{ step.label }}</p>
                  <p class="text-gray-400 text-xs mt-0.5">{{ step.sublabel }}</p>
                </div>
              </div>

              @if ($index < flowSteps.length - 1) {
                <div class="ml-6 w-px h-4 bg-gradient-to-b from-primary/30 to-secondary/30"></div>
              }
            }
          </div>
        </div>

        <!-- Premium note -->
        <div [appFadeIn]="200" class="mt-12 max-w-2xl mx-auto">
          <div class="bg-primary/5 border border-primary/15 rounded-xl p-5 text-center">
            <span class="inline-block bg-accent text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
              Version Premium
            </span>
            <p class="text-primary font-heading font-semibold text-base mb-1">
              L'avatar apparaît à l'écran
            </p>
            <p class="text-gray-500 text-sm leading-relaxed">
              Dans la version Premium, le visage de l'enseignant ou du parent s'affiche lors des interactions, rendant l'expérience encore plus proche et personnalisée.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ======== CTA ======== -->
    <section class="py-12 bg-gray-50">
      <div class="max-w-2xl mx-auto px-4 sm:px-6 text-center" [appFadeIn]="0">
        <h2 class="font-heading text-2xl text-primary mb-4">
          Vous n'êtes pas disponible ? Son assistant virtuel peut continuer à l'aider.
        </h2>
        <app-cta-button routerLink="/contact" variant="primary" size="md" [shimmer]="true">
          En savoir plus sur la version Premium
        </app-cta-button>
      </div>
    </section>
  `
})
export class AvatarComponent implements OnInit {
  readonly avatarTypes: AvatarType[] = [
    {
      id: 'enseignant',
      title: 'Avatar Enseignant',
      subtitle: 'Pour les établissements scolaires',
      badge: 'Pédagogique',
      color: 'primary',
      description: "Retrouvez une représentation virtuelle de votre enseignant pour expliquer certaines notions et accompagner les révisions. L'élève garde un lien familier avec son professeur.",
      features: [
        'Voix personnalisée de l\'enseignant',
        'Explications dans le style du prof',
        'Continuité entre classe et maison',
        'Révisions guidées après les cours'
      ]
    },
    {
      id: 'parent',
      title: 'Avatar Parent',
      subtitle: 'Pour les familles',
      badge: 'Familial',
      color: 'secondary',
      description: "Une représentation personnalisée du parent peut accompagner l'enfant même lorsque celui-ci n'est pas disponible. Une présence chaleureuse et rassurante à tout moment.",
      features: [
        'Voix du parent personnalisée',
        'Présence rassurante pour l\'enfant',
        'Motivation et encouragements',
        'Suivi des progrès à distance'
      ]
    },
    {
      id: 'culturel',
      title: 'Avatar Culturel',
      subtitle: 'Le Grand-Père conteur',
      badge: 'Culturel',
      color: 'accent',
      description: "C'est le personnage grand-père qui raconte les histoires, les récits, les traditions et les parcours des grandes figures africaines. Un conteur de mémoire collective.",
      features: [
        'Récits et contes africains',
        'Parcours de figures historiques',
        'Traditions et événements culturels',
        'Exploration des grandes villes'
      ]
    }
  ];

  readonly flowSteps = [
    {
      label: "L'élève parle",
      sublabel: 'Interaction vocale',
      iconPath: 'M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2'
    },
    {
      label: 'Le boîtier comprend',
      sublabel: 'Traitement de la demande',
      iconPath: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01'
    },
    {
      label: "L'avatar répond",
      sublabel: 'Réponse vocale + affichage',
      iconPath: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12'
    },
    {
      label: "L'élève comprend",
      sublabel: 'Lecture + écoute',
      iconPath: 'M9 11l3 3L22 4'
    }
  ];

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setMeta({
      title: 'Avatars Personnalisés ALTERNIA',
      description: "Découvrez les avatars ALTERNIA : avatar enseignant, avatar parent, avatar culturel (le grand-père conteur). Une présence virtuelle qui rapproche l'élève de ses proches."
    });
  }
}
