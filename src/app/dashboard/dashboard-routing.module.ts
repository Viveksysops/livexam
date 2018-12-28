import { Routes } from '@angular/router';

import { DefaultComponent } from './default/default.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    data: {
      title: 'Dashboard'
    }
  }
];

