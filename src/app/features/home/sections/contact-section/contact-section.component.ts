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
          <div class="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center font-bold text-base">
            ✓
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

            <!-- Bouton -->
            <button
              type="submit"
              [disabled]="formStatus() === 'loading'"
              class="btn-primary-official btn-shimmer-subtle w-full text-xs sm:text-sm py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-sm font-bold"
            >
              @if (formStatus() === 'loading') {
                <span>Envoi en cours...</span>
              } @else {
                <span>Envoyer ma demande</span>
              }
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

  resetForm(): void {
    this.contactForm.reset();
    this.formStatus.set('idle');
  }
}
