import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalModalService } from '../../../core/services/legal-modal.service';

export type LegalDocType = 'mentions' | 'confidentialite' | 'cookies' | null;

@Component({
  selector: 'app-legal-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (activeDoc()) {
      <!-- Overlay Backdrop -->
      <div
        class="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in"
        (click)="close()"
        aria-hidden="true"
      >
        <!-- Boîte de dialogue modale -->
        <div
          role="dialog"
          aria-modal="true"
          class="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden transform transition-all"
          (click)="$event.stopPropagation()"
        >
          <!-- En-tête de la modale -->
          <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 shadow-xs">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M12 3v18"/>
                  <path d="m6 8 6-2 6 2"/>
                  <path d="M3 13a3 3 0 0 0 6 0l-3-5z"/>
                  <path d="M15 13a3 3 0 0 0 6 0l-3-5z"/>
                  <path d="M4 21h16"/>
                </svg>
              </div>
              <h3 class="font-heading font-bold text-base sm:text-lg text-slate-900">
                @if (activeDoc() === 'mentions') { Mentions Légales }
                @if (activeDoc() === 'confidentialite') { Politique de Confidentialité }
                @if (activeDoc() === 'cookies') { Gestion des Cookies }
              </h3>
            </div>
            
            <button
              type="button"
              (click)="close()"
              class="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors"
              aria-label="Fermer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <!-- Corps défilant du document -->
          <div class="p-6 sm:p-8 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
            
            <!-- CONTENU : MENTIONS LÉGALES -->
            @if (activeDoc() === 'mentions') {
              <div class="space-y-3">
                <h4 class="font-heading font-bold text-slate-900 text-sm">1. Éditeur du Site</h4>
                <p>
                  Le site officiel <strong>ALTERNIA</strong> (accessible à l'adresse alternia.ml) est édité par l'équipe du projet ALTERNIA, initiative technologique et éducative basée à Bamako, République du Mali.
                </p>
                <p>
                  <strong>Contact :</strong> contact&#64;alternia.ml | Tél / WhatsApp : +223 75 26 06 10<br>
                  <strong>Siège du projet :</strong> Bamako, Mali.
                </p>

                <h4 class="font-heading font-bold text-slate-900 text-sm pt-2">2. Direction du Projet</h4>
                <p>
                  Co-fondateurs & Porteurs du projet : Hamza SANMO, Ibrahim Sory DIALLO, Niakalé DIAKITE, Jeanne-Marie SAMAKE.
                </p>

                <h4 class="font-heading font-bold text-slate-900 text-sm pt-2">3. Propriété Intellectuelle</h4>
                <p>
                  L'ensemble des contenus présents sur ce site (textes, logos, visuels, architecture logicielle, concepts du boîtier ALTA, méthodologies pédagogiques) est protégé par les lois sur la propriété intellectuelle et les droits d'auteur en vigueur au Mali et à l'international (OAPI). Toute reproduction sans autorisation préalable est strictement interdite.
                </p>

                <h4 class="font-heading font-bold text-slate-900 text-sm pt-2">4. Hébergement</h4>
                <p>
                  Le site est hébergé sur des serveurs sécurisés garantissant une haute disponibilité et un chiffrement SSL (HTTPS) de bout en bout.
                </p>
              </div>
            }

            <!-- CONTENU : CONFIDENTIALITÉ & DONNÉES ÉLÈVES -->
            @if (activeDoc() === 'confidentialite') {
              <div class="space-y-3">
                <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2.5">
                  <div class="w-5 h-5 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      <polyline points="9 12 11 14 15 10"/>
                    </svg>
                  </div>
                  <span><strong>Engagement éthique :</strong> ALTERNIA ne revend aucune donnée et protège strictement la vie privée des élèves et mineurs.</span>
                </div>

                <h4 class="font-heading font-bold text-slate-900 text-sm">1. Protection des données des mineurs</h4>
                <p>
                  Le boîtier intelligent ALTA a été conçu selon le principe de « Privacy by Design ». Fonctionnant sans connexion Internet permanente, les données d'apprentissage restent stockées localement sur le dispositif dans le foyer ou la classe.
                </p>

                <h4 class="font-heading font-bold text-slate-900 text-sm pt-2">2. Données collectées via le formulaire de contact</h4>
                <p>
                  Lorsque vous remplissez notre formulaire (nom, e-mail, WhatsApp, ville), ces informations sont uniquement utilisées pour répondre à votre demande commerciale ou pédagogique. Elles ne sont jamais cédées à des tiers.
                </p>

                <h4 class="font-heading font-bold text-slate-900 text-sm pt-2">3. Enregistrements vocaux (Version Premium)</h4>
                <p>
                  Les enregistrements servant au clonage de voix de l'enseignant ou du parent sont cryptés localement. Le modèle vocal généré n'est utilisé que pour l'interaction avec votre enfant.
                </p>

                <h4 class="font-heading font-bold text-slate-900 text-sm pt-2">4. Vos droits</h4>
                <p>
                  Vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles sur simple demande par e-mail à <strong>contact&#64;alternia.ml</strong>.
                </p>
              </div>
            }

            <!-- CONTENU : COOKIES -->
            @if (activeDoc() === 'cookies') {
              <div class="space-y-3">
                <h4 class="font-heading font-bold text-slate-900 text-sm">1. Utilisation des cookies</h4>
                <p>
                  ALTERNIA applique une politique de cookies minimale et respectueuse.
                </p>
                <ul class="list-disc list-inside space-y-1.5 pl-2">
                  <li><strong>Cookies strictement nécessaires :</strong> Ils permettent de mémoriser vos préférences d'affichage (acceptation du bandeau, session PWA).</li>
                  <li><strong>Cookies de mesure d'audience anonyme :</strong> Ils nous aident à savoir quelles sections sont les plus consultées afin d'améliorer la plateforme.</li>
                </ul>

                <h4 class="font-heading font-bold text-slate-900 text-sm pt-2">2. Absence de traqueurs publicitaires</h4>
                <p>
                  Notre site ne comporte aucun cookie tiers publicitaire (Facebook Pixel, trackers invasifs). Vous pouvez révoquer votre consentement à tout moment via les paramètres de votre navigateur.
                </p>
              </div>
            }

          </div>

          <!-- Pied de la modale -->
          <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              (click)="close()"
              class="btn-primary-official px-5 py-2 text-xs rounded-xl"
            >
              J'ai compris
            </button>
          </div>

        </div>
      </div>
    }
  `
})
export class LegalModalComponent {
  constructor(readonly legalService: LegalModalService) {}

  get activeDoc(): any {
    return this.legalService.activeDoc;
  }

  close(): void {
    this.legalService.close();
  }
}
