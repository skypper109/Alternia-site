import { Component, ElementRef, ViewChild, ViewChildren, QueryList, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-education-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="education" class="py-10 sm:py-14 lg:py-18 bg-white relative overflow-hidden border-t border-slate-200/70">
      
      <!-- ========================================================
           MOTIFS D'ARRIÈRE-PLAN : ÉDUCATION (LIGNES & COURBES FLUIDES POSITIONNÉES EN DESSOUS DES TITRES & TEXTES)
           ======================================================== -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        
        <!-- Faisceau de Courbes Fluides Continues (Positionné au centre de la maquette, sous le titre - Bleu Principal #314999) -->
        <svg class="absolute top-[39%] -left-1/4 w-[150%] h-80 text-[#314999] opacity-30 animate-ribbon-1" viewBox="0 0 1600 240" fill="none" preserveAspectRatio="none">
          <path d="M0,70 C320,170 640,30 960,150 C1280,240 1480,50 1600,110" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
          <path d="M0,120 C360,20 680,200 1000,80 C1300,0 1500,160 1600,130" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>
          <path d="M0,170 C400,240 760,60 1120,180 C1360,220 1520,90 1600,150" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        </svg>

        <!-- Faisceau de Courbes Fluides Continues Médian (Niveau Offres - Bleu Principal #314999) -->
        <svg class="absolute top-[62%] -right-1/4 w-[150%] h-80 text-[#314999] opacity-25 animate-ribbon-2" viewBox="0 0 1600 260" fill="none" preserveAspectRatio="none">
          <path d="M0,60 C300,200 700,40 1100,180 C1380,80 1520,160 1600,90" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/>
          <path d="M0,120 C380,20 740,220 1140,90 C1360,190 1480,50 1600,140" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
          <path d="M0,180 C440,250 820,90 1200,210 C1420,120 1540,180 1600,160" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>

        <!-- Faisceau de Courbes Fluides Continues Inférieur (Niveau Vidéo - Bleu Principal #314999) -->
        <svg class="absolute -bottom-8 -left-1/4 w-[150%] h-72 text-[#314999] opacity-30 animate-ribbon-1" viewBox="0 0 1600 240" fill="none" preserveAspectRatio="none">
          <path d="M0,140 C340,40 680,220 1020,100 C1320,220 1480,60 1600,130" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/>
          <path d="M0,90 C400,210 800,30 1200,170 C1400,90 1520,150 1600,100" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
        </svg>

      </div>

      <div class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        <!-- En-tête de Section Éducation avec 'L’éducation autrement' et Titre Harmonisé -->
        <div class="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-1.5 px-2 sm:px-0">
          <span class="inline-block text-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-0.5 sm:px-3.5 sm:py-1 bg-primary/10 rounded-full border border-primary/20">
            L’éducation autrement
          </span>
          <h2 class="font-heading text-base sm:text-lg md:text-xl lg:text-2xl text-primary font-bold tracking-tight leading-snug max-w-xl sm:max-w-2xl mx-auto">
            Un assistant virtuel qui aide l'élève à comprendre, réviser et progresser.
          </h2>
          <div class="section-divider"></div>
          <!-- Description sur 4 lignes -->
          <p class="text-slate-600 text-xs sm:text-sm leading-relaxed pt-1 font-medium max-w-lg sm:max-w-xl mx-auto">
            Découvrez comment ALTERNIA révolutionne l'apprentissage classique grâce à un dispositif sur-mesure pensé pour l'autonomie, l'équité et la réussite de chaque enfant.
          </p>
        </div>

        <!-- ========================================================
             LES 3 CARTES CLÉS D'ENGAGEMENT PÉDAGOGIQUE (ENTRÉE INDIVIDUELLE AU SCROLL)
             ======================================================== -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12 sm:mb-14">
          
          <!-- Carte 1 : Programme Malien (Entrée Individuelle Gauche) -->
          <div
            #keyCard
            class="p-5 sm:p-6 rounded-2xl bg-white/90 backdrop-blur-xs border border-primary/25 shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-[1300ms] ease-out flex flex-col justify-between"
            [ngClass]="{
              'opacity-0 -translate-x-14 scale-95': !isKeyCardInView(0),
              'opacity-100 translate-x-0 scale-100': isKeyCardInView(0)
            }"
          >
            <div class="space-y-2.5">
              <div class="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold shadow-xs">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <h3 class="font-heading font-bold text-slate-900 text-base sm:text-lg">Programme Scolaire Malien</h3>
              <p class="text-slate-600 text-xs sm:text-sm leading-relaxed">
                ALTERNIA est basé exclusivement sur le programme scolaire malien en vigueur pour assurer une continuité parfaite avec les cours.
              </p>
            </div>
            <span class="inline-block text-[10px] font-bold text-primary uppercase tracking-wider mt-3">100% Conforme</span>
          </div>

          <!-- Carte 2 : Sans Connexion (Entrée Individuelle Bas) -->
          <div
            #keyCard
            class="p-5 sm:p-6 rounded-2xl bg-white/90 backdrop-blur-xs border border-primary/25 shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-[1300ms] ease-out flex flex-col justify-between"
            [ngClass]="{
              'opacity-0 translate-y-14 scale-95': !isKeyCardInView(1),
              'opacity-100 translate-y-0 scale-100': isKeyCardInView(1)
            }"
          >
            <div class="space-y-2.5">
              <div class="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold shadow-xs">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <line x1="1" y1="1" x2="23" y2="23"/>
                  <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/>
                  <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/>
                  <path d="M10.71 5.05A16 16 0 0 1 22.58 9"/>
                  <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/>
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
                  <line x1="12" y1="20" x2="12.01" y2="20"/>
                </svg>
              </div>
              <h3 class="font-heading font-bold text-slate-900 text-base sm:text-lg">Utilisable Sans Connexion</h3>
              <p class="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Le dispositif fonctionne en toute autonomie sans nécessiter de connexion Internet permanente, en classe comme à la maison.
              </p>
            </div>
            <span class="inline-block text-[10px] font-bold text-primary uppercase tracking-wider mt-3">Autonomie Totale</span>
          </div>

          <!-- Carte 3 : Multi-Élèves & Simultané (Entrée Individuelle Droite) -->
          <div
            #keyCard
            class="p-5 sm:p-6 rounded-2xl bg-white/90 backdrop-blur-xs border border-primary/25 shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-[1300ms] ease-out flex flex-col justify-between"
            [ngClass]="{
              'opacity-0 translate-x-14 scale-95': !isKeyCardInView(2),
              'opacity-100 translate-x-0 scale-100': isKeyCardInView(2)
            }"
          >
            <div class="space-y-2.5">
              <div class="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold shadow-xs">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 class="font-heading font-bold text-slate-900 text-base sm:text-lg">Multi-Élèves Simultané</h3>
              <p class="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Plusieurs élèves peuvent l'utiliser simultanément via l'application pour réviser ensemble ou individuellement.
              </p>
            </div>
            <span class="inline-block text-[10px] font-bold text-primary uppercase tracking-wider mt-3">Collectif & Individuel</span>
          </div>

        </div>

        <!-- ========================================================
             MOCKUP INTERFACE APPLICATION : 'Découvrez notre application' (ENTRÉE DEPUIS LA GAUCHE)
             ======================================================== -->
        <div #mockupSection class="mb-12 sm:mb-14 text-center">
          
          <div class="mb-6 sm:mb-8 inline-block relative">
            <h3 class="font-heading text-base sm:text-lg md:text-xl lg:text-2xl text-primary font-bold tracking-tight leading-snug">
              Découvrez notre application
            </h3>
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

          <!-- Cadre complet de l'application qui entre depuis la gauche au scroll -->
          <div
            class="max-w-4xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-white transition-all duration-[1300ms] ease-out"
            [ngClass]="{
              'opacity-0 -translate-x-14 scale-95': !isMockupInView(),
              'opacity-100 translate-x-0 scale-100': isMockupInView()
            }"
          >
            <img
              src="assets/images/app-education-mockup.png"
              alt="Interface de l'application mobile et tablette ALTERNIA Éducation"
              class="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>

        </div>

        <!-- ========================================================
             CONCEPT PINBOARD : LES OFFRES (ENTRÉE INDIVIDUELLE AU SCROLL)
             ======================================================== -->
        <div
          class="mb-12 sm:mb-14 py-8 sm:py-10 px-4 sm:px-6 rounded-3xl bg-[#FAF9F6] border border-slate-200/90 shadow-inner relative overflow-hidden"
        >
          
          <div class="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none"></div>

          <!-- Grille avec items-stretch pour que toutes les cartes aient strictement la même hauteur -->
          <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch pt-4 pb-2 relative z-10">
            
            <!-- ==========================================
                 CARTE 01 — VERSION DE BASE (Entrée Individuelle)
                 ========================================== -->
            <div
              #offerCard
              class="relative group lg:-rotate-1 hover:lg:rotate-0 transition-all duration-[1300ms] ease-out flex flex-col h-full"
              [ngClass]="{
                'opacity-0 -translate-x-12 scale-95': !isOfferCardInView(0),
                'opacity-100 translate-x-0 scale-100': isOfferCardInView(0)
              }"
            >
              
              <!-- Punaise Bleue Réelle 3D Inclinée / Piquée -->
              <div class="absolute -top-6 left-1/2 -translate-x-1/2 z-30 w-10 h-14 pointer-events-none drop-shadow-md">
                <img
                  src="assets/images/punaise-bleu.svg"
                  alt="Punaise bleue piquée"
                  class="w-full h-full object-contain"
                />
              </div>

              <!-- Fiche Papier Premium avec Bordure Bleue et Hauteur 100% -->
              <div class="w-full h-full bg-white rounded-2xl p-5 sm:p-6 pt-8 border-2 border-primary/40 shadow-[0_8px_24px_rgba(49,73,153,0.08)] flex flex-col justify-between space-y-4 relative">
                
                <div class="space-y-3">
                  <div class="text-left pb-2.5 border-b border-slate-100">
                    <h3 class="font-heading text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                      Version de Base
                    </h3>
                    <p class="text-xs font-semibold text-slate-500 mt-0.5">
                      Fonctionnement hors connexion
                    </p>
                  </div>

                  <ul class="space-y-2.5 text-xs sm:text-sm text-slate-700">
                    <li class="flex items-center gap-2">
                      <span class="w-4 h-4 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[10px] font-bold flex-shrink-0">✓</span>
                      <span>Interaction vocale</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <span class="w-4 h-4 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[10px] font-bold flex-shrink-0">✓</span>
                      <span>Projection sur écran externe</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <span class="w-4 h-4 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[10px] font-bold flex-shrink-0">✓</span>
                      <span>Utilisation par plusieurs élèves</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <span class="w-4 h-4 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[10px] font-bold flex-shrink-0">✓</span>
                      <span>Accès aux fonctionnalités importantes sans connexion</span>
                    </li>
                  </ul>
                </div>

                <div class="pt-3 mt-auto">
                  <a
                    href="https://wa.me/22375260610?text=Bonjour%20ALTERNIA%2C%20je%20souhaite%20commander%20le%20bo%C3%AEtier%20Version%20de%20Base."
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-full inline-flex items-center justify-center py-2.5 sm:py-3 px-4 rounded-full bg-primary hover:bg-[#27397a] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  >
                    Commander
                  </a>
                </div>

              </div>
            </div>

            <!-- ==========================================
                 AU CENTRE : LE BOÎTIER ALTA (Entrée Individuelle)
                 ========================================== -->
            <div
              #offerCard
              class="flex flex-col items-center justify-between text-center p-5 sm:p-6 bg-white/95 backdrop-blur-sm rounded-3xl border-2 border-secondary/40 shadow-md hover:border-secondary/70 hover:shadow-lg transition-all duration-[1300ms] ease-out h-full"
              [ngClass]="{
                'opacity-0 translate-y-12 scale-95': !isOfferCardInView(1),
                'opacity-100 translate-y-0 scale-100': isOfferCardInView(1)
              }"
            >
              
              <div class="w-full flex flex-col items-center space-y-2.5">
                <span class="inline-block text-[10px] font-extrabold uppercase tracking-widest px-3 py-0.5 bg-secondary/15 text-secondary rounded-full">
                  Dispositif Intelligent
                </span>
                
                <!-- Conteneur d'image avec fond soigné pour affichage 100% visible sans rognage -->
                <div class="w-full h-44 sm:h-48 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center p-2.5 shadow-inner">
                  <img
                    src="assets/images/device/Alta1.jpeg"
                    alt="Le Boîtier ALTA"
                    class="w-full h-full object-contain hover:scale-105 transition-transform duration-300 drop-shadow-sm"
                    loading="lazy"
                  />
                </div>

                <div class="space-y-0.5">
                  <h4 class="font-heading text-lg sm:text-xl font-bold text-slate-900">
                    Le Boîtier ALTA
                  </h4>
                  <p class="text-xs text-slate-600 leading-relaxed max-w-[240px] mx-auto">
                    L'assistant vocal autonome et indépendant qui marche sans connexion
                  </p>
                </div>
              </div>

            </div>

            <!-- ==========================================
                 CARTE 02 — VERSION PREMIUM (Entrée Individuelle)
                 ========================================== -->
            <div
              #offerCard
              class="relative group lg:rotate-1 hover:lg:rotate-0 transition-all duration-[1300ms] ease-out flex flex-col h-full"
              [ngClass]="{
                'opacity-0 translate-x-12 scale-95': !isOfferCardInView(2),
                'opacity-100 translate-x-0 scale-100': isOfferCardInView(2)
              }"
            >
              
              <!-- Punaise Bleue Réelle 3D Inclinée / Piquée -->
              <div class="absolute -top-6 left-1/2 -translate-x-1/2 z-30 w-10 h-14 pointer-events-none drop-shadow-md">
                <img
                  src="assets/images/punaise-bleu.svg"
                  alt="Punaise bleue piquée"
                  class="w-full h-full object-contain"
                />
              </div>

              <!-- Fiche Papier Premium avec Bordure Bleue et Hauteur 100% -->
              <div class="w-full h-full bg-white rounded-2xl p-5 sm:p-6 pt-8 border-2 border-primary/40 shadow-[0_8px_24px_rgba(49,73,153,0.10)] flex flex-col justify-between space-y-4 relative overflow-hidden">
                
                <!-- Badge Élégant Recommandé -->
                <div class="absolute top-0 right-0 bg-primary text-white text-[9px] font-extrabold uppercase tracking-widest px-3 py-0.5 rounded-bl-xl shadow-xs">
                  Recommandé
                </div>

                <div class="space-y-3">
                  <div class="text-left pb-2.5 border-b border-slate-100">
                    <h3 class="font-heading text-lg sm:text-xl font-bold text-primary tracking-tight">
                      Version Premium
                    </h3>
                    <p class="text-xs font-semibold text-slate-500 mt-0.5">
                      Personnalisation vocale, avatars et suivi à distance
                    </p>
                  </div>

                  <ul class="space-y-2.5 text-xs sm:text-sm text-slate-700">
                    <li class="flex items-center gap-2">
                      <span class="w-4 h-4 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[10px] font-bold flex-shrink-0">✓</span>
                      <span>Clonage / personnalisation de voix</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <span class="w-4 h-4 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[10px] font-bold flex-shrink-0">✓</span>
                      <span>Avatar de l’enseignant</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <span class="w-4 h-4 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[10px] font-bold flex-shrink-0">✓</span>
                      <span>Avatar du parent</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <span class="w-4 h-4 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[10px] font-bold flex-shrink-0">✓</span>
                      <span>Affichage de l’avatar sur l’écran</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <span class="w-4 h-4 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[10px] font-bold flex-shrink-0">✓</span>
                      <span>Interaction vocale personnalisée</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <span class="w-4 h-4 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[10px] font-bold flex-shrink-0">✓</span>
                      <span>Suivi à distance et recommandation</span>
                    </li>
                  </ul>
                </div>

                <div class="pt-3 mt-auto">
                  <a
                    href="https://wa.me/22375260610?text=Bonjour%20ALTERNIA%2C%20je%20souhaite%20demander%20un%20devis%20pour%20le%20bo%C3%AEtier%20Version%20Premium."
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-full inline-flex items-center justify-center py-2.5 sm:py-3 px-4 rounded-full bg-accent hover:bg-[#d87212] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-accent/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  >
                    Demander devis
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>

        <!-- ========================================================
             VIDÉO DE DÉMONSTRATION LOCALE (ENTRÉE DEPUIS LA DROITE AU SCROLL)
             ======================================================== -->
        <div #videoSection class="mt-12 sm:mt-14 text-center">
          
          <div class="mb-6 sm:mb-8 inline-block relative">
            <h3 class="font-heading text-base sm:text-lg md:text-xl lg:text-2xl text-primary font-bold tracking-tight leading-snug">
              Présentation globale
            </h3>
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

          <!-- Cadre complet de la vidéo qui entre depuis la droite au scroll -->
          <div
            class="max-w-4xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-950 transition-all duration-[1300ms] ease-out"
            [ngClass]="{
              'opacity-0 translate-x-14 scale-95': !isVideoInView(),
              'opacity-100 translate-x-0 scale-100': isVideoInView()
            }"
          >
            <div class="relative w-full aspect-video">
              <video
                #demoVideo
                autoplay
                muted
                loop
                playsinline
                controls
                preload="auto"
                class="w-full h-full object-cover"
              >
                <source src="assets/video/Demo.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la lecture vidéo directe.
              </video>
            </div>
          </div>

        </div>

      </div>
    </section>
  `
})
export class EducationSectionComponent implements AfterViewInit, OnDestroy {
  @ViewChild('demoVideo') videoRef?: ElementRef<HTMLVideoElement>;
  @ViewChild('mockupSection') mockupRef?: ElementRef<HTMLElement>;
  @ViewChild('videoSection') videoSectionRef?: ElementRef<HTMLElement>;
  
  @ViewChildren('keyCard') keyCardRefs!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('offerCard') offerCardRefs!: QueryList<ElementRef<HTMLElement>>;

  readonly keyCardsInView = signal<boolean[]>([false, false, false]);
  readonly offersInView = signal<boolean[]>([false, false, false]);
  readonly isMockupInView = signal<boolean>(false);
  readonly isVideoInView = signal<boolean>(false);

  private videoObserver?: IntersectionObserver;
  private scrollObserver?: IntersectionObserver;

  isKeyCardInView(index: number): boolean {
    return this.keyCardsInView()[index] ?? false;
  }

  isOfferCardInView(index: number): boolean {
    return this.offersInView()[index] ?? false;
  }

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    // Observer pour le jeu de la vidéo
    if (this.videoRef) {
      const videoEl = this.videoRef.nativeElement;
      this.videoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              videoEl.play().catch(() => {
                videoEl.muted = true;
                videoEl.play().catch(() => {});
              });
            } else {
              videoEl.pause();
            }
          });
        },
        { threshold: 0.25 }
      );
      this.videoObserver.observe(videoEl);
    }

    // Observer pour les animations d'entrée des cartes et cadres individuels au scroll
    this.scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Clés pédagogiques individuelles
          const keyIndex = this.keyCardRefs.toArray().findIndex(
            (ref) => ref.nativeElement === entry.target
          );
          if (keyIndex !== -1) {
            this.keyCardsInView.update((states) => {
              const next = [...states];
              next[keyIndex] = entry.isIntersecting;
              return next;
            });
          }

          // Offres pinboard individuelles
          const offerIndex = this.offerCardRefs.toArray().findIndex(
            (ref) => ref.nativeElement === entry.target
          );
          if (offerIndex !== -1) {
            this.offersInView.update((states) => {
              const next = [...states];
              next[offerIndex] = entry.isIntersecting;
              return next;
            });
          }

          if (this.mockupRef && entry.target === this.mockupRef.nativeElement) {
            this.isMockupInView.set(entry.isIntersecting);
          }
          if (this.videoSectionRef && entry.target === this.videoSectionRef.nativeElement) {
            this.isVideoInView.set(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.12 }
    );

    this.keyCardRefs.forEach((ref) => this.scrollObserver?.observe(ref.nativeElement));
    this.offerCardRefs.forEach((ref) => this.scrollObserver?.observe(ref.nativeElement));
    if (this.mockupRef) this.scrollObserver.observe(this.mockupRef.nativeElement);
    if (this.videoSectionRef) this.scrollObserver.observe(this.videoSectionRef.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.videoObserver) this.videoObserver.disconnect();
    if (this.scrollObserver) this.scrollObserver.disconnect();
  }
}

