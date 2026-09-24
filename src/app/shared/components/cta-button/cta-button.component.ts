import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';

type Variant = 'primary' | 'secondary' | 'outline';
type Size = 'sm' | 'md' | 'lg';

/**
 * CtaButtonComponent — Versatile CTA button with shimmer effect.
 * Renders <a> for links, <button> for actions.
 */
@Component({
  selector: 'app-cta-button',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (routerLink) {
      <a [routerLink]="routerLink" [class]="classes" [attr.aria-label]="ariaLabel || null">
        <ng-content />
      </a>
    } @else if (href) {
      <a
        [href]="href"
        [class]="classes"
        [target]="external ? '_blank' : null"
        [rel]="external ? 'noopener noreferrer' : null"
        [attr.aria-label]="ariaLabel || null"
      >
        <ng-content />
      </a>
    } @else {
      <button
        [type]="type"
        [class]="classes"
        [disabled]="disabled"
        [attr.aria-label]="ariaLabel || null"
        (click)="onClick.emit($event)"
      >
        <ng-content />
      </button>
    }
  `
})
export class CtaButtonComponent {
  @Input() variant: Variant = 'primary';
  @Input() size: Size = 'md';
  @Input() shimmer = false;
  @Input() disabled = false;
  @Input() routerLink?: string;
  @Input() href?: string;
  @Input() external = false;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() ariaLabel?: string;
  @Output() onClick = new EventEmitter<MouseEvent>();

  private readonly sizeMap: Record<Size, string> = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2'
  };

  private readonly variantMap: Record<Variant, string> = {
    primary: 'bg-primary text-white hover:bg-primary-700 focus-visible:ring-primary shadow-sm hover:shadow-md',
    secondary: 'bg-accent text-white hover:bg-accent-500 focus-visible:ring-accent shadow-sm hover:shadow-md',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus-visible:ring-primary'
  };

  get classes(): string {
    return [
      'inline-flex items-center justify-center font-semibold rounded-lg',
      'transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      this.sizeMap[this.size],
      this.variantMap[this.variant],
      this.shimmer ? 'btn-shimmer' : '',
      this.disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'
    ].filter(Boolean).join(' ');
  }
}
