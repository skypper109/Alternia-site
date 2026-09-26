import { Component, signal, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NavItem {
  label: string;
  targetId: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Header Flottant en Capsule (max-w-[80rem]) -->
    <div class="fixed top-3 sm:top-4 inset-x-0 z-50 px-3 sm:px-6 pointer-events-none">
      <header
        class="max-w-[80rem] mx-auto pointer-events-auto rounded-full transition-all duration-200 shadow-lg border border-slate-200/80 bg-white/95 backdrop-blur-md px-5 sm:px-8 py-2"
        [ngClass]="{
          'shadow-xl py-1.5': scrolled(),
          'py-2': !scrolled()
        }"
        role="banner"
      >
        <div class="flex items-center justify-between">

          <!-- Logo ALTERNIA avec logo.svg + texte AlterniA bicolore -->
          <a
            href="#accueil"
            (click)="scrollTo('accueil', $event)"
            class="flex items-center gap-3 focus-visible:outline-none group py-0.5"
            aria-label="ALTERNIA — Accueil"
          >
            <img
              src="assets/images/logo.svg"
              alt="Logo ALTERNIA"
              class="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              loading="eager"
            />
            <span class="font-heading font-extrabold text-xl sm:text-2xl tracking-tight select-none">
              <span class="text-primary">Altern</span><span class="text-secondary">iA</span>
            </span>
          </a>

          <!-- Navigation principale : 4 menus réguliers + 1 bouton spécial CONTACT -->
          <nav class="hidden md:flex items-center gap-3 lg:gap-5" aria-label="Navigation principale">
            @for (item of mainNavItems; track item.targetId) {
              <a
                [href]="'#' + item.targetId"
                (click)="scrollTo(item.targetId, $event)"
                class="nav-link px-3.5 py-1.5 text-xs lg:text-sm font-bold uppercase tracking-wider transition-all duration-150"
                [ngClass]="{
                  'active text-secondary': activeSection() === item.targetId,
                  'text-slate-700 hover:text-secondary': activeSection() !== item.targetId
                }"
              >
                {{ item.label }}
              </a>
            }

            <!-- Bouton Spécial CONTACT (Style pilule pleine Orange Corail) -->
            <a
              href="#contact"
              (click)="scrollTo('contact', $event)"
              class="ml-3 inline-flex items-center justify-center px-6 py-2 rounded-full bg-accent hover:bg-[#d87212] text-white font-bold text-xs lg:text-sm uppercase tracking-wider shadow-md hover:shadow-accent/40 hover:scale-105 active:scale-95 transition-all duration-200"
              aria-label="Contact"
            >
              Contact
            </a>
          </nav>

          <!-- Bouton Menu Mobile Hamburger -->
          <button
            type="button"
            class="md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-1 rounded-full bg-slate-100 text-primary hover:bg-slate-200 transition-colors"
            [attr.aria-expanded]="menuOpen()"
            aria-controls="mobile-menu"
            aria-label="Menu de navigation"
            (click)="toggleMenu()"
          >
            <span
              class="w-4 h-0.5 bg-primary transition-all duration-200 origin-center"
              [ngClass]="{ 'rotate-45 translate-y-1.5': menuOpen() }"
            ></span>
            <span
              class="w-4 h-0.5 bg-primary transition-all duration-200"
              [ngClass]="{ 'opacity-0 scale-x-0': menuOpen() }"
            ></span>
            <span
              class="w-4 h-0.5 bg-primary transition-all duration-200 origin-center"
              [ngClass]="{ '-rotate-45 -translate-y-1.5': menuOpen() }"
            ></span>
          </button>

        </div>
      </header>
    </div>

    <!-- Overlay Mobile -->
    @if (menuOpen()) {
      <div
        class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 md:hidden"
        (click)="closeMenu()"
        aria-hidden="true"
      ></div>
    }

    <!-- Tiroir Mobile (Drawer) Centré sur les 5 options du menu -->
    <div
      id="mobile-menu"
      class="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white text-slate-900 z-50 shadow-2xl transform transition-transform duration-300 ease-out md:hidden flex flex-col"
      [ngClass]="{ 'translate-x-0': menuOpen(), 'translate-x-full': !menuOpen() }"
      role="dialog"
      [attr.aria-modal]="menuOpen()"
      aria-label="Menu mobile"
    >
      <!-- En-tête du Tiroir -->
      <div class="flex items-center justify-between p-5 border-b border-slate-100">
        <div class="flex items-center gap-2">
          <img
            src="assets/images/logo.svg"
            alt="ALTERNIA"
            class="h-8 w-auto object-contain"
          />
          <span class="font-heading font-extrabold text-xl tracking-tight">
            <span class="text-primary">Altern</span><span class="text-secondary">iA</span>
          </span>
        </div>
        <button
          type="button"
          class="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
          aria-label="Fermer le menu"
          (click)="closeMenu()"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <!-- Les 5 Options du Menu (Focus Clair & Épuré) -->
      <nav class="p-6 space-y-3 flex-1 overflow-y-auto" aria-label="Liens mobiles">
        @for (item of allNavItems; track item.targetId) {
          @if (item.targetId === 'contact') {
            <a
              [href]="'#' + item.targetId"
              (click)="scrollTo(item.targetId, $event)"
              class="flex items-center justify-center px-5 py-3.5 rounded-xl bg-accent hover:bg-[#d87212] text-white font-bold text-sm tracking-wide shadow-md mt-6 transition-all duration-200"
            >
              <span>{{ item.label }}</span>
            </a>
          } @else {
            <a
              [href]="'#' + item.targetId"
              (click)="scrollTo(item.targetId, $event)"
              class="flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-150 font-semibold text-sm"
              [ngClass]="{
                'bg-secondary/15 text-secondary font-bold': activeSection() === item.targetId,
                'text-slate-700 hover:text-secondary hover:bg-slate-50': activeSection() !== item.targetId
              }"
            >
              <span>{{ item.label }}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </a>
          }
        }
      </nav>
    </div>
  `
})
export class HeaderComponent implements OnInit {
  readonly scrolled = signal<boolean>(false);
  readonly menuOpen = signal<boolean>(false);
  readonly activeSection = signal<string>('accueil');

  readonly mainNavItems: NavItem[] = [
    { label: 'Accueil', targetId: 'accueil' },
    { label: 'Éducation', targetId: 'education' },
    { label: 'Démo IA', targetId: 'demo-ia' },
    { label: 'Culture', targetId: 'culture' },
    { label: 'FAQ', targetId: 'faq' }
  ];

  readonly allNavItems: NavItem[] = [
    ...this.mainNavItems,
    { label: 'Contact', targetId: 'contact' }
  ];

  ngOnInit(): void {
    this.updateActiveSectionFromHash();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 15);
    this.detectActiveSection();
  }

  private detectActiveSection(): void {
    const sections = ['accueil', 'education', 'demo-ia', 'culture', 'faq', 'contact'];
    const scrollPosition = window.scrollY + 140;

    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el && el.offsetTop <= scrollPosition) {
        this.activeSection.set(sections[i]);
        return;
      }
    }
    this.activeSection.set('accueil');
  }

  private updateActiveSectionFromHash(): void {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      if (this.navItems.some(i => i.targetId === hash)) {
        this.activeSection.set(hash);
      }
    }
  }

  get navItems(): NavItem[] {
    return this.allNavItems;
  }

  scrollTo(targetId: string, event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.closeMenu();
    this.activeSection.set(targetId);

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${targetId}`);
    }
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
