import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../../../core/services/contact.service';
import { PROFIL_OPTIONS, OBJET_OPTIONS } from '../../../../core/models/contact-form.model';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-6xl mx-auto">
      
      <!-- En-tête de Section Harmonisé -->
      <div class="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-1.5 px-2 sm:px-0">
        <span class="inline-block text-secondary text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-0.5 sm:px-3.5 sm:py-1 bg-secondary/10 rounded-full border border-secondary/20">
          Contact & Démonstration
        </span>
        <h2 class="font-heading text-xl sm:text-2xl md:text-3xl text-primary font-bold tracking-tight leading-snug">
          Échangeons sur votre projet éducatif & culturel
        </h2>
        <div class="section-divider"></div>
        <p class="text-slate-600 text-xs sm:text-sm mt-1.5 font-medium max-w-lg sm:max-w-xl mx-auto leading-relaxed">
          Une question sur nos solutions, le boîtier ALTA ou nos tarifs ? Remplissez ce formulaire et notre équipe vous répondra sous 24h.
        </p>
      </div>

      <!-- Grand Cadre Masterpiece 2 Colonnes Élégant & Asymétrique -->
      <div class="bg-white rounded-3xl border-2 border-slate-200/90 shadow-[0_20px_60px_rgba(49,73,153,0.1)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
        
        <!-- ==========================================
             COLONNE GAUCHE (5/12) : HUB ALTERNIA & INFORMATIONS DIRECTES
             ========================================== -->
        <div class="lg:col-span-5 bg-gradient-to-br from-[#243775] via-primary to-[#18254f] text-white p-7 sm:p-9 lg:p-10 relative overflow-hidden flex flex-col justify-between">
          
          <!-- Lueurs d'ambiance et trame géométrique discrète -->
          <div class="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-secondary/25 blur-3xl pointer-events-none" aria-hidden="true"></div>
          <div class="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-accent/20 blur-3xl pointer-events-none" aria-hidden="true"></div>
          
          <div class="relative z-10 space-y-6">
            
            <!-- Badge & Titre d'accroche -->
            <div class="space-y-3">
              <span class="inline-flex items-center gap-2 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest px-3 py-1 bg-white/10 text-white rounded-full border border-white/20 backdrop-blur-md">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Équipe disponible & réactive
              </span>
              <h3 class="font-heading text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white leading-snug">
                Parlons de vive voix ou par écrit
              </h3>
              <p class="text-white/80 text-xs sm:text-sm leading-relaxed">
                Parents, enseignants, directeurs d'école ou partenaires : nous construisons avec vous un accompagnement adapté à vos besoins réels.
              </p>
            </div>

            <!-- Liste des 3 Piliers d'Échange avec Icônes & Cartes Délicates -->
            <div class="space-y-3.5 pt-2">
              
              <!-- 1. Démonstration Boîtier ALTA -->
              <div class="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm hover:bg-white/15 transition-colors">
                <div class="w-10 h-10 rounded-xl bg-secondary/25 text-cyan-200 flex items-center justify-center flex-shrink-0 shadow-xs">
                  <svg class="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                </div>
                <div>
                  <h4 class="text-xs sm:text-sm font-bold text-white">Démonstration du Boîtier ALTA</h4>
                  <p class="text-[11px] sm:text-xs text-white/75 leading-relaxed mt-0.5">
                    Testez l'IA vocale et les cours 100% sans connexion Internet dans votre établissement.
                  </p>
                </div>
              </div>

              <!-- 2. WhatsApp Direct -->
              <a
                href="https://wa.me/22370000000"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-start gap-3.5 p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm hover:bg-emerald-500/30 transition-all group"
                aria-label="Contacter directement sur WhatsApp"
              >
                <div class="w-10 h-10 rounded-xl bg-emerald-500/30 text-emerald-200 flex items-center justify-center flex-shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <svg class="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                </div>
                <div>
                  <div class="flex items-center gap-1.5">
                    <h4 class="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-200 transition-colors">Échange Rapide sur WhatsApp</h4>
                    <svg class="w-3.5 h-3.5 text-emerald-300 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                  <p class="text-[11px] sm:text-xs text-white/75 leading-relaxed mt-0.5">
                    Cliquez ici pour échanger directement avec notre équipe via messagerie instantanée.
                  </p>
                </div>
              </a>

              <!-- 3. Déploiement National -->
              <div class="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm hover:bg-white/15 transition-colors">
                <div class="w-10 h-10 rounded-xl bg-accent/25 text-amber-200 flex items-center justify-center flex-shrink-0 shadow-xs">
                  <svg class="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <h4 class="text-xs sm:text-sm font-bold text-white">Présence à Bamako & Régions</h4>
                  <p class="text-[11px] sm:text-xs text-white/75 leading-relaxed mt-0.5">
                    Nos équipes se déplacent dans toute la capitale et accompagnent les cercles régionaux.
                  </p>
                </div>
              </div>

            </div>

          </div>

          <!-- Bas de Colonne Gauche : Confidentialité -->
          <div class="relative z-10 pt-6 mt-6 border-t border-white/15 flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <p class="text-[11px] text-white/75 leading-snug">
              Vos informations sont traitées sous stricte confidentialité et ne seront jamais transmises à des tiers.
            </p>
          </div>

        </div>

        <!-- ==========================================
             COLONNE DROITE (7/12) : LE FORMULAIRE INTERACTIF & ULTRA-DESIGN
             ========================================== -->
        <div class="lg:col-span-7 bg-white p-7 sm:p-9 lg:p-10 flex flex-col justify-between">
          
          <!-- État : Succès Envoyé -->
          @if (formStatus() === 'success') {
            <div class="py-12 px-6 rounded-3xl bg-emerald-50/70 border-2 border-emerald-200 text-center space-y-4 my-auto">
              <div class="w-16 h-16 rounded-2xl bg-emerald-500 text-white mx-auto flex items-center justify-center font-bold text-3xl shadow-lg shadow-emerald-500/20 animate-bounce">
                ✓
              </div>
              <h4 class="font-heading text-xl sm:text-2xl font-bold text-slate-900">Demande envoyée avec succès !</h4>
              <p class="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                Merci pour votre prise de contact. Notre équipe pédagogique et technique a bien reçu vos informations et vous répondra sous 24 heures.
              </p>
              <button
                type="button"
                (click)="resetForm()"
                class="btn-primary-official text-xs py-2.5 px-6 rounded-full mt-2 font-bold shadow-xs hover:shadow-md transition-all"
              >
                Envoyer un autre message
              </button>
            </div>
          }

          <!-- Formulaire Actif -->
          @if (formStatus() !== 'success') {
            <div>
              
              <!-- En-tête Interne du Formulaire -->
              <div class="border-b border-slate-100 pb-4 mb-6">
                <div class="flex items-center justify-between">
                  <div>
                    <span class="text-[10px] font-extrabold uppercase tracking-wider text-secondary">
                      Formulaire de Contact
                    </span>
                    <h4 class="font-heading text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                      Transmettez-nous votre message
                    </h4>
                  </div>
                  <span class="text-[11px] text-slate-400 font-medium hidden sm:inline">
                    <span class="text-red-500 font-bold">*</span> Champs obligatoires
                  </span>
                </div>
              </div>

              <!-- Message d'erreur en cas d'échec API -->
              @if (formStatus() === 'error') {
                <div class="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs mb-5 flex items-center gap-2.5">
                  <svg class="w-4 h-4 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>
                  <span>Une erreur est survenue lors de l'envoi. Veuillez vérifier les champs et réessayer.</span>
                </div>
              }

              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" novalidate class="space-y-4">
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <!-- Champ 1 : Nom et Prénom avec Icône Utilisateur -->
                  <div class="space-y-1">
                    <label for="nom_prenom" class="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Nom et Prénom <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                      </div>
                      <input
                        id="nom_prenom"
                        type="text"
                        formControlName="nom_prenom"
                        placeholder="Ex: Oumar Traoré"
                        class="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-xs sm:text-sm text-slate-800 font-medium transition-all duration-200 focus:bg-white focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/15"
                        [class.border-red-400]="isFieldInvalid('nom_prenom')"
                      />
                    </div>
                  </div>

                  <!-- Champ 2 : E-mail avec Icône Courrier -->
                  <div class="space-y-1">
                    <label for="email" class="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      E-mail <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                          <polyline points="22,6 12,13 2,6"/>
                        </svg>
                      </div>
                      <input
                        id="email"
                        type="email"
                        formControlName="email"
                        placeholder="votre@email.com"
                        class="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-xs sm:text-sm text-slate-800 font-medium transition-all duration-200 focus:bg-white focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/15"
                        [class.border-red-400]="isFieldInvalid('email')"
                      />
                    </div>
                  </div>

                  <!-- Champ 3 : Numéro WhatsApp avec Icône Téléphone -->
                  <div class="space-y-1">
                    <label for="whatsapp" class="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Numéro WhatsApp <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                      </div>
                      <input
                        id="whatsapp"
                        type="tel"
                        formControlName="whatsapp"
                        placeholder="+223 XX XX XX XX"
                        class="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-xs sm:text-sm text-slate-800 font-medium transition-all duration-200 focus:bg-white focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/15"
                        [class.border-red-400]="isFieldInvalid('whatsapp')"
                      />
                    </div>
                  </div>

                  <!-- Champ 4 : Ville avec Icône Localisation -->
                  <div class="space-y-1">
                    <label for="ville" class="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Ville
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                      </div>
                      <input
                        id="ville"
                        type="text"
                        formControlName="ville"
                        placeholder="Ex: Bamako, Ségou, Sikasso..."
                        class="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-xs sm:text-sm text-slate-800 font-medium transition-all duration-200 focus:bg-white focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/15"
                      />
                    </div>
                  </div>

                  <!-- Champ 5 : Profil avec Icône Profil & Chevron Stylisé -->
                  <div class="space-y-1">
                    <label for="profil" class="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Profil <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                          <circle cx="8.5" cy="7" r="4"/>
                          <polyline points="17 11 19 13 23 9"/>
                        </svg>
                      </div>
                      <select
                        id="profil"
                        formControlName="profil"
                        class="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-xs sm:text-sm text-slate-800 font-medium transition-all duration-200 focus:bg-white focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/15 appearance-none cursor-pointer"
                        [class.border-red-400]="isFieldInvalid('profil')"
                      >
                        <option value="">Sélectionnez votre profil</option>
                        @for (opt of profilOptions; track opt.value) {
                          <option [value]="opt.value">{{ opt.label }}</option>
                        }
                      </select>
                      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
                      </div>
                    </div>
                  </div>

                  <!-- Champ 6 : Objet avec Icône Étiquette & Chevron Stylisé -->
                  <div class="space-y-1">
                    <label for="objet" class="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Objet <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                          <line x1="7" y1="7" x2="7.01" y2="7"/>
                        </svg>
                      </div>
                      <select
                        id="objet"
                        formControlName="objet"
                        class="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-xs sm:text-sm text-slate-800 font-medium transition-all duration-200 focus:bg-white focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/15 appearance-none cursor-pointer"
                        [class.border-red-400]="isFieldInvalid('objet')"
                      >
                        <option value="">Sélectionnez l'objet</option>
                        @for (opt of objetOptions; track opt.value) {
                          <option [value]="opt.value">{{ opt.label }}</option>
                        }
                      </select>
                      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
                      </div>
                    </div>
                  </div>

                </div>

                <!-- Champ 7 : Message avec Icône Bulle -->
                <div class="space-y-1 pt-1">
                  <label for="message" class="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Message <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <div class="absolute top-3 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      </svg>
                    </div>
                    <textarea
                      id="message"
                      rows="3"
                      formControlName="message"
                      placeholder="Précisez votre demande, vos questions ou votre besoin de démonstration..."
                      class="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-xs sm:text-sm text-slate-800 font-medium transition-all duration-200 focus:bg-white focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/15 resize-none"
                      [class.border-red-400]="isFieldInvalid('message')"
                    ></textarea>
                  </div>
                </div>

                <!-- Bouton d'Envoi Haute Performance & Dégradé Alternia -->
                <button
                  type="submit"
                  [disabled]="formStatus() === 'loading'"
                  class="btn-shimmer-subtle w-full text-xs sm:text-sm py-3.5 px-6 rounded-xl bg-gradient-to-r from-primary via-[#3B57B5] to-secondary text-white font-heading font-bold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.008] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2.5 mt-2"
                >
                  @if (formStatus() === 'loading') {
                    <svg class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Transmission en cours...</span>
                  } @else {
                    <span>Envoyer ma demande</span>
                    <svg class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  }
                </button>

              </form>
            </div>
          }

        </div>

      </div>

    </div>
  `
})
export class ContactSectionComponent {
  readonly formStatus = signal<FormStatus>('idle');

  readonly contactForm: FormGroup;
  readonly profilOptions = PROFIL_OPTIONS;
  readonly objetOptions = OBJET_OPTIONS;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.fb.group({
      nom_prenom: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      whatsapp: ['', [Validators.required, Validators.minLength(8)]],
      ville: [''],
      profil: ['', Validators.required],
      objet: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.contactForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    if (this.formStatus() === 'loading') return;

    this.formStatus.set('loading');
    this.contactService.submit(this.contactForm.value).subscribe({
      next: (res) => {
        if (res.success) {
          this.formStatus.set('success');
        } else {
          this.formStatus.set('error');
        }
      },
      error: () => {
        this.formStatus.set('error');
      }
    });
  }

  resetForm(): void {
    this.contactForm.reset();
    this.formStatus.set('idle');
  }
}
