import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="avatar" class="py-10 sm:py-14 lg:py-18 bg-white border-t border-slate-200/70 relative overflow-hidden">
      
      <!-- ========================================================
           MOTIFS D'ARRIÈRE-PLAN : AVATAR (POSITIONNÉS EN DESSOUS DES TITRES & AU NIVEAU DES CARTES)
           ======================================================== -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        
        <!-- Faisceau de Lignes Discontinues Médian (Au niveau des cartes - Bleu Clair / Cyan) -->
        <svg class="absolute top-[48%] -left-1/4 w-[150%] h-76 text-secondary opacity-20 animate-dashed-1" viewBox="0 0 1600 240" fill="none" preserveAspectRatio="none">
          <path d="M0,70 C300,190 650,20 1000,150 C1300,240 1480,50 1600,110" stroke="currentColor" stroke-width="4" stroke-dasharray="12 10" stroke-linecap="round"/>
          <path d="M0,120 C350,30 700,210 1050,80 C1320,10 1490,170 1600,130" stroke="currentColor" stroke-width="3" stroke-dasharray="8 8" stroke-linecap="round"/>
          <path d="M0,170 C420,240 800,50 1200,180 C1400,220 1520,90 1600,140" stroke="currentColor" stroke-width="2" stroke-dasharray="16 12" stroke-linecap="round"/>
        </svg>

        <!-- Faisceau de Lignes Discontinues Inférieur (Bas des cartes - Bleu Clair / Cyan) -->
        <svg class="absolute -bottom-8 -right-1/4 w-[150%] h-76 text-secondary opacity-20 animate-dashed-2" viewBox="0 0 1600 260" fill="none" preserveAspectRatio="none">
          <path d="M0,60 C320,210 720,30 1120,170 C1380,70 1500,150 1600,90" stroke="currentColor" stroke-width="3.5" stroke-dasharray="14 10" stroke-linecap="round"/>
          <path d="M0,140 C400,20 780,230 1180,90 C1380,180 1500,40 1600,120" stroke="currentColor" stroke-width="2.5" stroke-dasharray="6 6" stroke-linecap="round"/>
          <path d="M0,180 C400,250 800,90 1200,210 C1420,110 1520,170 1600,150" stroke="currentColor" stroke-width="2" stroke-dasharray="10 10" stroke-linecap="round"/>
        </svg>

      </div>

      <div class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        <!-- En-tête de section avec 'Apprentissage ludique' et Titre Harmonisé -->
        <div class="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-1.5 px-2 sm:px-0">
          <span class="inline-block text-[10px] sm:text-xs font-extrabold uppercase tracking-widest px-3 py-0.5 sm:px-3.5 sm:py-1 bg-secondary/15 text-secondary rounded-full">
            Apprentissage ludique
          </span>
          <h2 class="font-heading text-base sm:text-lg md:text-xl lg:text-2xl text-primary font-bold tracking-tight leading-snug max-w-xl sm:max-w-2xl mx-auto">
            Des visages familiers et rassurants pour accompagner chaque élève
          </h2>
          <div class="section-divider"></div>
          <p class="text-slate-700 text-xs sm:text-sm mt-1.5 font-medium max-w-lg sm:max-w-xl mx-auto leading-relaxed">
            L'avatar personnalisé recrée un lien de confiance immédiat et chaleureux entre l'élève, son enseignant et sa famille.
          </p>
        </div>

        <!-- LES 3 AVATARS AVEC ENTRÉE INDIVIDUELLE AU SCROLL -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          
          <!-- AVATAR ENSEIGNANT (Entrée Individuelle 1) -->
          <div
            #avatarCard
            class="p-5 sm:p-6 rounded-3xl bg-white/95 backdrop-blur-md border-2 border-secondary/40 hover:border-secondary shadow-sm hover:shadow-md transition-all duration-800 ease-out flex flex-col justify-between"
            [ngClass]="{
              'opacity-0 translate-y-14 scale-95': !isAvatarCardInView(0),
              'opacity-100 translate-y-0 scale-100': isAvatarCardInView(0)
            }"
          >
            <div class="space-y-3">
              <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center font-bold text-sm shadow-xs">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
              </div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-secondary">Pour la Classe</span>
              <h3 class="font-heading text-lg sm:text-xl font-bold text-secondary">Avatar Enseignant</h3>
              <p class="text-slate-700 text-xs sm:text-sm leading-relaxed">
                Retrouvez une représentation virtuelle de votre enseignant pour expliquer certaines notions et accompagner les révisions.
              </p>
            </div>
          </div>

          <!-- AVATAR PARENT (Entrée Individuelle 2) -->
          <div
            #avatarCard
            class="p-5 sm:p-6 rounded-3xl bg-white/95 backdrop-blur-md border-2 border-secondary/40 hover:border-secondary shadow-sm hover:shadow-md transition-all duration-800 ease-out flex flex-col justify-between"
            [ngClass]="{
              'opacity-0 translate-y-14 scale-95': !isAvatarCardInView(1),
              'opacity-100 translate-y-0 scale-100': isAvatarCardInView(1)
            }"
          >
            <div class="space-y-3">
              <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center font-bold text-sm shadow-xs">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-secondary">Pour la Maison</span>
              <h3 class="font-heading text-lg sm:text-xl font-bold text-secondary">Avatar Parent</h3>
              <p class="text-slate-700 text-xs sm:text-sm leading-relaxed">
                Une représentation personnalisée du parent peut accompagner l'enfant même lorsque celui-ci n'est pas disponible.
              </p>
            </div>
          </div>

          <!-- AVATAR CULTUREL (Entrée Individuelle 3) -->
          <div
            #avatarCard
            class="p-5 sm:p-6 rounded-3xl bg-white/95 backdrop-blur-md border-2 border-secondary/40 hover:border-secondary shadow-sm hover:shadow-md transition-all duration-800 ease-out flex flex-col justify-between"
            [ngClass]="{
              'opacity-0 translate-y-14 scale-95': !isAvatarCardInView(2),
              'opacity-100 translate-y-0 scale-100': isAvatarCardInView(2)
            }"
          >
            <div class="space-y-3">
              <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center font-bold text-sm shadow-xs">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                  <path d="M2 12h20"/>
                </svg>
              </div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-secondary">Histoire & Récits</span>
              <h3 class="font-heading text-lg sm:text-xl font-bold text-secondary">Avatar Culturel</h3>
              <p class="text-slate-700 text-xs sm:text-sm leading-relaxed">
                Le personnage virtuel de type grand-père qui raconte histoires, récits, traditions, événements historiques et grandes figures africaines.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  `
})
export class AvatarSectionComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('avatarCard') avatarCardRefs!: QueryList<ElementRef<HTMLElement>>;

  readonly avatarsInView = signal<boolean[]>([false, false, false]);
  private observer?: IntersectionObserver;

  isAvatarCardInView(index: number): boolean {
    return this.avatarsInView()[index] ?? false;
  }

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardIndex = this.avatarCardRefs.toArray().findIndex(
            (ref) => ref.nativeElement === entry.target
          );
          if (cardIndex !== -1) {
            this.avatarsInView.update((states) => {
              const next = [...states];
              next[cardIndex] = entry.isIntersecting;
              return next;
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    this.avatarCardRefs.forEach((ref) => {
      this.observer?.observe(ref.nativeElement);
    });
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

