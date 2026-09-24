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
    <div class="max-w-3xl mx-auto">
      
      <!-- En-tête avec Titre Harmonisé Compact -->
      <div class="text-center mb-4 sm:mb-5 space-y-1">
        <span class="inline-block text-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-0.5 bg-primary/10 rounded-full">
          Prise de Contact
        </span>
        <h3 class="font-heading text-lg sm:text-xl md:text-2xl text-primary font-bold tracking-tight leading-snug">
          Formulaire de contact
        </h3>
        <p class="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto font-medium">
          Pour obtenir des informations, acheter un boîtier ou envisager son utilisation.
        </p>
      </div>

      <!-- État : Succès -->
      @if (formStatus() === 'success') {
        <div class="p-6 rounded-2xl bg-white border border-emerald-200 shadow-md text-center space-y-2.5">
          <div class="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center font-bold shadow-xs">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h4 class="font-heading text-xl font-bold text-slate-900">Demande envoyée avec succès</h4>
          <p class="text-slate-600 text-xs max-w-md mx-auto">
            Merci pour votre message. Notre équipe prendra contact avec vous dans les meilleurs délais.
          </p>
          <button
            type="button"
            (click)="resetForm()"
            class="btn-primary-official text-xs py-1.5 px-4 rounded-lg mt-1"
          >
            Envoyer un autre message
          </button>
        </div>
      }

      <!-- Formulaire Compact en 2 colonnes -->
      @if (formStatus() !== 'success') {
        <div class="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-sm">
          
          @if (formStatus() === 'error') {
            <div class="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs mb-3 flex items-center gap-2">
              <span>Une erreur est survenue lors de l'envoi. Veuillez vérifier les champs et réessayer.</span>
            </div>
          }

          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" novalidate class="space-y-3">
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <!-- Champ 1 : Nom et Prénom -->
              <div class="space-y-1">
                <label for="nom_prenom" class="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Nom et Prénom <span class="text-red-500">*</span>
                </label>
                <input
                  id="nom_prenom"
                  type="text"
                  formControlName="nom_prenom"
                  placeholder="Ex: Oumar Traoré"
                  class="w-full px-3 py-1.5 sm:py-2 rounded-lg border border-slate-300 text-xs sm:text-sm transition-all duration-200 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30"
                  [class.border-red-400]="isFieldInvalid('nom_prenom')"
                />
              </div>

              <!-- Champ 2 : E-mail -->
              <div class="space-y-1">
                <label for="email" class="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  E-mail <span class="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  formControlName="email"
                  placeholder="votre@email.com"
                  class="w-full px-3 py-1.5 sm:py-2 rounded-lg border border-slate-300 text-xs sm:text-sm transition-all duration-200 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30"
                  [class.border-red-400]="isFieldInvalid('email')"
                />
              </div>

              <!-- Champ 3 : Numéro WhatsApp -->
              <div class="space-y-1">
                <label for="whatsapp" class="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Numéro WhatsApp <span class="text-red-500">*</span>
                </label>
                <input
                  id="whatsapp"
                  type="tel"
                  formControlName="whatsapp"
                  placeholder="+223 XX XX XX XX"
                  class="w-full px-3 py-1.5 sm:py-2 rounded-lg border border-slate-300 text-xs sm:text-sm transition-all duration-200 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30"
                  [class.border-red-400]="isFieldInvalid('whatsapp')"
                />
              </div>

              <!-- Champ 4 : Ville -->
              <div class="space-y-1">
                <label for="ville" class="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Ville
                </label>
                <input
                  id="ville"
                  type="text"
                  formControlName="ville"
                  placeholder="Ex: Bamako"
                  class="w-full px-3 py-1.5 sm:py-2 rounded-lg border border-slate-300 text-xs sm:text-sm transition-all duration-200 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30"
                />
              </div>

              <!-- Champ 5 : Profil -->
              <div class="space-y-1">
                <label for="profil" class="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Profil <span class="text-red-500">*</span>
                </label>
                <select
                  id="profil"
                  formControlName="profil"
                  class="w-full px-3 py-1.5 sm:py-2 rounded-lg border border-slate-300 text-xs sm:text-sm transition-all duration-200 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30 bg-white"
                >
                  <option value="">Sélectionnez votre profil</option>
                  @for (opt of profilOptions; track opt.value) {
                    <option [value]="opt.value">{{ opt.label }}</option>
                  }
                </select>
              </div>

              <!-- Champ 6 : Objet -->
              <div class="space-y-1">
                <label for="objet" class="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Objet <span class="text-red-500">*</span>
                </label>
                <select
                  id="objet"
                  formControlName="objet"
                  class="w-full px-3 py-1.5 sm:py-2 rounded-lg border border-slate-300 text-xs sm:text-sm transition-all duration-200 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30 bg-white"
                >
                  <option value="">Sélectionnez l'objet</option>
                  @for (opt of objetOptions; track opt.value) {
                    <option [value]="opt.value">{{ opt.label }}</option>
                  }
                </select>
              </div>
            </div>

            <!-- Champ 7 : Message -->
            <div class="space-y-1">
              <label for="message" class="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Message <span class="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                rows="2"
                formControlName="message"
                placeholder="Votre message..."
                class="w-full px-3 py-1.5 sm:py-2 rounded-lg border border-slate-300 text-xs sm:text-sm transition-all duration-200 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30 resize-none"
                [class.border-red-400]="isFieldInvalid('message')"
              ></textarea>
            </div>

            <!-- Boutons d'envoi -->
            <button
              type="submit"
              [disabled]="formStatus() === 'loading'"
              class="btn-primary-official btn-shimmer-subtle w-full text-xs sm:text-sm py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-sm font-bold"
            >
              @if (formStatus() === 'loading') {
                <span>Envoi en cours...</span>
              } @else {
                <span>Envoyer ma demande par E-mail</span>
              }
            </button>

            <div class="relative flex py-1 items-center">
              <div class="flex-grow border-t border-slate-200"></div>
              <span class="flex-shrink mx-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">OU</span>
              <div class="flex-grow border-t border-slate-200"></div>
            </div>

            <!-- Bouton WhatsApp Direct -->
            <button
              type="button"
              (click)="sendViaWhatsapp()"
              class="w-full text-xs sm:text-sm py-2.5 rounded-xl border-2 border-emerald-500 text-emerald-700 bg-emerald-50/50 hover:bg-emerald-100/60 active:scale-[0.99] font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.274.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.158.572 4.184 1.572 5.939l-1.572 5.733 5.897-1.547c1.705.932 3.659 1.475 5.732 1.475 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>Transmettre directement sur WhatsApp</span>
            </button>

          </form>
        </div>
      }

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

  sendViaWhatsapp(): void {
    const val = this.contactForm.value;
    const name = val.nom_prenom?.trim() || '';
    const profil = val.profil ? `Profil : ${val.profil}` : '';
    const ville = val.ville ? `Ville : ${val.ville}` : '';
    const objet = val.objet ? `Objet : ${val.objet}` : '';
    const msg = val.message ? `Message : ${val.message}` : '';

    const lines = [
      name ? `Bonjour ALTERNIA, je suis ${name}.` : 'Bonjour ALTERNIA,',
      profil,
      ville,
      objet,
      msg
    ].filter(Boolean).join('\n');

    const url = `https://wa.me/22375260610?text=${encodeURIComponent(lines)}`;
    window.open(url, '_blank');
  }

  getWhatsappConfirmationLink(): string {
    const val = this.contactForm.value;
    const name = val.nom_prenom || '';
    const text = encodeURIComponent(`Bonjour ALTERNIA, je suis ${name}. Je viens de soumettre une demande via votre site web et souhaite échanger avec vous.`);
    return `https://wa.me/22375260610?text=${text}`;
  }

  resetForm(): void {
    this.contactForm.reset();
    this.formStatus.set('idle');
  }
}
