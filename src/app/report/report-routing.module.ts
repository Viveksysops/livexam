import { Routes } from '@angular/router';
import { DefaultComponent } from './default/default.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'default',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'default',
        component: DefaultComponent,
        data: {
          title: 'Reports'
        }
      }
    ]
  }
];

