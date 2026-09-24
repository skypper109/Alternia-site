export interface ContactForm {
  nom: string;
  prenom: string;
  email: string;
  whatsapp: string;
  ville: string;
  profil: ProfilType;
  objet: ObjetType;
  message: string;
  consentement: boolean;
}

export type ProfilType = 'parent' | 'etablissement' | 'partenaire' | 'autre';
export type ObjetType = 'information' | 'boitier' | 'etablissement' | 'partenariat' | 'autre';

export const PROFIL_OPTIONS: { value: ProfilType; label: string }[] = [
  { value: 'parent', label: 'Parent' },
  { value: 'etablissement', label: 'Établissement scolaire' },
  { value: 'partenaire', label: 'Partenaire' },
  { value: 'autre', label: 'Autre' }
];

export const OBJET_OPTIONS: { value: ObjetType; label: string }[] = [
  { value: 'information', label: "Demande d'information" },
  { value: 'boitier', label: 'Demande de boîtier' },
  { value: 'etablissement', label: 'Utilisation dans un établissement' },
  { value: 'partenariat', label: 'Partenariat' },
  { value: 'autre', label: 'Autre' }
];
