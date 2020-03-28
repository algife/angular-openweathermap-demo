import { Routes } from '@angular/router';

export const routes: Routes = [
  // Special routes
  { path: '', redirectTo: 'weather', pathMatch: 'full' },
  { path: '**', loadChildren: () => import('../components/errors/errors.module').then(m => m.ErrorsModule) }
];
