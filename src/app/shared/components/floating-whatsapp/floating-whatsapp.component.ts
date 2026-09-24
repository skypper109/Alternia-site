import { Component, signal, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-floating-whatsapp',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Bouton Flottant WhatsApp : Pilule complète en haut, Cercle Parfaitement Proportionné et Centré au Scroll (+22375260610) -->
    <aside
      class="fixed bottom-5 right-4 sm:bottom-6 sm:right-8 lg:right-[max(1.5rem,calc((100vw-80rem)/2+2rem))] z-50 flex items-center justify-center focus-within:outline-none pointer-events-auto"
      aria-label="Contacter ALTERNIA sur WhatsApp"
    >
      <a
        href="https://wa.me/22375260610?text=Bonjour%20ALTERNIA%2C%20je%20souhaite%20avoir%20des%20informations%20sur%20le%20bo%C3%AEtier."
        target="_blank"
        rel="noopener noreferrer"
        class="group relative flex items-center justify-center rounded-full bg-accent hover:bg-[#d87212] text-white font-bold shadow-[0_6px_25px_rgba(241,133,31,0.45)] hover:shadow-[0_8px_30px_rgba(241,133,31,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/40"
        [ngClass]="{
          'w-12 h-12 sm:w-14 sm:h-14 p-0': scrolled(),
          'px-4 py-2.5 sm:px-5 sm:py-3 gap-2 text-xs sm:text-base': !scrolled()
        }"
        [attr.title]="scrolled() ? 'Contacter ALTERNIA sur WhatsApp (+223 75 26 06 10)' : null"
        aria-label="Discuter sur WhatsApp avec ALTERNIA"
      >
        <!-- Lueur animée d'attention -->
        <span class="absolute inset-0 rounded-full bg-accent animate-ping opacity-20 pointer-events-none"></span>

        <!-- Icône WhatsApp SVG (Parfaitement Dimensionnée et Centrée dans le cercle) -->
        <svg
          class="w-5 h-5 sm:w-6 sm:h-6 fill-current relative z-10 flex-shrink-0"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.274.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.158.572 4.184 1.572 5.939l-1.572 5.733 5.897-1.547c1.705.932 3.659 1.475 5.732 1.475 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z"/>
        </svg>

        <!-- Texte 'WhatsApp' affiché uniquement en haut de page -->
        @if (!scrolled()) {
          <span class="relative z-10 whitespace-nowrap tracking-wide font-bold">
            WhatsApp
          </span>
        }
      </a>
    </aside>
  `
})
export class FloatingWhatsappComponent implements OnInit {
  readonly scrolled = signal<boolean>(false);

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.scrolled.set(window.scrollY > 40);
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (typeof window !== 'undefined') {
      this.scrolled.set(window.scrollY > 40);
    }
  }
}
