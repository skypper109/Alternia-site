import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface AvatarItem {
  id: string;
  badge: string;
  badgeColor: 'secondary' | 'accent' | 'primary';
  title: string;
  avatarImg: string;
  role: string;
  desc: string;
  tags: string[];
  sampleText: string;
  quote: string;
}

@Component({
  selector: 'app-avatar-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="avatar" class="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-[#F8FBFD] to-white border-t border-slate-200/70 relative overflow-hidden">
      
      <!-- Motifs d'arrière-plan haute technologie (ondulations & faisceaux) -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div class="absolute top-1/3 -left-32 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-1/3 -right-32 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>

        <svg class="absolute top-[48%] -left-1/4 w-[150%] h-76 text-secondary opacity-15 animate-dashed-1" viewBox="0 0 1600 240" fill="none" preserveAspectRatio="none">
          <path d="M0,70 C300,190 650,20 1000,150 C1300,240 1480,50 1600,110" stroke="currentColor" stroke-width="3" stroke-dasharray="12 10" stroke-linecap="round"/>
          <path d="M0,140 C400,20 780,230 1180,90 C1380,180 1500,40 1600,120" stroke="currentColor" stroke-width="2" stroke-dasharray="6 6" stroke-linecap="round"/>
        </svg>
      </div>

      <div class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        <!-- En-tête de section -->
        <div class="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-2">
          <span class="inline-flex items-center gap-2 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest px-3.5 py-1 bg-secondary/15 text-secondary rounded-full border border-secondary/25 shadow-xs">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="animate-pulse">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
            <span>Studio des Avatars & Voix</span>
          </span>
          <h2 class="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary font-bold tracking-tight leading-tight">
            Des visages familiers et rassurants pour chaque élève
          </h2>
          <div class="section-divider"></div>
          <p class="text-slate-600 text-xs sm:text-sm font-medium max-w-xl mx-auto leading-relaxed pt-1">
            Découvrez nos 3 tuteurs virtuels animés par l'IA. Dotés de synchronisation labiale et d'intonations chaleureuses, ils créent un climat de confiance indispensable à la réussite.
          </p>
        </div>

        <!-- LES 3 CARTES AVATARS INTERACTIVES (ENTRÉE AU SCROLL) -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          
          @for (avatar of avatars; track avatar.id; let i = $index) {
            <div
              #avatarCard
              class="rounded-3xl bg-white border-2 transition-all duration-500 ease-out flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 relative group"
              [ngClass]="{
                'border-secondary/35 hover:border-secondary': avatar.badgeColor === 'secondary',
                'border-accent/35 hover:border-accent': avatar.badgeColor === 'accent',
                'border-primary/35 hover:border-primary': avatar.badgeColor === 'primary',
                'opacity-0 translate-y-14 scale-95': !isAvatarCardInView(i),
                'opacity-100 translate-y-0 scale-100': isAvatarCardInView(i)
              }"
            >
              
              <!-- Lueur d'ambiance supérieure -->
              <div
                class="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-2xl opacity-20 pointer-events-none"
                [ngClass]="{
                  'bg-secondary': avatar.badgeColor === 'secondary',
                  'bg-accent': avatar.badgeColor === 'accent',
                  'bg-primary': avatar.badgeColor === 'primary'
                }"
              ></div>

              <!-- Contenu Principal -->
              <div class="p-6 sm:p-7 space-y-5">
                
                <!-- En-tête de la carte : Badge + Statut -->
                <div class="flex items-center justify-between gap-2 border-b border-slate-100 pb-3.5">
                  <span
                    class="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    [ngClass]="{
                      'bg-secondary/15 text-secondary': avatar.badgeColor === 'secondary',
                      'bg-accent/15 text-accent': avatar.badgeColor === 'accent',
                      'bg-primary/10 text-primary': avatar.badgeColor === 'primary'
                    }"
                  >
                    {{ avatar.badge }}
                  </span>
                  <span class="inline-flex items-center gap-1.5 text-[10px] font-mono text-slate-500 font-semibold">
                    <span class="w-2 h-2 rounded-full animate-ping opacity-75"
                          [ngClass]="{
                            'bg-secondary': avatar.badgeColor === 'secondary',
                            'bg-accent': avatar.badgeColor === 'accent',
                            'bg-primary': avatar.badgeColor === 'primary'
                          }"></span>
                    <span>Direct Box</span>
                  </span>
                </div>

                <!-- Visuel Avatar (Portrait illustré en médaillon avec anneau lumineux) -->
                <div class="flex items-center gap-4">
                  <div class="relative flex-shrink-0">
                    <div
                      class="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl p-1 bg-gradient-to-tr shadow-md group-hover:scale-105 transition-transform duration-300"
                      [ngClass]="{
                        'from-secondary to-primary/40': avatar.badgeColor === 'secondary',
                        'from-accent to-secondary/40': avatar.badgeColor === 'accent',
                        'from-primary to-accent/40': avatar.badgeColor === 'primary'
                      }"
                    >
                      <div class="w-full h-full rounded-xl overflow-hidden bg-slate-900 border border-white/20">
                        <img
                          [src]="avatar.avatarImg"
                          [alt]="avatar.title"
                          class="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    <!-- Badge miniature holographique -->
                    <div
                      class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] shadow-sm font-bold"
                      [ngClass]="{
                        'bg-secondary': avatar.badgeColor === 'secondary',
                        'bg-accent': avatar.badgeColor === 'accent',
                        'bg-primary': avatar.badgeColor === 'primary'
                      }"
                      title="Synchronisation labiale active"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5z"/>
                      </svg>
                    </div>
                  </div>

                  <!-- Titre et rôle de l'avatar -->
                  <div class="min-w-0">
                    <h3 class="font-heading text-lg sm:text-xl font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors">
                      {{ avatar.title }}
                    </h3>
                    <p
                      class="text-xs font-bold mt-0.5"
                      [ngClass]="{
                        'text-secondary': avatar.badgeColor === 'secondary',
                        'text-accent': avatar.badgeColor === 'accent',
                        'text-primary': avatar.badgeColor === 'primary'
                      }"
                    >
                      {{ avatar.role }}
                    </p>
                    <span class="text-[10px] text-slate-400 block mt-1 font-medium">Synchronisation labiale & vocale</span>
                  </div>
                </div>

                <!-- Description -->
                <p class="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {{ avatar.desc }}
                </p>

                <!-- Citation de l'avatar en direct -->
                <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 italic font-heading leading-relaxed">
                  « {{ avatar.quote }} »
                </div>

                <!-- Tags des Capacités Didactiques -->
                <div class="flex flex-wrap gap-1.5 pt-1">
                  @for (tag of avatar.tags; track tag) {
                    <span class="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 border border-slate-200/60">
                      {{ tag }}
                    </span>
                  }
                </div>

              </div>

              <!-- Bas de la carte : Lecteur Audio Interactif de l'Avatar -->
              <div class="p-5 sm:p-6 pt-0 mt-auto">
                <button
                  type="button"
                  (click)="togglePlayVoice(avatar)"
                  class="w-full py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-between shadow-xs group/btn"
                  [ngClass]="{
                    'bg-secondary text-white hover:bg-[#34a4b4]': avatar.badgeColor === 'secondary' && currentPlayingId() !== avatar.id,
                    'bg-accent text-white hover:bg-[#d87212]': avatar.badgeColor === 'accent' && currentPlayingId() !== avatar.id,
                    'bg-primary text-white hover:bg-[#253775]': avatar.badgeColor === 'primary' && currentPlayingId() !== avatar.id,
                    'ring-2 ring-offset-2 ring-emerald-500 bg-emerald-600 text-white': currentPlayingId() === avatar.id
                  }"
                  [attr.aria-label]="getAriaLabel(avatar)"
                >
                  <div class="flex items-center gap-2.5">
                    @if (currentPlayingId() === avatar.id) {
                      <!-- Pause SVG -->
                      <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                      <span>En écoute vocale...</span>
                    } @else {
                      <!-- Play SVG -->
                      <svg class="w-4 h-4 fill-current transition-transform group-hover/btn:scale-110" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      <span>Écouter la voix</span>
                    }
                  </div>

                  <!-- Égaliseur audio animé quand en cours de lecture -->
                  @if (currentPlayingId() === avatar.id) {
                    <div class="flex items-end gap-1 h-4 flex-shrink-0" aria-hidden="true">
                      <span class="w-1 bg-white rounded-full animate-bounce h-2.5" style="animation-duration: 0.5s"></span>
                      <span class="w-1 bg-white rounded-full animate-bounce h-4" style="animation-duration: 0.7s"></span>
                      <span class="w-1 bg-white rounded-full animate-bounce h-1.5" style="animation-duration: 0.4s"></span>
                      <span class="w-1 bg-white rounded-full animate-bounce h-3.5" style="animation-duration: 0.6s"></span>
                    </div>
                  } @else {
                    <span class="text-[10px] font-mono opacity-80 uppercase tracking-wider font-semibold">Test Vocal HD</span>
                  }
                </button>
              </div>

            </div>
          }

        </div>

        <!-- Bannière d'information technologique sur le Salon Holographique -->
        <div class="mt-10 sm:mt-12 p-5 sm:p-6 rounded-3xl bg-primary/5 border border-primary/15 flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3.5">
            <div class="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                <polyline points="2 17 12 22 22 17"/>
                <polyline points="2 12 12 17 22 12"/>
              </svg>
            </div>
            <div class="space-y-0.5">
              <h4 class="font-heading font-bold text-sm text-slate-900">
                Salon Holographique & Studio Vocal Intégrés
              </h4>
              <p class="text-xs text-slate-600 leading-relaxed">
                Les avatars sont accessibles sur écran classique, smartphone, et projetables en salon holographique interactif grâce au protocole temps réel de la AlternIA Box.
              </p>
            </div>
          </div>
          <a
            href="#demo-ia"
            (click)="scrollTo('demo-ia', $event)"
            class="btn-primary-official text-xs py-2 px-5 rounded-full flex-shrink-0 font-bold whitespace-nowrap shadow-xs"
          >
            Tester le dialogue en direct
          </a>
        </div>

      </div>
    </section>
  `
})
export class AvatarSectionComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('avatarCard') avatarCardRefs!: QueryList<ElementRef<HTMLElement>>;

  readonly avatarsInView = signal<boolean[]>([false, false, false]);
  readonly currentPlayingId = signal<string | null>(null);
  private observer?: IntersectionObserver;

  readonly avatars: AvatarItem[] = [
    {
      id: 'avatar-enseignant',
      badge: 'Pour la Classe',
      badgeColor: 'secondary',
      title: 'Avatar Enseignant',
      avatarImg: 'assets/images/teacher-avatar.svg',
      role: 'Tuteur Académique',
      desc: 'Une représentation bienveillante de l\'enseignant qui réexplique le cours avec la méthode socratique sans jamais donner la réponse brute.',
      tags: ['Méthode Socratique', 'Tableau Virtuel', 'Patience Infinie'],
      quote: "Ne t'inquiète pas si cet exercice te paraît difficile. Reprenons ensemble la formule pas à pas.",
      sampleText: "Bonjour ! Ne t'inquiète pas si cet exercice te paraît difficile ce soir. Reprenons ensemble la formule pas à pas, et tu vas voir que tout s'éclaire."
    },
    {
      id: 'avatar-parent',
      badge: 'Pour la Maison',
      badgeColor: 'accent',
      title: 'Avatar Parent',
      avatarImg: 'assets/images/parent-avatar.svg',
      role: 'Version Premium',
      desc: 'Clonage sécurisé en 2 minutes de la voix du père ou de la mère pour encourager l\'enfant même quand vous êtes absent ou au travail.',
      tags: ['Clonage Vocal 2 min', 'Encouragements', 'Sécurité Locale'],
      quote: "Mon enfant, je suis très fier de tes efforts aujourd'hui. Prends ton temps, tu as toutes les capacités pour réussir.",
      sampleText: "Mon enfant, je suis très fier de tes efforts pour tes devoirs aujourd'hui. Prends ton temps, tu as toutes les capacités pour réussir ton année."
    },
    {
      id: 'avatar-culturel',
      badge: 'Histoire & Récits',
      badgeColor: 'primary',
      title: 'Grand-Père Conteur',
      avatarImg: 'assets/images/grand-pere-avatar.svg',
      role: 'Mémoire & Traditions',
      desc: 'Le sage du village qui transmet les contes oraux, la Charte de Kouroukan Fouga, les grands empires et la philosophie en Bamanankan.',
      tags: ['Contes Mandingues', 'Sagesse Bamanankan', 'Passeport Culturel'],
      quote: "N'ba ! Assieds-toi sous l'arbre à palabres et écoute la leçon de nos ancêtres...",
      sampleText: "N'ba ! Assieds-toi près de moi sous le grand baobab, et écoute attentivement l'histoire des grands bâtisseurs de notre beau pays."
    }
  ];

  isAvatarCardInView(index: number): boolean {
    return this.avatarsInView()[index] ?? false;
  }

  getAriaLabel(avatar: AvatarItem): string {
    return this.currentPlayingId() === avatar.id ? "Arrêter l'écoute" : `Écouter la voix de ${avatar.title}`;
  }

  togglePlayVoice(avatar: AvatarItem): void {
    if (this.currentPlayingId() === avatar.id) {
      this.stopVoice();
      return;
    }

    this.stopVoice();
    this.currentPlayingId.set(avatar.id);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(avatar.sampleText);
      utterance.lang = 'fr-FR';
      utterance.rate = avatar.id === 'avatar-culturel' ? 0.9 : 1.0;
      utterance.pitch = avatar.id === 'avatar-enseignant' ? 1.05 : (avatar.id === 'avatar-parent' ? 1.1 : 0.85);

      utterance.onend = () => {
        this.currentPlayingId.set(null);
      };

      utterance.onerror = () => {
        this.currentPlayingId.set(null);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback timer si l'API audio n'est pas disponible
      setTimeout(() => {
        this.currentPlayingId.set(null);
      }, 5000);
    }
  }

  stopVoice(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.currentPlayingId.set(null);
  }

  scrollTo(targetId: string, event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${targetId}`);
    }
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
    this.stopVoice();
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
