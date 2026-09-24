import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';

/**
 * FadeInDirective — Triggers a fade-in + translateY animation on scroll.
 * Usage: <div [appFadeIn]="150"></div>  (150ms delay)
 * Respects prefers-reduced-motion automatically.
 */
@Directive({
  selector: '[appFadeIn]',
  standalone: true
})
export class FadeInDirective implements OnInit, OnDestroy {
  /** Optional delay in milliseconds before the animation starts */
  @Input('appFadeIn') delay: number = 0;

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const element = this.el.nativeElement;
    element.classList.add('fade-in-element');

    if (this.delay > 0) {
      element.style.transitionDelay = `${this.delay}ms`;
    }

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      element.classList.add('visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            element.classList.add('visible');
            this.observer.unobserve(element);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
