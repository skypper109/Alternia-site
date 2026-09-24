import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface PageMeta {
  title: string;
  description: string;
  image?: string;
}

const BASE_URL = 'https://alternia.ml';
const DEFAULT_IMAGE = `${BASE_URL}/assets/images/og-image.jpg`;

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(private meta: Meta, private title: Title) {}

  setMeta(page: PageMeta): void {
    const fullTitle = `${page.title} | ALTERNIA`;
    const image = page.image ?? DEFAULT_IMAGE;

    this.title.setTitle(fullTitle);

    this.meta.updateTag({ name: 'description', content: page.description });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: page.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
  }
}
