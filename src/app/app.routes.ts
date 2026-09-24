import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: "ALTERNIA — L'Alternative pour apprendre autrement sans oublier notre culture"
  },
  {
    path: 'education',
    redirectTo: ''
  },
  {
    path: 'culture',
    redirectTo: ''
  },
  {
    path: 'avatar',
    redirectTo: ''
  },
  {
    path: 'contact',
    redirectTo: ''
  },
  {
    path: '**',
    redirectTo: ''
  }
];
