import { Component, Input } from '@angular/core';

/**
 * SectionTitleComponent — Reusable section heading with optional label and subtitle.
 * Usage: <app-section-title label="Éducation" title="Un assistant pour chaque élève" subtitle="..." />
 */
@Component({
  selector: 'app-section-title',
  standalone: true,
  template: `
    <div [class]="centered ? 'text-center' : 'text-left'">
      @if (label) {
        <span class="inline-block text-secondary text-xs font-semibold tracking-widest uppercase mb-3 px-3 py-1 bg-secondary/10 rounded-full">
          {{ label }}
        </span>
      }
      <h2 class="font-heading text-3xl md:text-4xl lg:text-5xl text-primary leading-tight mt-2">
        {{ title }}
      </h2>
      @if (subtitle) {
        <p class="mt-4 text-gray-500 text-lg leading-relaxed max-w-2xl"
           [class.mx-auto]="centered">
          {{ subtitle }}
        </p>
      }
      <div class="section-divider mt-5"
           [class.mx-auto]="centered"></div>
    </div>
  `
})
export class SectionTitleComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() label = '';
  @Input() centered = true;
}
