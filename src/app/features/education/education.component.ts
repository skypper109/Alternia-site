import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { CtaButtonComponent } from '../../shared/components/cta-button/cta-button.component';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';
import { SeoService } from '../../core/services/seo.service';

interface Feature {
  title: string;
  description: string;
  iconPath: string;
}

interface DeviceTier {
  label: string;
  tag: string;
  tagColor: 'primary' | 'accent';
  features: string[];
  context: string;
  highlight: boolean;
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionTitleComponent, CtaButtonComponent, FadeInDirective],
  template: `
    <!-- ======== HERO ÉDUCATION ======== -->
    <section class="py-16 md:py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto text-center" [appFadeIn]="0">
          <app-section-title
            label="Éducation"
            title="Un assistant virtuel pour chaque élève"
            subtitle="Votre enfant ne comprend pas une notion ? Il peut la demander, l'écouter et la faire reformuler, à tout moment."
            [centered]="true"
          />
          <div class="mt-8 flex flex-wrap justify-center gap-3">
            <app-cta-button routerLink="/contact" variant="primary" size="md" [shimmer]="true">
              Demander une présentation
            </app-cta-button>
            <app-cta-button routerLink="/avatar" variant="outline" size="md">
              Découvrir les avatars
            </app-cta-button>
          </div>
        </div>
      </div>
    </section>

    <!-- ======== PROGRAMME SCOLAIRE MALIEN ======== -->
    <section class="py-12 bg-primary">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" [appFadeIn]="0">
        <div class="flex items-center justify-center gap-3 mb-4">
          <div class="w-8 h-px bg-white/30"></div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <div class="w-8 h-px bg-white/30"></div>
        </div>
        <p class="text-white/80 text-sm font-medium tracking-wide uppercase mb-3">Un contenu adapté</p>
        <h2 class="font-heading text-2xl md:text-3xl text-white font-semibold leading-tight">
          ALTERNIA est basé exclusivement sur le programme scolaire malien en vigueur
        </h2>
        <p class="mt-4 text-white/65 text-base max-w-2xl mx-auto">
          Chaque réponse, chaque explication, chaque exercice proposé correspond aux contenus du système éducatif malien.
          Rien de hors programme, tout ce qui est enseigné en classe.
        </p>
      </div>
    </section>

    <!-- ======== FONCTIONNALITÉS ASSISTANT ======== -->
    <section class="py-16 md:py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div [appFadeIn]="0">
          <app-section-title
            label="Ce que fait l'assistant"
            title="Des fonctionnalités concrètes, au service de l'élève"
            [centered]="true"
          />
        </div>

        <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          @for (feature of features; track $index) {
            <div [appFadeIn]="$index * 70" class="card-base p-6">
              <div class="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                   [style.background]="$index % 3 === 0 ? 'rgba(49,73,153,0.08)' : $index % 3 === 1 ? 'rgba(64,187,204,0.08)' : 'rgba(241,133,31,0.08)'">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                     [attr.stroke]="$index % 3 === 0 ? '#314999' : $index % 3 === 1 ? '#40BBCC' : '#F1851F'"
                     stroke-width="2" aria-hidden="true">
                  <path [attr.d]="feature.iconPath"/>
                </svg>
              </div>
              <h3 class="font-heading font-semibold text-primary text-lg mb-2">{{ feature.title }}</h3>
              <p class="text-gray-500 text-sm leading-relaxed">{{ feature.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ======== BOÎTIER : BASE VS PREMIUM ======== -->
    <section class="py-16 md:py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div [appFadeIn]="0">
          <app-section-title
            label="Le boîtier"
            title="Deux niveaux, une même mission"
            subtitle="Un boîtier conçu pour s'adapter à tous les contextes, de la classe à la maison."
            [centered]="true"
          />
        </div>

        <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          @for (tier of deviceTiers; track $index) {
            <div
              [appFadeIn]="$index * 120"
              class="card-base p-7 flex flex-col relative overflow-hidden"
              [ngClass]="{ 'border-2 border-primary': tier.highlight }"
            >
              @if (tier.highlight) {
                <div class="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary"></div>
              }

              <div class="mb-5">
                <span
                  class="inline-block text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                  [ngClass]="{
                    'bg-gray-100 text-gray-500': !tier.highlight,
                    'bg-primary/10 text-primary': tier.highlight
                  }"
                >
                  {{ tier.tag }}
                </span>
                <h3 class="font-heading text-xl text-primary mt-3 font-semibold">{{ tier.label }}</h3>
              </div>

              <ul class="space-y-2.5 flex-1 mb-6">
                @for (feat of tier.features; track $index) {
                  <li class="flex items-start gap-2.5 text-sm text-gray-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                         [attr.stroke]="tier.highlight ? '#314999' : '#40BBCC'"
                         stroke-width="2.5" class="flex-shrink-0 mt-0.5" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {{ feat }}
                  </li>
                }
              </ul>

              <p class="text-gray-400 text-xs leading-relaxed border-t border-gray-100 pt-4">
                {{ tier.context }}
              </p>
            </div>
          }
        </div>

        <!-- Note importante -->
        <div [appFadeIn]="200" class="mt-8 max-w-4xl mx-auto">
          <div class="bg-secondary/5 border border-secondary/20 rounded-xl p-4 flex items-start gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#40BBCC" stroke-width="2" class="flex-shrink-0 mt-0.5" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p class="text-gray-500 text-sm leading-relaxed">
              <strong class="text-primary">Note :</strong> Les fonctionnalités de personnalisation vocale, d'avatar et de suivi à distance sont exclusives à la version Premium. La version de base reste complète pour l'usage pédagogique quotidien.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ======== VIDÉO DE PRÉSENTATION ======== -->
    <section class="py-16 md:py-24 bg-primary">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div [appFadeIn]="0" class="text-center mb-10">
          <span class="inline-block text-secondary text-xs font-semibold tracking-widest uppercase mb-3 px-3 py-1 bg-white/10 rounded-full">
            Présentation complète
          </span>
          <h2 class="font-heading text-3xl md:text-4xl text-white mt-3 mb-4">
            Comprendre ALTERNIA en quelques minutes
          </h2>
          <p class="text-white/65 text-base max-w-xl mx-auto">
            Découvrez le problème, la solution, le boîtier, les avatars et la vision du projet.
          </p>
        </div>

        <!-- Video container -->
        <div [appFadeIn]="100" class="relative">
          <div class="video-container shadow-2xl border-2 border-white/10">
            <!-- TODO: Replace VIDEO_ID with real YouTube ID -->
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1"
              title="Présentation du projet ALTERNIA"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div [appFadeIn]="200" class="text-center mt-8">
          <app-cta-button
            routerLink="/contact"
            variant="secondary"
            size="lg"
            [shimmer]="true"
          >
            Demander une présentation personnalisée
          </app-cta-button>
        </div>
      </div>
    </section>

    <!-- ======== CTA ======== -->
    <section class="py-12 bg-gray-50">
      <div class="max-w-2xl mx-auto px-4 sm:px-6 text-center" [appFadeIn]="0">
        <p class="text-gray-500 text-base mb-6">
          Une classe compte plusieurs niveaux de compréhension. ALTERNIA aide chacun à avancer à son rythme.
        </p>
        <app-cta-button routerLink="/contact" variant="primary" size="md">
          Prendre contact
        </app-cta-button>
      </div>
    </section>
  `
})
export class EducationComponent implements OnInit {
  readonly features: Feature[] = [
    {
      title: 'Réponses vocales',
      description: "L'élève parle, l'assistant répond à voix haute. Une interaction naturelle et accessible à tous.",
      iconPath: 'M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2'
    },
    {
      title: 'Affichage textuel',
      description: "La réponse s'affiche également à l'écran pour une meilleure compréhension et mémorisation.",
      iconPath: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 0 3-3h7z'
    },
    {
      title: 'Reformulation',
      description: "Si l'explication n'est pas comprise, l'élève demande une reformulation. L'assistant s'adapte.",
      iconPath: 'M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8M3 3v5h5'
    },
    {
      title: 'Aide aux exercices',
      description: "L'assistant guide l'élève dans la résolution d'exercices sans lui donner directement la réponse.",
      iconPath: 'M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z'
    },
    {
      title: 'Révision guidée',
      description: "Des séances de révision structurées, progressives, adaptées aux points de difficulté de l'élève.",
      iconPath: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20'
    },
    {
      title: 'Préparation aux examens',
      description: "L'assistant aide à identifier les notions clés et à s'entraîner avant les épreuves importantes.",
      iconPath: 'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'
    }
  ];

  readonly deviceTiers: DeviceTier[] = [
    {
      label: 'Version de base',
      tag: 'Standard',
      tagColor: 'primary',
      highlight: false,
      features: [
        'Interaction par voix orale',
        'Réponse orale et affichage textuel',
        'Utilisation par plusieurs élèves',
        'Fonctionne sans connexion internet',
        'Accès aux fonctions pédagogiques hors ligne',
        'Aide aux devoirs, révisions, examens'
      ],
      context: "Un seul boîtier peut être utilisé successivement par plusieurs élèves en classe ou par plusieurs enfants à la maison."
    },
    {
      label: 'Version Premium',
      tag: 'Premium',
      tagColor: 'accent',
      highlight: true,
      features: [
        'Tout ce que la version de base propose',
        'Clonage et personnalisation de voix',
        'Avatar de l\'enseignant à l\'écran',
        'Avatar du parent à l\'écran',
        'Interaction vocale personnalisée',
        'Suivi à distance et recommandations'
      ],
      context: "La version Premium rapproche l'élève de son enseignant et de son parent grâce à une expérience personnalisée et un suivi détaillé."
    }
  ];

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setMeta({
      title: 'Éducation & Boîtier Intelligent',
      description: "Découvrez les fonctionnalités pédagogiques d'ALTERNIA. Assistant virtuel, révisions, préparation aux examens. Basé sur le programme scolaire malien."
    });
  }
}
