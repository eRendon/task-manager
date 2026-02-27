import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@/tabs.routes').then((m) => m.routes),
  },
];
