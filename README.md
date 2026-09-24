# ALTERNIA — README

## Site vitrine officiel ALTERNIA

**L'Alternative pour apprendre autrement sans oublier notre culture.**

---

## Stack technique

- **Angular 18+** — Standalone Components
- **TypeScript 5.4**
- **Tailwind CSS 3.4**
- **Angular Reactive Forms**
- **PWA** (Service Worker + manifest)

---

## Installation

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm start

# Build de production
npm run build:prod
```

Le site sera accessible sur **http://localhost:4200**

---

## Structure du projet

```
src/
├── app/
│   ├── core/services/        # contact, seo, geolocation, pwa, cookie
│   ├── core/models/          # contact-form, team-member
│   ├── shared/components/    # section-title, cta-button
│   ├── shared/directives/    # fade-in
│   ├── layout/               # header, footer
│   ├── features/             # home, education, culture, avatar, contact
│   ├── cookie-banner/
│   └── pwa/
└── styles.css
```

## Routes

| Route | Page |
|-------|------|
| `/` | Accueil |
| `/education` | Éducation |
| `/culture` | Culture |
| `/avatar` | Avatar |
| `/contact` | Contact |

---

## Configuration à personnaliser

| Fichier | À modifier |
|---------|-----------|
| `src/app/features/education/education.component.ts` | ID vidéo YouTube (chercher `dQw4w9WgXcQ`) |
| `src/app/features/contact/contact.component.ts` | URLs LinkedIn/Facebook de l'équipe, photos |
| `src/app/core/services/contact.service.ts` | URL du backend API |
| `src/index.html` | URL du domaine (alternia.ml) |

---

## Photos de l'équipe

Placer les photos dans `src/assets/images/team/` avec les noms :
- `hamza-sanmo.jpg`
- `ibrahim-diallo.jpg`
- `niakale-diakite.jpg`
- `jeanne-samake.jpg`

Puis mettre à jour les chemins dans `contact.component.ts`.

---

## Design System

| Token | Valeur | Usage |
|-------|--------|-------|
| Bleu Royal | `#314999` | Primaire — titres, header, CTA |
| Bleu Cyan | `#40BBCC` | Secondaire — accents, icônes |
| Orange Corail | `#F1851F` | Accent — CTA secondaires |
| Blanc | `#FFFFFF` | Fond dominant (60%) |

---

© 2026 ALTERNIA — Tous droits réservés
