import { Routes } from '@angular/router';
import { TabsPage } from '@/views/tabs/tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('@/views/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'categories',
        loadComponent: () => import('@/views/categories/categories.page').then((m) => m.CategoriesPage),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];
