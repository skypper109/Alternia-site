import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';

import { HeroSectionComponent } from './sections/hero-section/hero-section.component';
import { ProblemSectionComponent } from './sections/problem-section/problem-section.component';
import { SolutionSectionComponent } from './sections/solution-section/solution-section.component';
import { PartnersSectionComponent } from './sections/partners-section/partners-section.component';
import { EducationSectionComponent } from './sections/education-section/education-section.component';
import { CultureSectionComponent } from './sections/culture-section/culture-section.component';
import { AvatarSectionComponent } from './sections/avatar-section/avatar-section.component';
import { TeamSectionComponent } from './sections/team-section/team-section.component';
import { ContactSectionComponent } from './sections/contact-section/contact-section.component';
import { FloatingWhatsappComponent } from '../../shared/components/floating-whatsapp/floating-whatsapp.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    ProblemSectionComponent,
    SolutionSectionComponent,
    PartnersSectionComponent,
    EducationSectionComponent,
    CultureSectionComponent,
    AvatarSectionComponent,
    TeamSectionComponent,
    ContactSectionComponent,
    FloatingWhatsappComponent
  ],
  template: `
    <!-- 1. ACCUEIL — HERO CENTRÉ EN 3 LIGNES SANS TAGS SUPERFLUS -->
    <app-hero-section />

    <!-- 2. ACCUEIL — VALEUR AJOUTÉE & CADRES PARENTS / ÉCOLES -->
    <app-problem-section />

    <!-- 3. ACCUEIL — SOLUTION AVEC ROADMAP VISUELLE 8 ÉTAPES EN ZIGZAG -->
    <app-solution-section />

    <!-- 4. ACCUEIL — ILS NOUS FONT CONFIANCE -->
    <app-partners-section />

    <!-- 5. ÉDUCATION — PROGRAMME MALIEN, BOÎTIER & DÉMONSTRATION VIDÉO -->
    <app-education-section />

    <!-- 6. CULTURE — GRAND-PÈRE CONTEUR & 4 PILIERS SUR LIGNE POINTILLÉE -->
    <app-culture-section />

    <!-- 7. AVATAR — LES 3 AVATARS PERSONNALISÉS -->
    <app-avatar-section />

    <!-- 8. ÉQUIPE -->
    <section id="equipe" class="py-10 sm:py-14 lg:py-16 bg-[#F8F9FB] relative border-t border-slate-200/70">
      <div class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <app-team-section />
      </div>
    </section>

    <!-- 9. CONTACT & DEMANDE DE DÉMO (Cible directe du bouton Contact dans la navbar) -->
    <section id="contact" class="py-12 sm:py-16 lg:py-20 bg-white relative border-t border-slate-200/70 scroll-mt-20">
      <div class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <app-contact-section />
      </div>
    </section>

    <!-- BOUTON FLOTTANT WHATSAPP PERMANENT -->
    <app-floating-whatsapp />
  `
})
export class HomeComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setMeta({
      title: "ALTERNIA — L'Alternative pour apprendre autrement sans oublier notre culture",
      description: "Site officiel du projet ALTERNIA : boîtier intelligent et assistant virtuel dédié aux élèves, parents et établissements au Mali."
    });
  }
}
