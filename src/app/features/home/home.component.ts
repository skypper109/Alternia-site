import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';

import { HeroSectionComponent } from './sections/hero-section/hero-section.component';
import { ProblemSectionComponent } from './sections/problem-section/problem-section.component';
import { SolutionSectionComponent } from './sections/solution-section/solution-section.component';
import { PartnersSectionComponent } from './sections/partners-section/partners-section.component';
import { EducationSectionComponent } from './sections/education-section/education-section.component';
import { SavingsCalculatorComponent } from './sections/savings-calculator/savings-calculator.component';
import { AiSimulatorComponent } from './sections/ai-simulator/ai-simulator.component';
import { CultureSectionComponent } from './sections/culture-section/culture-section.component';
import { CultureAudioComponent } from './sections/culture-audio/culture-audio.component';
import { AvatarSectionComponent } from './sections/avatar-section/avatar-section.component';
import { FaqSectionComponent } from './sections/faq-section/faq-section.component';
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
    SavingsCalculatorComponent,
    AiSimulatorComponent,
    CultureSectionComponent,
    CultureAudioComponent,
    AvatarSectionComponent,
    FaqSectionComponent,
    TeamSectionComponent,
    ContactSectionComponent,
    FloatingWhatsappComponent
  ],
  template: `
    <!-- 1. ACCUEIL — HERO CENTRÉ -->
    <app-hero-section />

    <!-- 2. ORIGINE DU PROJET — VALEUR AJOUTÉE PARENTS / ÉCOLES -->
    <app-problem-section />

    <!-- 3. NOTRE SOLUTION — 5 MÉTHODES CLÉS -->
    <app-solution-section />

    <!-- 4. PARTENAIRES — ILS NOUS FONT CONFIANCE -->
    <app-partners-section />

    <!-- 5. ÉDUCATION — BOÎTIER ALTA, OFFRES & VIDÉO -->
    <app-education-section />

    <!-- 6. CALCULATEUR D'ÉCONOMIES POUR LES PARENTS -->
    <app-savings-calculator />

    <!-- 7. SIMULATEUR D'IA EN DIRECT (TESTS SCOLAIRES & CULTURELS) -->
    <app-ai-simulator />

    <!-- 8. CULTURE — GRAND-PÈRE CONTEUR & 4 PILIERS -->
    <app-culture-section />

    <!-- 9. IMMERSION AUDIO & PROVERBES BAMANANKAN -->
    <app-culture-audio />

    <!-- 10. AVATAR — LES 3 AVATARS PERSONNALISÉS -->
    <app-avatar-section />

    <!-- 11. FAQ ACCORDÉON INTERACTIVE -->
    <app-faq-section />

    <!-- 12. ÉQUIPE & FORMULAIRE DE CONTACT -->
    <section id="contact" class="py-6 sm:py-8 lg:py-10 bg-[#F8F9FB] relative border-t border-slate-200/70">
      <div class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        <!-- ÉQUIPE -->
        <app-team-section />

        <!-- FORMULAIRE DE CONTACT -->
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
