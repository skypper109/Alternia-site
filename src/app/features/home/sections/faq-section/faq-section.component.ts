import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FaqItem {
  id: string;
  category: 'general' | 'pedagogie' | 'technique' | 'achat';
  question: string;
  answer: string;
  badge: string;
}

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="faq" class="py-12 sm:py-16 lg:py-20 bg-white border-t border-slate-200/70 relative overflow-hidden">
      
      <!-- Lueur de fond -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-48 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div class="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        <!-- En-tête de section -->
        <div class="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2">
          <span class="inline-block text-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3.5 py-1 bg-primary/10 rounded-full border border-primary/20">
            Foire Aux Questions
          </span>
          <h2 class="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary font-bold tracking-tight">
            Tout ce que vous devez savoir sur ALTERNIA
          </h2>
          <div class="section-divider"></div>
          <p class="text-slate-600 text-xs sm:text-sm font-medium max-w-lg mx-auto leading-relaxed pt-1">
            Des réponses claires à vos questions sur le fonctionnement hors-ligne, les tarifs, la conformité pédagogique et la livraison.
          </p>
        </div>

        <!-- Filtres par catégorie avec Icônes SVG professionnelles -->
        <div class="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          @for (cat of categories; track cat.id) {
            <button
              type="button"
              (click)="selectedCategory.set(cat.id)"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-xs"
              [ngClass]="{
                'bg-primary text-white shadow-sm ring-2 ring-primary/30': selectedCategory() === cat.id,
                'bg-slate-100 text-slate-700 hover:bg-slate-200': selectedCategory() !== cat.id
              }"
            >
              @if (cat.id === 'all') {
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              } @else if (cat.id === 'technique') {
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              } @else if (cat.id === 'pedagogie') {
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
              } @else if (cat.id === 'achat') {
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              }
              <span>{{ cat.label }}</span>
            </button>
          }
        </div>

        <!-- Accordéon des questions / réponses -->
        <div class="space-y-3">
          @for (item of filteredFaq(); track item.id) {
            <div
              class="border rounded-2xl transition-all duration-200 overflow-hidden bg-white"
              [ngClass]="{
                'border-primary/50 shadow-md ring-1 ring-primary/20': openId() === item.id,
                'border-slate-200 hover:border-slate-300 shadow-xs': openId() !== item.id
              }"
            >
              <button
                type="button"
                (click)="toggle(item.id)"
                class="w-full px-5 py-4 sm:px-6 sm:py-4.5 text-left flex items-center justify-between gap-4 transition-colors"
                [attr.aria-expanded]="openId() === item.id"
              >
                <div class="flex items-center gap-3">
                  <span class="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md"
                        [ngClass]="{
                          'bg-primary/10 text-primary': item.category === 'pedagogie',
                          'bg-secondary/15 text-secondary': item.category === 'technique',
                          'bg-accent/15 text-accent': item.category === 'achat',
                          'bg-slate-100 text-slate-600': item.category === 'general'
                        }">
                    {{ item.badge }}
                  </span>
                  <span class="font-heading font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    {{ item.question }}
                  </span>
                </div>

                <!-- Chevron animé -->
                <div
                  class="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 flex-shrink-0 transition-transform duration-200"
                  [ngClass]="{ 'rotate-180 bg-primary/10 text-primary': openId() === item.id }"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
              </button>

              <!-- Contenu de la réponse -->
              @if (openId() === item.id) {
                <div class="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 font-normal">
                  <p>{{ item.answer }}</p>
                </div>
              }
            </div>
          }
        </div>

        <!-- Appel à l'action WhatsApp si la question n'est pas dans la liste -->
        <div class="mt-10 p-5 rounded-2xl bg-primary/5 border border-primary/15 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="text-left space-y-0.5">
            <h4 class="font-heading font-bold text-sm text-slate-900">
              Vous avez une question spécifique ou un projet d'établissement ?
            </h4>
            <p class="text-xs text-slate-600">
              Notre équipe technique et pédagogique basée à Bamako vous répond sous 2h.
            </p>
          </div>
          <a
            href="https://wa.me/22375260610?text=Bonjour%20ALTERNIA%2C%20j'ai%20une%20question%20sp%C3%A9cifique%20sur%20le%20bo%C3%AEtier."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary-official text-xs py-2.5 px-5 rounded-full flex-shrink-0 flex items-center gap-2 shadow-sm font-bold"
          >
            <span>Poser ma question sur WhatsApp</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.274.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.158.572 4.184 1.572 5.939l-1.572 5.733 5.897-1.547c1.705.932 3.659 1.475 5.732 1.475 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </div>

      </div>
    </section>
  `
})
export class FaqSectionComponent {
  readonly selectedCategory = signal<string>('all');
  readonly openId = signal<string>('faq-1');

  readonly categories = [
    { id: 'all', label: 'Toutes les questions' },
    { id: 'technique', label: 'Technique & Hors-ligne' },
    { id: 'pedagogie', label: 'Programme Scolaire' },
    { id: 'achat', label: 'Tarifs & Commande' }
  ];

  readonly faqItems: FaqItem[] = [
    {
      id: 'faq-1',
      category: 'technique',
      badge: 'Hors-ligne & Edge AI',
      question: 'Comment le boîtier fonctionne-t-il sans Internet et quelle IA tourne dedans ?',
      answer: 'Le boîtier AlternIA embarque un modèle de langage (LLM) de pointe Qwen 2.5 3B quantifié en GGUF et optimisé pour l\'inférence locale sur processeur basse consommation. Il ne nécessite ni forfait data 4G, ni box Internet : il émet son propre point d\'accès Wi-Fi local auquel les téléphones et tablettes se connectent directement pour dialoguer avec le tuteur vocal.'
    },
    {
      id: 'faq-2',
      category: 'pedagogie',
      badge: 'DEF & Séries Bac',
      question: 'Quelles classes et séries du programme scolaire malien sont couvertes ?',
      answer: 'AlternIA couvre tout le secondaire malien : la 10ème Année (Tronc Commun CG & CT), les 4 séries de 11ème (11ème Sciences SC, 11ème Lettres LL, 11ème Économie SECO, 11ème STI) et l\'ensemble des filières du Baccalauréat en 12ème Terminale (TSE, TSExp, TSS, TSEco, TLL). Le cycle fondamental pour la préparation intensive du DEF est également inclus.'
    },
    {
      id: 'faq-3',
      category: 'technique',
      badge: 'Batterie & Délestages',
      question: 'Quelle est l\'autonomie du boîtier en cas de coupure d\'électricité ?',
      answer: 'Le boîtier AlternIA Box intègre une batterie lithium haute capacité garantissant entre 8 et 12 heures d\'autonomie continue. Il est spécialement calibré pour surmonter les délestages électriques fréquents et peut se recharger sur secteur, prise allume-cigare ou panneau solaire standard en USB-C.'
    },
    {
      id: 'faq-4',
      category: 'pedagogie',
      badge: 'Avatars & Voix',
      question: 'Comment fonctionnent le tuteur vocal socratique et les avatars ?',
      answer: 'Le moteur pédagogique applique une méthode socratique active : il ne donne jamais la solution toute faite mais guide l\'élève étape par étape. Grâce au studio vocal et aux avatars (enseignant, parent, grand-père conteur), l\'élève interagit à la voix avec des intonations chaleureuses et adaptées aux expressions culturelles locales.'
    },
    {
      id: 'faq-5',
      category: 'achat',
      badge: 'Disponibilité',
      question: 'Comment commander et se faire livrer à Bamako ou dans les régions ?',
      answer: 'Vous pouvez commander directement via notre formulaire ou sur notre ligne officielle WhatsApp (+223 75 26 06 10). La livraison est assurée sous 24h à Bamako (à domicile ou en point relais) et sous 48h à 72h dans toutes les régions du Mali (Sikasso, Ségou, Kayes, Mopti, etc.).'
    },
    {
      id: 'faq-6',
      category: 'technique',
      badge: 'Multi-Élèves',
      question: 'Un seul boîtier peut-il servir à plusieurs élèves simultanément ?',
      answer: 'Oui. Le boîtier AlternIA supporte la connexion simultanée de plusieurs smartphones ou tablettes en classe ou au sein du foyer familial. Chaque élève conserve son profil d\'apprentissage distinct avec son historique, son niveau de maîtrise par matière et ses statistiques de progression.'
    },
    {
      id: 'faq-7',
      category: 'pedagogie',
      badge: 'Portail Alta & Écoles',
      question: 'Existe-t-il un portail de suivi pour les directeurs d\'écoles et les parents ?',
      answer: 'Oui, la plateforme web Alta (disponible en accompagnement du dispositif) offre aux chefs d\'établissement et aux parents une vue d\'ensemble en temps réel : supervision de la flotte de boîtiers (batterie, stockage), cartographie des points de blocage par matière, et génération automatisée de fiches de révision et de quiz d\'évaluation.'
    }
  ];

  filteredFaq(): FaqItem[] {
    if (this.selectedCategory() === 'all') {
      return this.faqItems;
    }
    return this.faqItems.filter(item => item.category === this.selectedCategory());
  }

  toggle(id: string): void {
    this.openId.update(current => current === id ? '' : id);
  }
}
