export interface TeamMember {
  id: string;
  prenom: string;
  nom: string;
  poste: string;
  description: string;
  /** Path relative to /assets/images/team/ */
  photo: string;
  linkedin?: string;
  facebook?: string;
}
