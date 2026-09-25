import { Component, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PromptPreset {
  id: string;
  category: 'scolaire' | 'culture';
  label: string;
  badge: string;
  iconType: 'maths' | 'histoire' | 'svt' | 'sagesse';
  question: string;
  response: string;
  avatarName: string;
  avatarRole: string;
  level: string;
}

const ALL_PRESETS: PromptPreset[] = [
  {
    id: 'maths-second-degre',
    category: 'scolaire',
    label: 'Équation du 2nd Degré',
    badge: 'Terminale TSE & TSExp',
    iconType: 'maths',
    level: '12ème Année • Terminale Sciences Exactes (Baccalauréat)',
    avatarName: 'Assistant Pédagogique ALTA',
    avatarRole: 'Moteur Socratique • Mathématiques Spécialisées',
    question: 'Comment résoudre l\'équation 2x² - 5x + 2 = 0 ?',
    response: `Appliquons la méthode étape par étape avec le discriminant delta :\n\n1. Coefficients : a = 2, b = -5, c = 2\n2. Calcul du discriminant :\n   Δ = b² - 4ac = (-5)² - 4(2)(2) = 25 - 16 = 9\n\n3. Analyse : Puisque Δ > 0 (strictement positif), l'équation admet deux solutions réelles distinctes :\n   • x₁ = (-b - √Δ) / 2a = (5 - 3) / 4 = 2/4 = 1/2\n   • x₂ = (-b + √Δ) / 2a = (5 + 3) / 4 = 8/4 = 2\n\nConclusion : L'ensemble des solutions est S = {1/2 ; 2}.\nVeux-tu qu'on s'entraîne sur un cas avec Δ < 0 ou Δ = 0 ?`
  },
  {
    id: 'maths-pythagore',
    category: 'scolaire',
    label: 'Théorème de Pythagore',
    badge: 'Maths 9ème (DEF)',
    iconType: 'maths',
    level: 'Classe de 9ème année • Préparation DEF',
    avatarName: 'Assistant Pédagogique ALTA',
    avatarRole: 'Spécialiste Mathématiques & Sciences',
    question: 'Bonjour, je ne comprends pas à quoi sert le théorème de Pythagore dans mon devoir.',
    response: `Bonjour ! Retiens cette règle simple :\n\nDans tout triangle rectangle (qui a un angle droit de 90°), le carré du plus grand côté (l'hypoténuse) est égal à la somme des carrés des deux autres côtés.\n\nFormule fondamentale : BC² = AB² + AC²\n\nExemple pratique : Si un mur fait 4 mètres et le sol 3 mètres, l'échelle posée entre les deux mesurera exactement 5 mètres car 3² (9) + 4² (16) = 25, et la racine carrée de 25 est 5 !\n\nSouhaites-tu que nous résolvions un exercice ensemble étape par étape ?`
  },
  {
    id: 'histoire-soundiata',
    category: 'culture',
    label: 'Soundiata Keïta',
    badge: 'Histoire du Mandé',
    iconType: 'histoire',
    level: 'Culture & Récit traditionnel africain',
    avatarName: 'Le Grand-Père Conteur',
    avatarRole: 'Gardien de la mémoire et des traditions',
    question: 'Grand-père, raconte-moi comment Soundiata Keïta s\'est levé pour sauver le Mandé.',
    response: `Prends place sous l'arbre à palabres, mon enfant...\n\nSoundiata n'a pas marché dès sa naissance. Pendant sept longues années, il rampait, et beaucoup se moquaient de lui. Mais un jour, sa mère Sogolon essuya les larmes d'une humiliation.\n\nSoundiata demanda alors une lourde barre de fer forgée par les plus grands maîtres forgerons. D'un seul élan d'honneur et de courage, il s'est redressé, pliant la barre de fer et se dressant fièrement sur ses deux jambes ! Plus tard, à la bataille de Kirina en 1235, il proclama la Charte de Kouroukan Fouga, l'une des toutes premières déclarations des droits humains au monde.\n\nRetiens cet enseignement : la patience et la détermination transforment l'épreuve en grandeur.`
  },
  {
    id: 'svt-photosynthese',
    category: 'scolaire',
    label: 'La Photosynthèse',
    badge: 'SVT & Biologie',
    iconType: 'svt',
    level: 'Classe de 8ème année • Sciences Naturelles',
    avatarName: 'Assistant Pédagogique ALTA',
    avatarRole: 'Biologie & Sciences Naturelles',
    question: 'Comment les plantes se nourrissent-elles avec la lumière du soleil ?',
    response: `C'est un phénomène vital appelé la photosynthèse !\n\nImagine que la feuille est une usine naturelle de précision :\n1. Elle puise l'eau et les sels minéraux par ses racines dans la terre.\n2. Elle absorbe le dioxyde de carbone (CO2) présent dans l'air.\n3. Grâce à la chlorophylle (qui lui donne sa couleur verte) et à l'énergie lumineuse du soleil, elle fabrique sa propre matière organique (le glucose) et libère de l'oxygène pur dans l'atmosphère.\n\nSans le règne végétal, la vie sur Terre ne pourrait pas respirer !`
  },
  {
    id: 'culture-devinette',
    category: 'culture',
    label: 'Devinette bamanankan',
    badge: 'Tradition & Sagesse',
    iconType: 'sagesse',
    level: 'Énigmes & Sagesse orale',
    avatarName: 'Le Grand-Père Conteur',
    avatarRole: 'Énigmes & Proverbes mandingues',
    question: 'Grand-père, donne-moi une devinette comme au village le soir !',
    response: `N'ba ! Écoute attentivement celle-ci :\n\n« N'bá taara farafina, n'ye ce koro dɔ ye, a tɛ kuma nka a bɛ mɔgɔw lakanaki. »\n(« Je suis allé au loin, j'ai rencontré un sage qui ne parle pas, mais qui instruit tous les hommes sans exception. Qui est-il ? »)\n\nPrends le temps d'observer autour de toi... C'est LE LIVRE ! Bien qu'il garde le silence, il dévoile tous les mystères du monde à l'esprit qui s'ouvre à lui.`
  }
];

@Component({
  selector: 'app-ai-simulator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="demo-ia" class="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-slate-50 to-[#F8F9FB] relative overflow-hidden border-t border-slate-200/70">
      
      <!-- Lueurs ambiantes technologiques -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div class="absolute top-1/4 -right-24 w-96 h-96 bg-primary/8 rounded-full blur-3xl"></div>
        <div class="absolute bottom-1/4 -left-24 w-96 h-96 bg-secondary/8 rounded-full blur-3xl"></div>
      </div>

      <div class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        <!-- En-tête de section sans stickers -->
        <div class="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-2.5">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 shadow-xs">
            <svg class="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
            <span class="text-primary text-[10px] sm:text-xs font-extrabold uppercase tracking-widest">
              Démonstration Interactive
            </span>
          </div>

          <h2 class="font-heading text-2xl sm:text-3xl md:text-4xl text-primary font-bold tracking-tight">
            Découvrez la puissance de l'Assistant en direct
          </h2>
          <div class="section-divider"></div>
          <p class="text-slate-600 text-xs sm:text-sm font-medium max-w-xl mx-auto leading-relaxed pt-1">
            Choisissez un sujet d'école conforme au programme malien ou une histoire traditionnelle africaine pour observer la précision des réponses et écouter la voix de synthèse.
          </p>
        </div>

        <!-- Terminal / Boîtier Virtuel interactif -->
        <div class="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden ring-1 ring-slate-900/5">
          
          <!-- Barre d'état technologique du Boîtier ALTA -->
          <div class="bg-slate-900 text-white px-5 sm:px-7 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-red-400 inline-block"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-mono font-bold tracking-wider text-slate-200">
                  DISPOSITIF ALTA
                </span>
                <span class="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/30">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  MODE EMBARQUÉ HORS-LIGNE
                </span>
              </div>
            </div>

            <!-- Sélecteur de mode d'Avatar avec icônes vectorielles -->
            <div class="flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl text-xs border border-slate-700/60">
              <button
                type="button"
                (click)="switchCategory('scolaire')"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all"
                [ngClass]="{
                  'bg-primary text-white shadow-sm': activeCategory() === 'scolaire',
                  'text-slate-400 hover:text-white': activeCategory() !== 'scolaire'
                }"
              >
                <!-- Icône Mortier / Diplôme SVG -->
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
                <span>Soutien Scolaire</span>
              </button>

              <button
                type="button"
                (click)="switchCategory('culture')"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all"
                [ngClass]="{
                  'bg-accent text-white shadow-sm': activeCategory() === 'culture',
                  'text-slate-400 hover:text-white': activeCategory() !== 'culture'
                }"
              >
                <!-- Icône Flambeau / Étoile culturelle SVG -->
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <span>Grand-Père Conteur</span>
              </button>
            </div>
          </div>

          <!-- Zone de discussion / Dialogue -->
          <div class="p-6 sm:p-8 space-y-6 bg-[#FAFAFC] min-h-[360px] flex flex-col justify-between">
            
            <!-- Message de l'Élève (Question) -->
            <div class="flex items-start gap-3.5 justify-end">
              <div class="max-w-xl bg-primary text-white rounded-3xl rounded-tr-xs p-4 sm:p-5 shadow-sm space-y-1">
                <div class="flex items-center justify-between gap-3 border-b border-white/15 pb-1.5">
                  <span class="text-[10px] font-bold uppercase tracking-wider text-secondary">
                    Élève • Bamako
                  </span>
                  <span class="text-[10px] text-white/70 font-medium">
                    {{ currentPreset().level }}
                  </span>
                </div>
                <p class="text-xs sm:text-sm font-medium leading-relaxed pt-1">
                  « {{ currentPreset().question }} »
                </p>
              </div>

              <!-- Avatar Élève avec Icône Vectorielle Élégante -->
              <div class="w-9 h-9 rounded-2xl bg-primary/15 text-primary flex items-center justify-center flex-shrink-0 mt-1 border border-primary/25 shadow-xs">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
            </div>

            <!-- Réponse de l'Assistant ALTERNIA -->
            <div class="flex items-start gap-3.5 justify-start">
              
              <!-- Avatar Rôle avec Icône Vectorielle Distinctive -->
              <div
                class="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm transition-all"
                [ngClass]="{
                  'bg-primary/10 text-primary border border-primary/25': activeCategory() === 'scolaire',
                  'bg-accent/15 text-accent border border-accent/30': activeCategory() === 'culture'
                }"
              >
                @if (activeCategory() === 'scolaire') {
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                  </svg>
                } @else {
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                    <path d="M2 12h20"/>
                  </svg>
                }
              </div>

              <div class="max-w-2xl bg-white border border-slate-200/90 rounded-3xl rounded-tl-xs p-5 sm:p-6 shadow-sm space-y-3.5 flex-1">
                
                <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div>
                    <h4 class="font-heading font-bold text-sm sm:text-base text-slate-900">
                      {{ currentPreset().avatarName }}
                    </h4>
                    <span class="text-[11px] font-semibold text-slate-500">
                      {{ currentPreset().avatarRole }}
                    </span>
                  </div>

                  <!-- Bouton Audio Synthèse Vocale avec Icône Sonore Vectorielle -->
                  <button
                    type="button"
                    (click)="toggleSpeech()"
                    class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs"
                    [ngClass]="{
                      'bg-emerald-500 text-white shadow-emerald-500/30 shadow-md': isSpeaking(),
                      'bg-slate-100 hover:bg-primary/10 text-slate-700 hover:text-primary': !isSpeaking()
                    }"
                    [attr.aria-label]="isSpeaking() ? 'Interrompre la lecture' : 'Écouter la voix à haute voix'"
                  >
                    @if (isSpeaking()) {
                      <div class="flex items-end gap-0.5 h-3.5" aria-hidden="true">
                        <span class="w-0.5 bg-white rounded-full animate-bounce h-2" style="animation-duration: 0.5s"></span>
                        <span class="w-0.5 bg-white rounded-full animate-bounce h-3.5" style="animation-duration: 0.7s"></span>
                        <span class="w-0.5 bg-white rounded-full animate-bounce h-2.5" style="animation-duration: 0.6s"></span>
                      </div>
                      <span>En écoute...</span>
                    } @else {
                      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                      </svg>
                      <span>Écouter la voix</span>
                    }
                  </button>
                </div>

                <!-- Texte dactylographique -->
                <div class="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line font-sans">
                  {{ displayedText() }}
                  @if (isTyping()) {
                    <span class="inline-block w-1.5 h-4 bg-primary animate-pulse ml-0.5 align-middle"></span>
                  }
                </div>

                <!-- Certificat de conformité -->
                <div class="pt-2 flex items-center gap-2 text-[10px] text-slate-500 border-t border-slate-100">
                  <svg class="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <span>{{ activeCategory() === 'scolaire' ? 'Contenu certifié conforme au programme officiel du Mali' : 'Transmission et récits issus de la tradition orale mandingue' }}</span>
                </div>
              </div>
            </div>

          </div>

          <!-- Suggestions de questions à tester avec de vraies icônes vectorielles -->
          <div class="bg-white p-5 sm:p-6 border-t border-slate-200">
            <span class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">
              Sélectionnez une question type :
            </span>
            <div class="flex flex-wrap gap-2.5">
              @for (preset of filteredPresets(); track preset.id) {
                <button
                  type="button"
                  (click)="selectPreset(preset)"
                  class="px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all text-left inline-flex items-center gap-2"
                  [ngClass]="{
                    'bg-primary/10 border-primary text-primary font-bold shadow-xs': currentPreset().id === preset.id,
                    'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300': currentPreset().id !== preset.id
                  }"
                >
                  <!-- Icône vectorielle selon le thème -->
                  @if (preset.iconType === 'maths') {
                    <svg class="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="12 2 2 22 22 22"/>
                    </svg>
                  } @else if (preset.iconType === 'histoire') {
                    <svg class="w-3.5 h-3.5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                  } @else if (preset.iconType === 'svt') {
                    <svg class="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 20A7 7 0 0 1 4 13C4 7 11 3 11 3s7 4 7 10a7 7 0 0 1-7 7z"/>
                      <path d="M11 3v17"/>
                    </svg>
                  } @else {
                    <svg class="w-3.5 h-3.5 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  }
                  <span>{{ preset.label }}</span>
                </button>
              }
            </div>

            <!-- Formulaire de saisie libre -->
            <div class="mt-4 pt-3.5 border-t border-slate-100 flex items-center gap-2">
              <div class="relative flex-1">
                <input
                  type="text"
                  [(ngModel)]="customQuestion"
                  (keyup.enter)="askCustomQuestion()"
                  placeholder="Posez votre question (ex: Les fractions, la Charte de Kurukan Fuga, les examens...)"
                  class="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-slate-50 focus:bg-white transition-all"
                />
              </div>
              <button
                type="button"
                (click)="askCustomQuestion()"
                class="btn-primary-official px-4 py-2.5 text-xs rounded-xl flex items-center gap-1.5 flex-shrink-0 font-bold"
              >
                <span>Tester</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  `
})
export class AiSimulatorComponent implements OnDestroy {
  readonly allPresets: PromptPreset[] = ALL_PRESETS;
  readonly activeCategory = signal<'scolaire' | 'culture'>('scolaire');
  readonly currentPreset = signal<PromptPreset>(ALL_PRESETS[0]);
  readonly displayedText = signal<string>('');
  readonly isTyping = signal<boolean>(false);
  readonly isSpeaking = signal<boolean>(false);
  customQuestion = '';

  private typingTimeout?: any;
  private currentUtterance?: SpeechSynthesisUtterance;

  constructor() {
    this.startTyping(ALL_PRESETS[0].response);
  }

  filteredPresets(): PromptPreset[] {
    return this.allPresets.filter(p => p.category === this.activeCategory());
  }

  switchCategory(cat: 'scolaire' | 'culture'): void {
    this.stopSpeech();
    this.activeCategory.set(cat);
    const first = this.allPresets.find(p => p.category === cat);
    if (first) {
      this.selectPreset(first);
    }
  }

  selectPreset(preset: PromptPreset): void {
    this.stopSpeech();
    this.currentPreset.set(preset);
    this.startTyping(preset.response);
  }

  askCustomQuestion(): void {
    if (!this.customQuestion.trim()) return;
    this.stopSpeech();

    const q = this.customQuestion.trim();
    const isCulture = this.activeCategory() === 'culture';

    const customPreset: PromptPreset = {
      id: 'custom-' + Date.now(),
      category: this.activeCategory(),
      label: q.length > 25 ? q.substring(0, 22) + '...' : q,
      badge: isCulture ? 'Tradition orale' : 'Exercice scolaire',
      iconType: isCulture ? 'sagesse' : 'maths',
      level: 'Question personnalisée',
      avatarName: isCulture ? 'Le Grand-Père Conteur' : 'Assistant Pédagogique ALTA',
      avatarRole: isCulture ? 'Histoire & Valeurs' : 'Programme Malien Officiel',
      question: q,
      response: isCulture
        ? `Excellente question, mon enfant. Dans nos traditions orales transmises de génération en génération, chaque question porte sa graine de sagesse. ALTERNIA intègre plus de 150 contes et récits historiques documentés sur l'Afrique de l'Ouest pour t'éclairer chaque jour !`
        : `Très bonne question ! Dans le cadre du programme scolaire malien, ce sujet fait partie des notions fondamentales. Avec le boîtier ALTERNIA, l'élève peut explorer chaque étape du calcul ou de la leçon avec des exercices guidés, sans avoir besoin d'une connexion internet.`
    };

    this.currentPreset.set(customPreset);
    this.startTyping(customPreset.response);
    this.customQuestion = '';
  }

  private startTyping(fullText: string): void {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
    this.displayedText.set('');
    this.isTyping.set(true);

    let index = 0;
    const speed = 12; // ms par caractère

    const typeStep = () => {
      if (index < fullText.length) {
        this.displayedText.update(prev => prev + fullText.charAt(index));
        index++;
        this.typingTimeout = setTimeout(typeStep, speed);
      } else {
        this.isTyping.set(false);
      }
    };

    typeStep();
  }

  toggleSpeech(): void {
    if (this.isSpeaking()) {
      this.stopSpeech();
    } else {
      this.playSpeech(this.currentPreset().response);
    }
  }

  private playSpeech(text: string): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('La synthèse vocale n\'est pas disponible sur ce navigateur.');
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#—]/g, ' ').replace(/\n+/g, '. ');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'fr-FR';
    utterance.rate = this.activeCategory() === 'culture' ? 0.9 : 1.0;
    utterance.pitch = this.activeCategory() === 'culture' ? 0.85 : 1.05;

    utterance.onstart = () => this.isSpeaking.set(true);
    utterance.onend = () => this.isSpeaking.set(false);
    utterance.onerror = () => this.isSpeaking.set(false);

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  private stopSpeech(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking.set(false);
  }

  ngOnDestroy(): void {
    this.stopSpeech();
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
  }
}
