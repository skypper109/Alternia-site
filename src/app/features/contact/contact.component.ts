import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { CtaButtonComponent } from '../../shared/components/cta-button/cta-button.component';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';
import { SeoService } from '../../core/services/seo.service';
import { ContactService } from '../../core/services/contact.service';
import { GeolocationService } from '../../core/services/geolocation.service';
import { TeamMember } from '../../core/models/team-member.model';
import { PROFIL_OPTIONS, OBJET_OPTIONS } from '../../core/models/contact-form.model';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, SectionTitleComponent, CtaButtonComponent, FadeInDirective],
  template: `
    <!-- ======== ÉQUIPE ======== -->
    <section class="py-16 md:py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div [appFadeIn]="0">
          <app-section-title
            label="Notre équipe"
            title="Des personnes engagées pour l'éducation"
            subtitle="ALTERNIA est porté par une équipe pluridisciplinaire, unie autour d'une conviction : chaque élève mérite un accompagnement adapté."
            [centered]="true"
          />
        </div>

        <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (member of team; track member.id) {
            <article [appFadeIn]="$index * 80" class="card-base p-6 text-center flex flex-col items-center group">
              <!-- Photo placeholder -->
              <div class="w-20 h-20 rounded-2xl bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/12 transition-colors overflow-hidden">
                @if (member.photo) {
                  <img
                    [src]="member.photo"
                    [alt]="member.prenom + ' ' + member.nom"
                    class="w-full h-full object-cover"
                    loading="lazy"
                  >
                } @else {
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#314999" stroke-width="1.5" aria-hidden="true">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                  </svg>
                }
              </div>

              <h3 class="font-heading font-semibold text-primary text-base leading-tight mb-0.5">
                {{ member.prenom }} {{ member.nom }}
              </h3>
              <p class="text-secondary text-xs font-semibold uppercase tracking-wide mb-3">
                {{ member.poste }}
              </p>
              <p class="text-gray-500 text-xs leading-relaxed flex-1">
                {{ member.description }}
              </p>

              <!-- Social links -->
              <div class="flex items-center gap-2 mt-4">
                @if (member.linkedin) {
                  <a
                    [href]="member.linkedin"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-7 h-7 bg-primary/8 hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-all text-primary group/icon"
                    [attr.aria-label]="'LinkedIn de ' + member.prenom + ' ' + member.nom"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                }
                @if (member.facebook) {
                  <a
                    [href]="member.facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-7 h-7 bg-primary/8 hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-all text-primary"
                    [attr.aria-label]="'Facebook de ' + member.prenom + ' ' + member.nom"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                }
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- ======== FORMULAIRE DE CONTACT ======== -->
    <section class="py-16 md:py-24 bg-gray-50" id="formulaire">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div [appFadeIn]="0" class="text-center mb-10">
          <app-section-title
            label="Nous contacter"
            title="Parlons de votre projet"
            subtitle="Parents, directeurs d'école ou partenaires — remplissez ce formulaire et nous vous répondrons dans les meilleurs délais."
            [centered]="true"
          />
        </div>

        <!-- Success state -->
        @if (formStatus() === 'success') {
          <div [appFadeIn]="0" class="bg-white rounded-2xl border border-green-100 shadow-card p-10 text-center">
            <div class="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h2 class="font-heading text-2xl text-primary mb-3">Message envoyé !</h2>
            <p class="text-gray-500 text-base leading-relaxed max-w-sm mx-auto">
              Merci pour votre message. Notre équipe vous répondra dans les meilleurs délais.
            </p>
            <button
              type="button"
              class="mt-6 text-primary text-sm font-semibold hover:underline"
              (click)="resetForm()"
            >
              Envoyer un autre message
            </button>
          </div>
        }

        <!-- Form -->
        @if (formStatus() !== 'success') {
          <div [appFadeIn]="50" class="bg-white rounded-2xl shadow-card border border-gray-100 p-6 md:p-10">

            <!-- Error banner -->
            @if (formStatus() === 'error') {
              <div class="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3" role="alert">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" class="flex-shrink-0 mt-0.5" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p class="text-red-600 text-sm">Une erreur s'est produite. Veuillez réessayer ou nous contacter par WhatsApp.</p>
              </div>
            }

            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" novalidate>

              <!-- Ligne 1 : Nom + Prénom -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label for="nom" class="form-label">Nom <span class="text-red-500" aria-label="obligatoire">*</span></label>
                  <input
                    id="nom"
                    type="text"
                    formControlName="nom"
                    autocomplete="family-name"
                    placeholder="Votre nom"
                    class="form-input"
                    [class.error]="isFieldInvalid('nom')"
                    [attr.aria-invalid]="isFieldInvalid('nom')"
                    aria-describedby="nom-error"
                  >
                  @if (isFieldInvalid('nom')) {
                    <p id="nom-error" class="form-error" role="alert">Le nom est requis.</p>
                  }
                </div>
                <div>
                  <label for="prenom" class="form-label">Prénom <span class="text-red-500" aria-label="obligatoire">*</span></label>
                  <input
                    id="prenom"
                    type="text"
                    formControlName="prenom"
                    autocomplete="given-name"
                    placeholder="Votre prénom"
                    class="form-input"
                    [class.error]="isFieldInvalid('prenom')"
                    [attr.aria-invalid]="isFieldInvalid('prenom')"
                    aria-describedby="prenom-error"
                  >
                  @if (isFieldInvalid('prenom')) {
                    <p id="prenom-error" class="form-error" role="alert">Le prénom est requis.</p>
                  }
                </div>
              </div>

              <!-- Ligne 2 : Email + WhatsApp -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label for="email" class="form-label">Adresse e-mail <span class="text-red-500" aria-label="obligatoire">*</span></label>
                  <input
                    id="email"
                    type="email"
                    formControlName="email"
                    autocomplete="email"
                    placeholder="votre@email.com"
                    class="form-input"
                    [class.error]="isFieldInvalid('email')"
                    [attr.aria-invalid]="isFieldInvalid('email')"
                    aria-describedby="email-error"
                  >
                  @if (isFieldInvalid('email')) {
                    <p id="email-error" class="form-error" role="alert">
                      @if (contactForm.get('email')?.errors?.['required']) { L'email est requis. }
                      @if (contactForm.get('email')?.errors?.['email']) { Format d'email invalide. }
                    </p>
                  }
                </div>
                <div>
                  <label for="whatsapp" class="form-label">Numéro WhatsApp</label>
                  <input
                    id="whatsapp"
                    type="tel"
                    formControlName="whatsapp"
                    autocomplete="tel"
                    placeholder="+223 XX XX XX XX"
                    class="form-input"
                  >
                </div>
              </div>

              <!-- Ville avec géolocalisation -->
              <div class="mb-4">
                <label for="ville" class="form-label">
                  Ville
                  @if (!locationLoading()) {
                    <button
                      type="button"
                      class="ml-2 text-secondary text-xs hover:underline focus-visible:outline-none"
                      (click)="detectLocation()"
                      [disabled]="locationLoading()"
                      aria-label="Détecter ma ville automatiquement"
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="inline mr-0.5" aria-hidden="true">
                        <circle cx="12" cy="12" r="3"/>
                        <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                      </svg>
                      Détecter ma ville
                    </button>
                  }
                </label>
                <input
                  id="ville"
                  type="text"
                  formControlName="ville"
                  autocomplete="address-level2"
                  placeholder="Votre ville"
                  class="form-input"
                  [disabled]="locationLoading()"
                >
                @if (locationLoading()) {
                  <p class="text-secondary text-xs mt-1">Détection en cours...</p>
                }
                <p class="text-gray-400 text-xs mt-1">
                  La géolocalisation est utilisée uniquement pour remplir ce champ. Vous pouvez modifier la valeur manuellement.
                </p>
              </div>

              <!-- Profil + Objet -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label for="profil" class="form-label">Vous êtes <span class="text-red-500" aria-label="obligatoire">*</span></label>
                  <select
                    id="profil"
                    formControlName="profil"
                    class="form-input"
                    [class.error]="isFieldInvalid('profil')"
                    [attr.aria-invalid]="isFieldInvalid('profil')"
                  >
                    <option value="">Votre profil</option>
                    @for (opt of profilOptions; track opt.value) {
                      <option [value]="opt.value">{{ opt.label }}</option>
                    }
                  </select>
                </div>
                <div>
                  <label for="objet" class="form-label">Objet de votre demande <span class="text-red-500" aria-label="obligatoire">*</span></label>
                  <select
                    id="objet"
                    formControlName="objet"
                    class="form-input"
                    [class.error]="isFieldInvalid('objet')"
                    [attr.aria-invalid]="isFieldInvalid('objet')"
                  >
                    <option value="">Choisir un objet</option>
                    @for (opt of objetOptions; track opt.value) {
                      <option [value]="opt.value">{{ opt.label }}</option>
                    }
                  </select>
                </div>
              </div>

              <!-- Message -->
              <div class="mb-5">
                <label for="message" class="form-label">Message <span class="text-red-500" aria-label="obligatoire">*</span></label>
                <textarea
                  id="message"
                  formControlName="message"
                  rows="4"
                  placeholder="Décrivez votre demande, vos questions ou vos attentes..."
                  class="form-input resize-none"
                  [class.error]="isFieldInvalid('message')"
                  [attr.aria-invalid]="isFieldInvalid('message')"
                  aria-describedby="message-error"
                ></textarea>
                @if (isFieldInvalid('message')) {
                  <p id="message-error" class="form-error" role="alert">
                    @if (contactForm.get('message')?.errors?.['required']) { Le message est requis. }
                    @if (contactForm.get('message')?.errors?.['minlength']) { Le message doit contenir au moins 20 caractères. }
                  </p>
                }
              </div>

              <!-- Consentement -->
              <div class="mb-6">
                <label class="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    formControlName="consentement"
                    class="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-secondary"
                    aria-describedby="consent-error"
                  >
                  <span class="text-gray-500 text-xs leading-relaxed">
                    J'accepte que mes informations soient utilisées pour traiter ma demande. Elles ne seront pas partagées avec des tiers.
                    <a href="#" class="text-primary hover:underline">Politique de confidentialité</a>
                  </span>
                </label>
                @if (isFieldInvalid('consentement')) {
                  <p id="consent-error" class="form-error mt-1" role="alert">
                    Vous devez accepter pour envoyer le formulaire.
                  </p>
                }
              </div>

              <!-- Submit button -->
              <app-cta-button
                type="submit"
                variant="primary"
                size="lg"
                [shimmer]="true"
                [disabled]="formStatus() === 'loading'"
                class="w-full"
                ariaLabel="Envoyer ma demande"
              >
                @if (formStatus() === 'loading') {
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" class="animate-spin mr-2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
                    <path d="M12 2a10 10 0 0 1 10 10" />
                  </svg>
                  Envoi en cours...
                } @else {
                  Envoyer ma demande
                }
              </app-cta-button>

            </form>
          </div>
        }
      </div>
    </section>
  `
})
export class ContactComponent implements OnInit {
  readonly contactForm: FormGroup;
  readonly formStatus = signal<FormStatus>('idle');
  readonly locationLoading = signal<boolean>(false);

  readonly profilOptions = PROFIL_OPTIONS;
  readonly objetOptions = OBJET_OPTIONS;

  readonly team: TeamMember[] = [
    {
      id: 'hamza',
      prenom: 'Hamza',
      nom: 'SANMO',
      poste: 'Business Manager & Product Lead',
      description: "Responsable du pilotage produit, de la stratégie, du développement commercial et de la coordination globale du projet.",
      photo: 'assets/images/team/hamza-sanmo.svg',
      linkedin: 'https://linkedin.com/in/',
      facebook: 'https://facebook.com/'
    },
    {
      id: 'ibrahim',
      prenom: 'Ibrahim Sory',
      nom: 'DIALLO',
      poste: 'Technical Lead & AI Architect',
      description: "Responsable de l'architecture technique, des systèmes intelligents, de la data science et de la conception électronique du boîtier.",
      photo: 'assets/images/team/ibrahim-diallo.svg',
      linkedin: 'https://linkedin.com/in/',
      facebook: 'https://facebook.com/'
    },
    {
      id: 'niakale',
      prenom: 'Niakalé',
      nom: 'DIAKITE',
      poste: 'Full Stack Developer',
      description: "Responsable de la conception et du développement de l'application web et mobile.",
      photo: 'assets/images/team/niakale-diakite.svg',
      linkedin: 'https://linkedin.com/in/',
      facebook: 'https://facebook.com/'
    },
    {
      id: 'jeanne',
      prenom: 'Jeanne-Marie',
      nom: 'SAMAKE',
      poste: 'Brand Designer',
      description: "Chargée de l'identité visuelle, de l'UI/UX design et de la cohérence de la marque sur l'ensemble des canaux de communication.",
      photo: 'assets/images/team/jeanne-samake.svg',
      linkedin: 'https://linkedin.com/in/',
      facebook: 'https://facebook.com/'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private geoService: GeolocationService,
    private seo: SeoService
  ) {
    this.contactForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      whatsapp: [''],
      ville: [''],
      profil: ['', Validators.required],
      objet: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(20)]],
      consentement: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    this.seo.setMeta({
      title: 'Contactez-nous',
      description: "Contactez l'équipe ALTERNIA pour une présentation, une demande de boîtier ou un partenariat. Nous répondons dans les meilleurs délais."
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.contactForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  detectLocation(): void {
    this.locationLoading.set(true);
    this.geoService.getCity().subscribe({
      next: (city) => {
        if (city) {
          this.contactForm.patchValue({ ville: city });
        }
        this.locationLoading.set(false);
      },
      error: () => {
        this.locationLoading.set(false);
      }
    });
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
