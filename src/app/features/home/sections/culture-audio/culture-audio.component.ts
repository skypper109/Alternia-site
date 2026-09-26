import { Component, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface AudioTrack {
  id: string;
  title: string;
  speaker: string;
  role: string;
  duration: string;
  description: string;
  textToSpeak: string;
  icon: string;
  color: 'accent' | 'primary' | 'secondary';
}

interface BambaraProverb {
  bambara: string;
  phonetic: string;
  french: string;
  wisdom: string;
}

@Component({
  selector: 'app-culture-audio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-12 sm:py-16 bg-white border-t border-slate-200/70 relative overflow-hidden">
      
      <div class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        <!-- En-tête -->
        <div class="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span class="inline-flex items-center gap-2 text-accent text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3.5 py-1 bg-accent/10 rounded-full border border-accent/20">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
            </svg>
            <span>Immersion Vocale & Sagesse Mandingue</span>
          </span>
          <h2 class="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary font-bold tracking-tight">
            Écoutez la voix de la mémoire et de l'apprentissage
          </h2>
          <div class="section-divider"></div>
          <p class="text-slate-600 text-xs sm:text-sm font-medium max-w-xl mx-auto leading-relaxed pt-1">
            Découvrez comment la voix chaleureuse d'un aîné et les proverbes en Bamanankan s'allient à la pédagogie moderne pour éveiller l'enfant.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Colonne 1 : Lecteur d'extraits vocaux (7 colonnes) -->
          <div class="lg:col-span-7 bg-[#FAF9F6] border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
            
            <div class="flex items-center justify-between border-b border-slate-200/80 pb-3">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-accent animate-ping opacity-75"></span>
                <h3 class="font-heading font-bold text-slate-900 text-base sm:text-lg">
                  Extraits Vocaux du Boîtier
                </h3>
              </div>
              <span class="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                Audio HD 24-bit
              </span>
            </div>

            <!-- Liste des pistes écoutables -->
            <div class="space-y-3">
              @for (track of tracks; track track.id) {
                <div
                  class="p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-4 bg-white"
                  [ngClass]="{
                    'border-accent ring-2 ring-accent/20 shadow-md': currentTrack().id === track.id,
                    'border-slate-200 hover:border-slate-300 shadow-xs': currentTrack().id !== track.id
                  }"
                >
                  <div class="flex items-center gap-3.5 min-w-0">
                    <button
                      type="button"
                      (click)="playTrack(track)"
                      class="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold flex-shrink-0 transition-transform hover:scale-105 active:scale-95 shadow-sm"
                      [ngClass]="{
                        'bg-accent': track.color === 'accent',
                        'bg-primary': track.color === 'primary',
                        'bg-secondary': track.color === 'secondary'
                      }"
                      [attr.aria-label]="isPlaying() && currentTrack().id === track.id ? 'Arrêter' : 'Écouter ' + track.title"
                    >
                      @if (isPlaying() && currentTrack().id === track.id) {
                        <!-- Pause SVG -->
                        <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                      } @else {
                        <!-- Play SVG -->
                        <svg class="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      }
                    </button>

                    <div class="min-w-0">
                      <div class="flex items-center gap-2">
                        <h4 class="font-heading font-bold text-slate-900 text-sm truncate">
                          {{ track.title }}
                        </h4>
                        <span class="text-[10px] text-slate-400 font-mono">{{ track.duration }}</span>
                      </div>
                      <p class="text-xs text-slate-500 truncate">
                        {{ track.speaker }} • <span class="text-accent font-semibold">{{ track.role }}</span>
                      </p>
                    </div>
                  </div>

                  <!-- Animation d'onde audio quand le morceau est en lecture -->
                  @if (isPlaying() && currentTrack().id === track.id) {
                    <div class="flex items-end gap-1 h-6 flex-shrink-0 px-2" aria-hidden="true">
                      <span class="w-1 bg-accent rounded-full animate-bounce h-4" style="animation-duration: 0.6s"></span>
                      <span class="w-1 bg-accent rounded-full animate-bounce h-6" style="animation-duration: 0.8s"></span>
                      <span class="w-1 bg-accent rounded-full animate-bounce h-3" style="animation-duration: 0.5s"></span>
                      <span class="w-1 bg-accent rounded-full animate-bounce h-5" style="animation-duration: 0.7s"></span>
                    </div>
                  }
                </div>
              }
            </div>

            <!-- Lecteur actif / Transcrit -->
            <div class="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Transcription en direct :
              </span>
              <p class="text-xs sm:text-sm text-slate-700 italic leading-relaxed font-heading">
                « {{ currentTrack().textToSpeak }} »
              </p>
            </div>

          </div>

          <!-- Colonne 2 : Bamanankan & Plaquette Institutionnelle (5 colonnes) -->
          <div class="lg:col-span-5 space-y-5">
            
            <!-- Boîte Proverbes Bamanankan -->
            <div class="bg-primary text-white rounded-3xl p-6 sm:p-7 shadow-lg space-y-4 relative overflow-hidden">
              <div class="absolute -right-8 -bottom-8 w-40 h-40 bg-secondary/15 rounded-full blur-2xl pointer-events-none"></div>

              <div class="flex items-center justify-between border-b border-white/10 pb-3">
                <span class="text-[10px] font-extrabold uppercase tracking-widest text-secondary">
                  Bamanankan • Langue & Sagesse
                </span>
                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold text-white tracking-wide">
                  <span class="inline-flex w-3.5 h-2.5 rounded-xs overflow-hidden shadow-xs flex-shrink-0">
                    <span class="w-1/3 h-full bg-[#14B53A]"></span>
                    <span class="w-1/3 h-full bg-[#FCD116]"></span>
                    <span class="w-1/3 h-full bg-[#CE1126]"></span>
                  </span>
                  <span>Mali</span>
                </span>
              </div>

              <div class="space-y-2">
                <h4 class="font-heading font-extrabold text-lg text-white">
                  {{ currentProverb().bambara }}
                </h4>
                <p class="text-xs text-secondary font-mono">
                  [{{ currentProverb().phonetic }}]
                </p>
                <p class="text-xs sm:text-sm text-white/90 leading-relaxed font-medium pt-1">
                  « {{ currentProverb().french }} »
                </p>
                <p class="text-[11px] text-white/70 pt-1 border-t border-white/10">
                  <strong class="text-secondary">Sens :</strong> {{ currentProverb().wisdom }}
                </p>
              </div>

              <button
                type="button"
                (click)="nextProverb()"
                class="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 active:scale-[0.99] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 border border-white/15"
              >
                <span>Découvrir un autre proverbe</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>

            <!-- Espace Téléchargement Brochure / Plaquette Institutionnelle -->
            <div class="bg-white border-2 border-primary/20 rounded-3xl p-6 shadow-sm space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 shadow-xs">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-heading font-bold text-sm text-slate-900">
                    Plaquette de Présentation
                  </h4>
                  <p class="text-[11px] text-slate-500">
                    Document officiel pour Écoles, ONG et Ministères
                  </p>
                </div>
              </div>

              <p class="text-xs text-slate-600 leading-relaxed">
                Retrouvez les spécifications techniques du boîtier ALTA, les données d'impact pédagogique et la grille tarifaire pour les établissements.
              </p>

              <button
                type="button"
                (click)="downloadBrochure()"
                class="w-full py-2.5 px-4 rounded-xl bg-primary hover:bg-[#27397a] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                <span>Télécharger la fiche de synthèse</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  `
})
export class CultureAudioComponent implements OnDestroy {
  readonly isPlaying = signal<boolean>(false);
  readonly proverbIndex = signal<number>(0);

  readonly tracks: AudioTrack[] = [
    {
      id: 'conte-arbre',
      title: "L'arbre à palabres et le chasseur",
      speaker: 'Le Grand-Père Conteur',
      role: 'Conte & Valeurs',
      duration: '0:35',
      color: 'accent',
      icon: 'elder',
      description: 'Un récit traditionnel sur le respect de la nature et l\'écoute des anciens.',
      textToSpeak: "Mon enfant, écoute la leçon du baobab centenaire. Même le plus grand des arbres a commencé par une toute petite graine enfouie dans le sol. Ne sois jamais pressé de grandir sans apprendre, car ce sont les racines profondes du travail qui portent les branches les plus solides."
    },
    {
      id: 'cours-fraction',
      title: "Comprendre les fractions simplement",
      speaker: 'Assistant Scolaire ALTA',
      role: 'Pédagogie 7ème année',
      duration: '0:30',
      color: 'primary',
      icon: 'school',
      description: 'Explication imagée avec un pain partagé au village.',
      textToSpeak: "Imagine que nous partageons une mangue bien mûre en quatre morceaux égaux. Si tu manges un morceau, tu as mangé un quart de la mangue, soit 1 sur 4. Si ton frère en prend deux morceaux, il a mangé deux quarts, ce qui fait exactement la moitié de la mangue ! Tu vois, les fractions, c'est juste l'art du partage juste."
    },
    {
      id: 'clonage-parent',
      title: "Message d'encouragement personnalisé",
      speaker: 'Voix du Parent (Clonée)',
      role: 'Version Premium',
      duration: '0:22',
      color: 'secondary',
      icon: 'heart',
      description: 'L\'enfant entend la voix rassurante de son père ou de sa mère.',
      textToSpeak: "Mon fils, je sais que cet exercice de géométrie te paraît difficile ce soir. Mais souviens-toi : chaque erreur est une étape vers la réussite. Respire bien, relis la consigne avec ALTERNIA, et tu trouveras la solution. Je suis fier de tes efforts."
    }
  ];

  readonly currentTrack = signal<AudioTrack>(this.tracks[0]);

  readonly proverbs: BambaraProverb[] = [
    {
      bambara: 'Hakili bɛ mɔgɔ min na, o bɛ da kolo kan.',
      phonetic: 'Hakili bè môgô min na, o bè da kolo kan',
      french: 'Celui qui possède la sagesse écoute toujours avant de parler.',
      wisdom: 'La véritable intelligence commence par la capacité d\'attention et l\'humilité face au savoir.'
    },
    {
      bambara: 'Dɔgɔkun kelen tɛ baara ban.',
      phonetic: 'Dôgôkoun kélén tè baara ban',
      french: 'Une seule semaine ne suffit pas pour achever un grand labeur.',
      wisdom: 'La persévérance dans l\'apprentissage scolaire porte toujours ses fruits avec le temps.'
    },
    {
      bambara: 'Mɔgɔ tɛ se ka dɔnniya bɛɛ lakanaki.',
      phonetic: 'Môgô tè sé ka dôniya bèè lakanaki',
      french: 'Nul ne peut prétendre détenir à lui seul toute la connaissance.',
      wisdom: 'L\'apprentissage est infini et la collaboration entre parents, maîtres et enfants est essentielle.'
    }
  ];

  currentProverb = signal<BambaraProverb>(this.proverbs[0]);

  playTrack(track: AudioTrack): void {
    if (this.isPlaying() && this.currentTrack().id === track.id) {
      this.stopAudio();
      return;
    }

    this.stopAudio();
    this.currentTrack.set(track);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(track.textToSpeak);
      utterance.lang = 'fr-FR';
      utterance.rate = track.color === 'accent' ? 0.9 : 1.0;
      utterance.pitch = track.color === 'accent' ? 0.85 : 1.05;

      utterance.onstart = () => this.isPlaying.set(true);
      utterance.onend = () => this.isPlaying.set(false);
      utterance.onerror = () => this.isPlaying.set(false);

      window.speechSynthesis.speak(utterance);
    }
  }

  stopAudio(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isPlaying.set(false);
  }

  nextProverb(): void {
    const nextIdx = (this.proverbIndex() + 1) % this.proverbs.length;
    this.proverbIndex.set(nextIdx);
    this.currentProverb.set(this.proverbs[nextIdx]);
  }

  downloadBrochure(): void {
    // Génère un fichier récapitulatif téléchargeable au format texte / fiche synthèse
    const content = `=====================================================
ALTERNIA — L'ALTERNATIVE POUR APPRENDRE AUTREMENT
Site officiel : https://alternia.ml
Contact : contact@alternia.ml | Tél : +223 75 26 06 10
Bamako, République du Mali
=====================================================

1. PRÉSENTATION
ALTERNIA est un dispositif éducatif et culturel intelligent conçu
spécifiquement pour les élèves, parents et établissements scolaires
au Mali et en Afrique de l'Ouest.

2. POINTS FORTS DU BOÎTIER ALTA
- 100% Autonome sans connexion Internet
- Basé sur le programme scolaire officiel malien (DEF & Bac)
- Batterie longue durée (8h à 12h d'autonomie)
- Avatars personnalisables (Enseignant, Parent, Grand-Père Conteur)
- Clonage et personnalisation vocale (Version Premium)
- Suivi des progrès et aide à la remédiation scolaire

3. NOS OFFRES
- Version de Base : Fonctionnement complet hors-ligne, révisions et devoirs
- Version Premium : Clonage vocal, avatars à l'écran, suivi personnalisé
- Offre Établissements : Déploiement en classe, formation et tableau de bord

Pour commander ou demander une démonstration dans votre école :
WhatsApp / Téléphone : +223 75 26 06 10
E-mail : contact@alternia.ml
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ALTERNIA_Fiche_Synthese.txt';
    link.click();
    URL.revokeObjectURL(url);
  }

  ngOnDestroy(): void {
    this.stopAudio();
  }
}
