import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CookieBannerComponent } from './cookie-banner/cookie-banner.component';
import { PwaInstallBannerComponent } from './pwa/pwa-install-banner.component';
import { LegalModalComponent } from './shared/components/legal-modal/legal-modal.component';
import { PwaInstallService } from './core/services/pwa-install.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    CookieBannerComponent,
    PwaInstallBannerComponent,
    LegalModalComponent
  ],
  template: `
    <app-header />
    <main id="main-content">
      <router-outlet />
    </main>
    <app-footer />
    <app-cookie-banner />
    <app-pwa-install-banner />
    <app-legal-modal />
  `
})
export class AppComponent implements OnInit {
  constructor(private pwaInstallService: PwaInstallService) {}

  ngOnInit(): void {
    this.pwaInstallService.initialize();
  }
}
